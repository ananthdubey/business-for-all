import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { apiRequest } from '../utils/api'
import FormField from '../components/ui/FormField'
import PageHero from '../components/ui/PageHero'

function Dashboard() {
  const { user, setUser, logout } = useAuth()
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    phone: '',
    city: '',
    state: '',
  })
  const [applications, setApplications] = useState([])
  const [statusMessage, setStatusMessage] = useState('')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

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
    const loadApplications = async () => {
      try {
        const response = await apiRequest('/api/applications/my')
        setApplications(response.data)
      } catch (requestError) {
        setError(requestError.message)
      }
    }

    loadApplications()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setProfileForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleProfileSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setStatusMessage('')
    setIsSaving(true)

    try {
      const response = await apiRequest('/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify(profileForm),
      })
      setUser(response.data)
      setStatusMessage('Profile updated successfully.')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHero
        badge="Dashboard"
        title="Protected account workspace"
        description="This route is protected by the live authentication flow and connected to your secured backend profile endpoints."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="glass-panel rounded-[2rem] border border-white/70 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                My Profile
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {user?.fullName}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{user?.email}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="startup-button inline-flex items-center justify-center rounded-full border border-blue-100 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm"
            >
              Logout
            </button>
          </div>

          {statusMessage ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {statusMessage}
            </div>
          ) : null}

          {error ? (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleProfileSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="dashboard-name" name="fullName" label="Full Name" value={profileForm.fullName} onChange={handleChange} placeholder="Your name" />
              <FormField id="dashboard-phone" name="phone" label="Phone" value={profileForm.phone} onChange={handleChange} placeholder="+91 98765 43210" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="dashboard-city" name="city" label="City" value={profileForm.city} onChange={handleChange} placeholder="City" />
              <FormField id="dashboard-state" name="state" label="State" value={profileForm.state} onChange={handleChange} placeholder="State" />
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="startup-button inline-flex items-center justify-center rounded-full border border-blue-800/80 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(30,58,138,0.24)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? 'Saving...' : 'Update Profile'}
            </button>
          </form>
        </section>

        <section className="glass-panel rounded-[2rem] border border-white/70 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            My Applications
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
            {applications.length} active records
          </h2>
          <div className="mt-6 space-y-4">
            {applications.length ? (
              applications.map((application) => (
                <article
                  key={application._id}
                  className="rounded-[1.5rem] border border-blue-100 bg-white/70 p-4"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {application.categoryId?.title || application.businessName}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Status: {application.status}
                  </p>
                </article>
              ))
            ) : (
              <p className="text-sm leading-7 text-slate-600">
                No applications found yet. This endpoint is connected and ready for protected submission flows.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
