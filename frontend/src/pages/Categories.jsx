import { useEffect, useMemo, useRef, useState } from 'react'
import { Layers3, Search } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import PageSection from '../components/ui/PageSection'
import SectionHeading from '../components/ui/SectionHeading'
import OpportunityCard from '../components/ui/OpportunityCard'
import useAuth from '../hooks/useAuth'
import useToast from '../hooks/useToast'
import usePageMeta from '../hooks/usePageMeta'
import { apiRequest } from '../utils/api'
import { normalizeOpportunity } from '../utils/opportunities'

function Categories() {
  usePageMeta({
    title: 'Categories',
    description: 'Explore franchise categories, compare models, and shortlist the right launch-ready business opportunity.',
  })

  const { isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const [opportunities, setOpportunities] = useState([])
  const [favorites, setFavorites] = useState([])
  const [activeType, setActiveType] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const hasLoaded = useRef(false)

  useEffect(() => {
    if (hasLoaded.current) {
      return undefined
    }

    hasLoaded.current = true

    const loadData = async () => {
      setIsLoading(true)
      try {
        const [opportunityResponse, favoriteResponse] = await Promise.allSettled([
          apiRequest('/api/opportunities?active=true&limit=24'),
          isAuthenticated ? apiRequest('/api/users/favorites') : Promise.resolve({ data: [] }),
        ])

        if (opportunityResponse.status === 'fulfilled') {
          setOpportunities((opportunityResponse.value.data || []).map((item) => normalizeOpportunity(item)))
        }

        if (favoriteResponse.status === 'fulfilled') {
          setFavorites((favoriteResponse.value.data || []).map((item) => item._id))
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
    return undefined
  }, [isAuthenticated])

  const types = useMemo(
    () => ['All', ...new Set(opportunities.map((item) => item.type).filter(Boolean))],
    [opportunities]
  )

  const filteredOpportunities = useMemo(
    () =>
      opportunities.filter((item) => {
        const matchesType = activeType === 'All' || item.type === activeType
        const haystack = `${item.title} ${item.type} ${item.description}`.toLowerCase()
        return matchesType && haystack.includes(searchTerm.toLowerCase())
      }),
    [activeType, opportunities, searchTerm]
  )

  const handleToggleFavorite = async (opportunity) => {
    if (!isAuthenticated) {
      showToast({
        tone: 'info',
        title: 'Login required',
        description: 'Create an account to save shortlisted opportunities.',
      })
      return
    }

    const isFavorite = favorites.includes(opportunity._id)

    try {
      const response = await apiRequest(
        isFavorite ? `/api/users/favorites/${opportunity._id}` : '/api/users/favorites',
        {
          method: isFavorite ? 'DELETE' : 'POST',
          body: isFavorite ? undefined : JSON.stringify({ categoryId: opportunity._id }),
        }
      )

      setFavorites((response.data || []).map((item) => item._id))
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

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <PageHero
        badge="Categories"
        title="Explore categories built for serious franchise buyers"
        description="Browse launch-ready business verticals, filter by fit, and move from discovery to shortlist faster."
      />

      <PageSection tone="muted">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Discovery"
            title="Search across real-world opportunity types"
            description="Each category is framed around investment, support, and speed to launch so users can evaluate with confidence."
          />
          <div className="w-full max-w-md">
            <label htmlFor="category-search" className="mb-2 block text-sm font-semibold theme-text-primary">
              Search categories
            </label>
            <div className="form-field flex items-center gap-3 rounded-[1.25rem] px-4 py-3">
              <Search className="h-4 w-4 theme-text-tertiary" />
              <input
                id="category-search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, type, or launch model"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {types.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveType(type)}
              className={`startup-button pill-filter rounded-full px-4 py-2 text-sm font-medium ${
                activeType === type ? 'bg-[linear-gradient(135deg,#6c5ce7,#18c7d8)] text-white' : ''
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </PageSection>

      <PageSection tone="default">
        <div className="flex items-center gap-3">
          <Layers3 className="h-5 w-5 text-cyan-500" />
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Opportunity Grid</p>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="surface-panel rounded-[1.8rem] p-6">
                  <div className="loading-shimmer h-44 rounded-[1.4rem]" />
                  <div className="loading-shimmer mt-4 h-6 w-2/3 rounded-full" />
                  <div className="loading-shimmer mt-4 h-20 rounded-[1rem]" />
                </div>
              ))
            : filteredOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity._id}
                  opportunity={opportunity}
                  isFavorite={favorites.includes(opportunity._id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
        </div>

        {!isLoading && filteredOpportunities.length === 0 ? (
          <div className="mt-6 rounded-[1.4rem] border theme-border bg-white/6 px-5 py-4 text-sm theme-text-secondary">
            No opportunities match the current filters. Try widening the search or switching categories.
          </div>
        ) : null}
      </PageSection>
    </div>
  )
}

export default Categories
