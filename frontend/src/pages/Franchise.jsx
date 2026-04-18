import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, CheckCircle2, GitCompareArrows, ShieldCheck } from 'lucide-react'
import { AnimatedReveal, StaggerGroup, StaggerItem } from '../components/ui/AnimatedReveal'
import FeatureCard from '../components/ui/FeatureCard'
import FormField from '../components/ui/FormField'
import OpportunityCard from '../components/ui/OpportunityCard'
import PageHero from '../components/ui/PageHero'
import PageSection from '../components/ui/PageSection'
import SectionHeading from '../components/ui/SectionHeading'
import TimelineCard from '../components/ui/TimelineCard'
import useAuth from '../hooks/useAuth'
import usePageMeta from '../hooks/usePageMeta'
import useToast from '../hooks/useToast'
import { franchiseBenefits, franchiseSteps, opportunityCategories } from '../data/siteContent'
import { apiRequest } from '../utils/api'
import { normalizeOpportunity } from '../utils/opportunities'

const initialApplicationForm = {
  categoryId: '',
  businessName: '',
  investmentBudget: '',
  location: '',
  experience: '',
}

const comparisonDefaults = [
  normalizeOpportunity(opportunityCategories[0]),
  normalizeOpportunity(opportunityCategories[3]),
]

function Franchise() {
  usePageMeta({
    title: 'Opportunities',
    description:
      'Compare franchise opportunities, shortlist favorites, and submit an application through a premium discovery flow.',
  })

  const { isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const [categories, setCategories] = useState([])
  const [favoriteIds, setFavoriteIds] = useState([])
  const [formData, setFormData] = useState(initialApplicationForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [comparisonSelection, setComparisonSelection] = useState([
    comparisonDefaults[0].title,
    comparisonDefaults[1].title,
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const hasLoadedCategories = useRef(false)

  useEffect(() => {
    if (hasLoadedCategories.current) {
      return undefined
    }

    hasLoadedCategories.current = true

    const loadCategories = async () => {
      setIsLoadingCategories(true)
      try {
        const [categoryResponse, favoriteResponse] = await Promise.allSettled([
          apiRequest('/api/opportunities?active=true&limit=50'),
          isAuthenticated ? apiRequest('/api/users/favorites') : Promise.resolve({ data: [] }),
        ])

        if (categoryResponse.status === 'fulfilled') {
          setCategories((categoryResponse.value.data || []).map((item) => normalizeOpportunity(item)))
        }

        if (favoriteResponse.status === 'fulfilled') {
          setFavoriteIds((favoriteResponse.value.data || []).map((item) => item._id))
        }
      } catch {
        setCategories([])
      } finally {
        setIsLoadingCategories(false)
      }
    }

    loadCategories()
    return undefined
  }, [isAuthenticated])

  const comparisonCards = useMemo(
    () => categories.filter((item) => comparisonSelection.includes(item.title)).slice(0, 2),
    [categories, comparisonSelection]
  )

  const featuredOpportunities = useMemo(
    () =>
      categories
        .filter((item) => {
          const haystack = `${item.title} ${item.type} ${item.description}`.toLowerCase()
          return haystack.includes(searchTerm.toLowerCase())
        })
        .slice(0, 6),
    [categories, searchTerm]
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleToggleFavorite = async (opportunity) => {
    if (!isAuthenticated) {
      showToast({
        tone: 'info',
        title: 'Login required',
        description: 'Create an account to save your shortlist.',
      })
      return
    }

    const isFavorite = favoriteIds.includes(opportunity._id)

    try {
      const response = await apiRequest(
        isFavorite ? `/api/users/favorites/${opportunity._id}` : '/api/users/favorites',
        {
          method: isFavorite ? 'DELETE' : 'POST',
          body: isFavorite ? undefined : JSON.stringify({ categoryId: opportunity._id }),
        }
      )

      setFavoriteIds((response.data || []).map((item) => item._id))
      showToast({
        tone: 'success',
        title: isFavorite ? 'Removed from shortlist' : 'Saved to shortlist',
        description: opportunity.title,
      })
    } catch (error) {
      showToast({
        tone: 'error',
        title: 'Unable to update shortlist',
        description: error.message,
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!isAuthenticated) {
      showToast({
        tone: 'info',
        title: 'Login required',
        description: 'Please sign in before submitting an application.',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        investmentBudget: Number(formData.investmentBudget),
      }

      const response = await apiRequest('/api/applications', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      setFormData(initialApplicationForm)
      showToast({
        tone: 'success',
        title: 'Application submitted',
        description: response.message || 'Your application is now in review.',
      })
    } catch (requestError) {
      showToast({
        tone: 'error',
        title: 'Unable to submit application',
        description: requestError.message,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <PageHero
        badge="Franchise Explorer"
        title="Compare franchise paths with more confidence before you commit."
        description="This page blends premium discovery, comparison, saved favorites, and a live application flow in one serious operator experience."
      />

      <AnimatedReveal>
        <PageSection tone="default">
          <SectionHeading
            eyebrow="Journey"
            title="A premium operator flow from match to scale"
            description="The process is structured to feel clear, modern, and low-friction while still reinforcing seriousness and trust."
          />

          <StaggerGroup className="mt-8 space-y-4">
            {franchiseSteps.map((step, index) => (
              <StaggerItem key={step.title}>
                <TimelineCard index={index + 1} title={step.title} description={step.description} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="muted">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Featured Opportunities"
              title="Search and shortlist business models with a cleaner operator lens"
              description="Use a faster shortlist flow and go deeper on the opportunities that match your launch goals."
            />
            <div className="w-full max-w-md">
              <label htmlFor="opportunity-search" className="mb-2 block text-sm font-semibold theme-text-primary">
                Search opportunities
              </label>
              <input
                id="opportunity-search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by category, model, or advantage"
                className="form-field w-full rounded-[1.25rem] px-4 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {isLoadingCategories
              ? Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="surface-panel rounded-[1.8rem] p-6">
                    <div className="loading-shimmer h-44 rounded-[1.4rem]" />
                    <div className="loading-shimmer mt-4 h-6 w-2/3 rounded-full" />
                    <div className="loading-shimmer mt-4 h-20 rounded-[1rem]" />
                  </div>
                ))
              : featuredOpportunities.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity._id}
                    opportunity={opportunity}
                    isFavorite={favoriteIds.includes(opportunity._id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
          </div>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="default">
          <SectionHeading
            eyebrow="Comparison Tool"
            title="Shortlist two concepts and compare the business shape"
            description="This gives visitors a simple side-by-side evaluation before they move into conversation or application."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {[0, 1].map((index) => (
              <div key={index}>
                <label className="mb-2 block text-sm font-semibold theme-text-primary" htmlFor={`comparison-${index}`}>
                  Compare slot {index + 1}
                </label>
                <select
                  id={`comparison-${index}`}
                  value={comparisonSelection[index]}
                  onChange={(event) =>
                    setComparisonSelection((current) =>
                      current.map((item, itemIndex) => (itemIndex === index ? event.target.value : item))
                    )
                  }
                  className="form-field w-full rounded-[1.25rem] px-4 py-3 text-sm outline-none"
                >
                  {categories.map((item) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {comparisonCards.map((item) => (
              <div key={item.title} className="surface-panel rounded-[1.8rem] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-500">{item.type}</p>
                    <h3 className="mt-2 text-2xl font-bold theme-text-primary">{item.title}</h3>
                  </div>
                  <GitCompareArrows className="h-5 w-5 text-cyan-500" />
                </div>
                <p className="mt-4 text-sm leading-7 theme-text-secondary">{item.description}</p>
                <div className="mt-5 grid gap-3">
                  {[
                    ['ROI estimate', item.roi],
                    ['Investment', item.investment],
                    ['Launch time', item.launchTime],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between rounded-[1rem] border theme-border bg-white/6 px-3 py-3 text-sm">
                      <span className="theme-text-tertiary">{label}</span>
                      <span className="font-semibold theme-text-primary">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="default">
          <SectionHeading
            eyebrow="Benefits"
            title="Why founders trust this model"
            description="We position the value proposition around certainty, support, and operating confidence."
          />

          <StaggerGroup className="mt-8 grid gap-4 md:grid-cols-3">
            {franchiseBenefits.map((benefit, index) => (
              <StaggerItem key={benefit.title}>
                <FeatureCard title={benefit.title} description={benefit.description} icon={index + 1} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="muted">
          <div className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
            <div>
              <SectionHeading
                eyebrow="Apply Online"
                title="Submit a polished franchise application"
                description="The application flow stays connected to the backend while the product experience feels more premium and trustworthy."
              />

              {!isAuthenticated ? (
                <div className="mt-8 rounded-[1.5rem] border border-amber-300/40 bg-amber-400/10 px-5 py-4 text-sm text-amber-200">
                  Login is required before submitting an application.
                  {' '}
                  <Link to="/login" className="font-semibold underline">
                    Login here
                  </Link>
                  {' '}
                  or
                  {' '}
                  <Link to="/register" className="font-semibold underline">
                    create an account
                  </Link>
                  .
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="mt-8 grid gap-5 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <label className="mb-2 block text-sm font-semibold theme-text-primary" htmlFor="categoryId">
                    Franchise Category
                  </label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="form-field w-full rounded-[1.25rem] px-4 py-3 text-sm outline-none"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>

                <FormField
                  id="businessName"
                  name="businessName"
                  label="Business Name"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Your planned business name"
                  required
                />

                <FormField
                  id="investmentBudget"
                  name="investmentBudget"
                  type="number"
                  label="Investment Budget"
                  value={formData.investmentBudget}
                  onChange={handleChange}
                  placeholder="500000"
                  required
                />

                <FormField
                  id="location"
                  name="location"
                  label="Preferred Location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City / Area"
                  required
                />

                <div className="hidden lg:block" />

                <div className="lg:col-span-2">
                  <FormField
                    as="textarea"
                    id="experience"
                    name="experience"
                    label="Experience"
                    rows="5"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Tell us about your business or operational experience."
                  />
                </div>

                <div className="lg:col-span-2">
                  <button type="submit" disabled={isSubmitting} className="startup-button brand-button rounded-full px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70">
                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-5">
              <div className="surface-panel rounded-[1.8rem] p-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-cyan-500" />
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Trust layer</p>
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    'Structured onboarding and launch preparation',
                    'Advisor support before and after your decision',
                    'Decision tools designed to reduce founder uncertainty',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-7 theme-text-secondary">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="surface-panel rounded-[1.8rem] p-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-cyan-500" />
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Saved and active</p>
                </div>
                <div className="mt-5 grid gap-3">
                  <div className="rounded-[1rem] border theme-border bg-white/6 px-4 py-4">
                    <p className="text-sm theme-text-tertiary">Saved shortlist</p>
                    <p className="mt-2 text-2xl font-bold theme-text-primary">{favoriteIds.length}</p>
                  </div>
                  <div className="rounded-[1rem] border theme-border bg-white/6 px-4 py-4">
                    <p className="text-sm theme-text-tertiary">Available opportunities</p>
                    <p className="mt-2 text-2xl font-bold theme-text-primary">{categories.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageSection>
      </AnimatedReveal>
    </div>
  )
}

export default Franchise
