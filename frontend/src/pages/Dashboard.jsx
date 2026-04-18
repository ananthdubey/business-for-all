import { useEffect, useMemo, useState } from 'react'
import {
  BarChart3,
  BriefcaseBusiness,
  Heart,
  LayoutDashboard,
  Search,
  Sparkles,
  UserCircle2,
} from 'lucide-react'
import useAuth from '../hooks/useAuth'
import usePageMeta from '../hooks/usePageMeta'
import useToast from '../hooks/useToast'
import { apiRequest } from '../utils/api'
import FormField from '../components/ui/FormField'
import ButtonLink from '../components/ui/ButtonLink'

const dashboardTabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'applications', label: 'Applications', icon: BriefcaseBusiness },
  { id: 'favorites', label: 'Saved', icon: Heart },
  { id: 'profile', label: 'Profile', icon: UserCircle2 },
]

function Dashboard() {
  usePageMeta({
    title: 'Dashboard',
    description: 'Manage your profile, saved opportunities, and franchise applications from one protected workspace.',
  })

  const { user, setUser, logout } = useAuth()
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState('overview')
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    phone: '',
    city: '',
    state: '',
  })
  const [applications, setApplications] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (user) {
      setProfileForm({
        fullName: user.fullName || '',
        phone: user.phone || '',
        city: user.city || '',
        state: user.state || '',
      })
    }
  }, [user])

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true)
      try {
        const [applicationsResponse, favoritesResponse] = await Promise.all([
          apiRequest('/api/applications/my'),
          apiRequest('/api/users/favorites'),
        ])

        setApplications(applicationsResponse.data || [])
        setFavorites(favoritesResponse.data || [])
      } catch (requestError) {
        showToast({
          tone: 'error',
          title: 'Unable to load dashboard',
          description: requestError.message,
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [showToast])

  const handleChange = (event) => {
    const { name, value } = event.target
    setProfileForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleProfileSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)

    try {
      const response = await apiRequest('/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify(profileForm),
      })
      setUser(response.data)
      showToast({
        tone: 'success',
        title: 'Profile updated',
        description: 'Your account details were saved successfully.',
      })
    } catch (requestError) {
      showToast({
        tone: 'error',
        title: 'Unable to save profile',
        description: requestError.message,
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancelApplication = async (applicationId) => {
    try {
      const response = await apiRequest(`/api/applications/${applicationId}/cancel`, {
        method: 'PUT',
      })

      setApplications((current) =>
        current.map((application) =>
          application._id === applicationId ? response.data : application
        )
      )
      showToast({
        tone: 'success',
        title: 'Application updated',
        description: 'The application was cancelled successfully.',
      })
    } catch (error) {
      showToast({
        tone: 'error',
        title: 'Unable to update application',
        description: error.message,
      })
    }
  }

  const handleRemoveFavorite = async (categoryId) => {
    try {
      const response = await apiRequest(`/api/users/favorites/${categoryId}`, {
        method: 'DELETE',
      })

      setFavorites(response.data || [])
      showToast({
        tone: 'success',
        title: 'Removed from shortlist',
        description: 'Your saved opportunities list has been updated.',
      })
    } catch (error) {
      showToast({
        tone: 'error',
        title: 'Unable to remove favorite',
        description: error.message,
      })
    }
  }

  const filteredApplications = useMemo(
    () =>
      applications.filter((application) => {
        const haystack = `${application.categoryId?.title || application.businessName} ${application.status}`.toLowerCase()
        return haystack.includes(searchTerm.toLowerCase())
      }),
    [applications, searchTerm]
  )

  const filteredFavorites = useMemo(
    () =>
      favorites.filter((favorite) => {
        const haystack = `${favorite.title} ${favorite.type}`.toLowerCase()
        return haystack.includes(searchTerm.toLowerCase())
      }),
    [favorites, searchTerm]
  )

  const profileCompletion = useMemo(() => {
    const completedFields = Object.values({
      fullName: profileForm.fullName,
      phone: profileForm.phone,
      city: profileForm.city,
      state: profileForm.state,
    }).filter(Boolean).length

    return Math.round((completedFields / 4) * 100)
  }, [profileForm])

  const kpiCards = [
    {
      label: 'Applications',
      value: applications.length,
      note: 'Tracked from your live protected workflow',
    },
    {
      label: 'Saved shortlist',
      value: favorites.length,
      note: 'Opportunities you can revisit anytime',
    },
    {
      label: 'Profile completion',
      value: `${profileCompletion}%`,
      note: 'Higher completion builds a better advisor handoff',
    },
  ]

  return (
    <div className="mx-auto max-w-[92rem]">
      <div className="dashboard-shell lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="dashboard-card p-5 sm:p-6">
          <div className="rounded-[1.6rem] bg-[linear-gradient(135deg,rgba(108,92,231,0.18),rgba(24,199,216,0.18))] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">Workspace</p>
            <h1 className="mt-3 text-2xl font-bold theme-text-primary">Operator dashboard</h1>
            <p className="mt-2 text-sm leading-7 theme-text-secondary">
              A cleaner command center for your profile, opportunities, and application progress.
            </p>
          </div>

          <div className="mt-6 rounded-[1.5rem] border theme-border bg-white/8 p-4">
            <p className="text-sm font-semibold theme-text-primary">{user?.fullName}</p>
            <p className="mt-1 text-sm theme-text-secondary">{user?.email}</p>
          </div>

          <nav className="mt-6 space-y-2">
            {dashboardTabs.map((tab) => {
              const Icon = tab.icon

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`startup-button flex w-full items-center gap-3 rounded-[1.2rem] px-4 py-3 text-sm font-semibold ${
                    activeTab === tab.id
                      ? 'bg-[linear-gradient(135deg,#6c5ce7,#18c7d8)] text-white shadow-[0_18px_40px_rgba(79,124,255,0.18)]'
                      : 'secondary-button'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>

          <div className="mt-6 rounded-[1.5rem] border theme-border bg-white/8 p-4">
            <p className="text-sm font-semibold theme-text-primary">Need a fast next step?</p>
            <div className="mt-4 grid gap-3">
              <ButtonLink to="/franchise" className="w-full">
                Explore Opportunities
              </ButtonLink>
              <ButtonLink to="/contact" variant="secondary" className="w-full">
                Talk to Advisor
              </ButtonLink>
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="dashboard-card p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Premium workspace</p>
                <h2 className="mt-2 text-3xl font-bold theme-text-primary">
                  Welcome back, {user?.fullName?.split(' ')[0] || 'Operator'}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 theme-text-secondary">
                  Review traction, manage live applications, and keep your shortlist organized from one investor-ready interface.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="form-field flex min-h-11 items-center gap-3 rounded-full px-4 py-3 text-sm">
                  <Search className="h-4 w-4 theme-text-tertiary" />
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search applications or saved opportunities"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                <button type="button" onClick={logout} className="startup-button secondary-button rounded-full px-5 py-3 text-sm font-semibold">
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {kpiCards.map((card) => (
              <div key={card.label} className="dashboard-card p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-500">{card.label}</p>
                <p className="mt-3 text-4xl font-bold theme-text-primary">{card.value}</p>
                <p className="mt-3 text-sm leading-7 theme-text-secondary">{card.note}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="dashboard-card p-5 sm:p-6">
              {activeTab === 'overview' ? (
                <div>
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-cyan-500" />
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Overview</p>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.5rem] border theme-border bg-white/6 p-5">
                      <p className="text-sm theme-text-tertiary">Application momentum</p>
                      <div className="mt-5 flex items-end gap-3">
                        {[46, 58, 76, 70, 88, 98].map((height, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-t-2xl bg-[linear-gradient(180deg,rgba(24,199,216,0.32),rgba(108,92,231,0.82))]"
                            style={{ height }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[1.5rem] border theme-border bg-white/6 p-5">
                      <p className="text-sm theme-text-tertiary">Readiness radar</p>
                      <div className="mt-5 rounded-[1.4rem] bg-[linear-gradient(135deg,rgba(108,92,231,0.16),rgba(24,199,216,0.14))] p-5">
                        <p className="text-3xl font-bold theme-text-primary">{profileCompletion}%</p>
                        <p className="mt-2 text-sm leading-7 theme-text-secondary">
                          Complete your profile and shortlist to help advisors recommend better-fit business opportunities.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.5rem] border theme-border bg-white/6 p-5">
                      <p className="text-sm font-semibold theme-text-primary">Recent applications</p>
                      <div className="mt-4 space-y-3">
                        {isLoading ? (
                          Array.from({ length: 2 }).map((_, index) => (
                            <div key={index} className="loading-shimmer h-16 rounded-[1rem]" />
                          ))
                        ) : applications.length ? (
                          applications.slice(0, 3).map((application) => (
                            <div key={application._id} className="rounded-[1rem] border theme-border bg-white/6 px-4 py-3">
                              <p className="text-sm font-semibold theme-text-primary">{application.categoryId?.title || application.businessName}</p>
                              <p className="mt-1 text-sm theme-text-secondary">Status: {application.status}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm leading-7 theme-text-secondary">
                            No live applications yet. Use the marketplace to start one.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] border theme-border bg-white/6 p-5">
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-4 w-4 text-cyan-500" />
                        <p className="text-sm font-semibold theme-text-primary">Suggested next move</p>
                      </div>
                      <p className="mt-4 text-sm leading-7 theme-text-secondary">
                        Keep your shortlist active, refine your city and budget details, then submit one high-intent application instead of many low-context ones.
                      </p>
                      <ButtonLink to="/categories" className="mt-5">
                        Refine My Shortlist
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              ) : null}

              {activeTab === 'applications' ? (
                <div>
                  <div className="flex items-center gap-3">
                    <BriefcaseBusiness className="h-5 w-5 text-cyan-500" />
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Applications</p>
                  </div>
                  <div className="mt-6 space-y-4">
                    {isLoading ? (
                      Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="loading-shimmer h-24 rounded-[1.4rem]" />
                      ))
                    ) : filteredApplications.length ? (
                      filteredApplications.map((application) => {
                        const canCancel = ['pending', 'under-review'].includes(application.status)

                        return (
                          <article key={application._id} className="rounded-[1.5rem] border theme-border bg-white/6 p-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="text-sm font-semibold theme-text-primary">
                                  {application.categoryId?.title || application.businessName}
                                </p>
                                <p className="mt-1 text-sm theme-text-secondary">Status: {application.status}</p>
                              </div>
                              {canCancel ? (
                                <button
                                  type="button"
                                  onClick={() => handleCancelApplication(application._id)}
                                  className="startup-button secondary-button rounded-full px-4 py-2 text-sm font-semibold"
                                >
                                  Cancel
                                </button>
                              ) : null}
                            </div>
                          </article>
                        )
                      })
                    ) : (
                      <div className="rounded-[1.5rem] border theme-border bg-white/6 px-5 py-5">
                        <p className="text-sm font-semibold theme-text-primary">No matching applications</p>
                        <p className="mt-2 text-sm leading-7 theme-text-secondary">
                          Try another search or start your first application from the opportunity pages.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}

              {activeTab === 'favorites' ? (
                <div>
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-cyan-500" />
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Saved opportunities</p>
                  </div>
                  <div className="mt-6 space-y-4">
                    {filteredFavorites.length ? (
                      filteredFavorites.map((favorite) => (
                        <article key={favorite._id} className="rounded-[1.5rem] border theme-border bg-white/6 p-4">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm font-semibold theme-text-primary">{favorite.title}</p>
                              <p className="mt-1 text-sm theme-text-secondary">{favorite.type}</p>
                            </div>
                            <div className="flex gap-2">
                              <ButtonLink to={`/franchise/${favorite.slug}`} variant="secondary" className="px-4 py-2">
                                View
                              </ButtonLink>
                              <button
                                type="button"
                                onClick={() => handleRemoveFavorite(favorite._id)}
                                className="startup-button secondary-button rounded-full px-4 py-2 text-sm font-semibold"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="rounded-[1.5rem] border theme-border bg-white/6 px-5 py-5">
                        <p className="text-sm font-semibold theme-text-primary">Your shortlist is empty</p>
                        <p className="mt-2 text-sm leading-7 theme-text-secondary">
                          Save opportunities from the marketplace and they will appear here for faster comparison later.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}

              {activeTab === 'profile' ? (
                <div>
                  <div className="flex items-center gap-3">
                    <UserCircle2 className="h-5 w-5 text-cyan-500" />
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Profile</p>
                  </div>

                  <form onSubmit={handleProfileSubmit} className="mt-6 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField id="dashboard-name" name="fullName" label="Full Name" value={profileForm.fullName} onChange={handleChange} placeholder="Your name" />
                      <FormField id="dashboard-phone" name="phone" label="Phone" value={profileForm.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField id="dashboard-city" name="city" label="City" value={profileForm.city} onChange={handleChange} placeholder="City" />
                      <FormField id="dashboard-state" name="state" label="State" value={profileForm.state} onChange={handleChange} placeholder="State" />
                    </div>
                    <button type="submit" disabled={isSaving} className="startup-button brand-button rounded-full px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70">
                      {isSaving ? 'Saving...' : 'Update Profile'}
                    </button>
                  </form>
                </div>
              ) : null}
            </div>

            <aside className="space-y-6">
              <div className="dashboard-card p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Signal summary</p>
                <div className="mt-5 space-y-3">
                  {[
                    ['Readiness', `${profileCompletion}%`],
                    ['Shortlist strength', `${favorites.length} saved`],
                    ['Active pipeline', `${applications.length} applications`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between rounded-[1rem] border theme-border bg-white/6 px-4 py-3 text-sm">
                      <span className="theme-text-secondary">{label}</span>
                      <span className="font-semibold theme-text-primary">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dashboard-card p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Profile quality</p>
                <div className="mt-4 rounded-full bg-white/10 p-1">
                  <div
                    className="h-3 rounded-full bg-[linear-gradient(90deg,#6c5ce7,#18c7d8)]"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
                <p className="mt-4 text-sm leading-7 theme-text-secondary">
                  A complete operator profile gives advisors better context and improves the quality of opportunity matches.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
