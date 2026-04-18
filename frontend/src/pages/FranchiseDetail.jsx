import { useEffect, useState } from 'react'
import { CheckCircle2, Heart, Sparkles } from 'lucide-react'
import { useParams } from 'react-router-dom'
import ButtonLink from '../components/ui/ButtonLink'
import PageHero from '../components/ui/PageHero'
import PageSection from '../components/ui/PageSection'
import SectionHeading from '../components/ui/SectionHeading'
import useAuth from '../hooks/useAuth'
import usePageMeta from '../hooks/usePageMeta'
import useToast from '../hooks/useToast'
import { apiRequest } from '../utils/api'
import { normalizeOpportunity } from '../utils/opportunities'

function FranchiseDetail() {
  const { slug } = useParams()
  const { isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const [opportunity, setOpportunity] = useState(null)
  const [favoriteIds, setFavoriteIds] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadOpportunity = async () => {
      setIsLoading(true)
      try {
        const opportunityResponse = await apiRequest(`/api/opportunities/${slug}`)
        setOpportunity(normalizeOpportunity(opportunityResponse.data))

        if (isAuthenticated) {
          const favoriteResponse = await apiRequest('/api/users/favorites')
          setFavoriteIds((favoriteResponse.data || []).map((item) => item._id))
        }
      } catch (error) {
        setOpportunity(null)
        showToast({
          tone: 'error',
          title: 'Opportunity unavailable',
          description: error.message,
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadOpportunity()
  }, [isAuthenticated, showToast, slug])

  usePageMeta({
    title: opportunity?.title || 'Opportunity Detail',
    description:
      opportunity?.description ||
      'Review a franchise opportunity, compare economics, and move into consultation or application.',
  })

  const isFavorite = opportunity ? favoriteIds.includes(opportunity._id) : false

  const handleToggleFavorite = async () => {
    if (!opportunity) {
      return
    }

    if (!isAuthenticated) {
      showToast({
        tone: 'info',
        title: 'Login required',
        description: 'Sign in to save opportunities to your shortlist.',
      })
      return
    }

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
        title: isFavorite ? 'Removed from saved list' : 'Opportunity saved',
        description: opportunity.title,
      })
    } catch (error) {
      showToast({
        tone: 'error',
        title: 'Unable to update favorites',
        description: error.message,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="loading-shimmer h-64 rounded-[2rem]" />
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="loading-shimmer h-80 rounded-[2rem]" />
          <div className="loading-shimmer h-80 rounded-[2rem]" />
        </div>
      </div>
    )
  }

  if (!opportunity) {
    return (
      <div className="mx-auto max-w-5xl">
        <PageHero
          badge="Not Found"
          title="This opportunity is not available right now"
          description="The listing may have moved, been retired, or is temporarily unavailable. Browse the marketplace for other launch-ready options."
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <PageHero
        badge={opportunity.type}
        title={opportunity.title}
        description={opportunity.tagline || opportunity.description}
      />

      <PageSection tone="muted">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="surface-panel rounded-[2rem] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Opportunity Overview"
              title="What makes this franchise model attractive"
              description={opportunity.description}
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.4rem] border theme-border bg-white/6 p-5">
                <p className="text-sm theme-text-tertiary">Investment range</p>
                <p className="mt-2 text-xl font-semibold theme-text-primary">{opportunity.investment}</p>
              </div>
              <div className="rounded-[1.4rem] border theme-border bg-white/6 p-5">
                <p className="text-sm theme-text-tertiary">ROI estimate</p>
                <p className="mt-2 text-xl font-semibold theme-text-primary">{opportunity.roi}</p>
              </div>
              <div className="rounded-[1.4rem] border theme-border bg-white/6 p-5">
                <p className="text-sm theme-text-tertiary">Launch timeline</p>
                <p className="mt-2 text-xl font-semibold theme-text-primary">{opportunity.launchTime}</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {(opportunity.benefits || []).map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 text-sm leading-7 theme-text-secondary">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="surface-panel rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-cyan-500" />
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Next Actions</p>
              </div>

              <div className="mt-6 grid gap-3">
                <ButtonLink to="/register" className="w-full" withArrow>
                  Create Account
                </ButtonLink>
                <ButtonLink to="/franchise" variant="secondary" className="w-full">
                  Apply Now
                </ButtonLink>
                <ButtonLink to="/contact" variant="secondary" className="w-full">
                  Talk to Advisor
                </ButtonLink>
              </div>

              <button
                type="button"
                onClick={handleToggleFavorite}
                className={`startup-button mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${
                  isFavorite ? 'brand-button' : 'secondary-button'
                }`}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Saved to shortlist' : 'Save to shortlist'}
              </button>
            </div>

            <div className="surface-panel rounded-[2rem] p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Ideal Buyer Profile</p>
              <div className="mt-5 space-y-4 text-sm leading-7 theme-text-secondary">
                <p>Best for founders who want a structured launch path rather than building operations from scratch.</p>
                <p>Works especially well for operators who value onboarding support, local market validation, and clear economics.</p>
                <p>Strong fit for buyers who want faster execution with lower decision friction.</p>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  )
}

export default FranchiseDetail
