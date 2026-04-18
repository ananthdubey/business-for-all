import { Heart, MapPin, TrendingUp } from 'lucide-react'
import ButtonLink from './ButtonLink'
import { cn } from '../../utils/cn'

function OpportunityCard({
  opportunity,
  isFavorite = false,
  onToggleFavorite,
  showActions = true,
  compact = false,
}) {
  return (
    <article className={cn('startup-card surface-panel overflow-hidden rounded-[1.8rem]', compact ? 'p-5' : 'p-6')}>
      <div className="relative overflow-hidden rounded-[1.45rem] bg-[linear-gradient(135deg,rgba(108,92,231,0.22),rgba(24,199,216,0.2))] p-5">
        <div className="absolute inset-0 opacity-40 dot-pattern" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full border border-white/20 bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
              {opportunity.type}
            </span>
            <h3 className="mt-3 text-2xl font-bold text-white">{opportunity.title}</h3>
            <p className="mt-2 max-w-md text-sm text-white/80">{opportunity.tagline || opportunity.description}</p>
          </div>
          {onToggleFavorite ? (
            <button
              type="button"
              onClick={() => onToggleFavorite(opportunity)}
              className={cn(
                'startup-button inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white',
                isFavorite ? 'bg-white text-rose-500' : ''
              )}
              aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={cn('h-4 w-4', isFavorite ? 'fill-current' : '')} />
            </button>
          ) : null}
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 theme-text-secondary">{opportunity.description}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[1.15rem] border theme-border bg-white/6 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] theme-text-tertiary">Investment</p>
          <p className="mt-2 font-semibold theme-text-primary">{opportunity.investment}</p>
        </div>
        <div className="rounded-[1.15rem] border theme-border bg-white/6 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] theme-text-tertiary">ROI</p>
          <p className="mt-2 inline-flex items-center gap-2 font-semibold theme-text-primary">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            {opportunity.roi}
          </p>
        </div>
        <div className="rounded-[1.15rem] border theme-border bg-white/6 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] theme-text-tertiary">Launch</p>
          <p className="mt-2 inline-flex items-center gap-2 font-semibold theme-text-primary">
            <MapPin className="h-4 w-4 text-cyan-500" />
            {opportunity.launchTime}
          </p>
        </div>
      </div>

      {showActions ? (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to={`/franchise/${opportunity.slug || opportunity._id}`} className="sm:flex-1" withArrow>
            View Details
          </ButtonLink>
          <ButtonLink to="/contact" variant="secondary" className="sm:flex-1">
            Talk to Advisor
          </ButtonLink>
        </div>
      ) : null}
    </article>
  )
}

export default OpportunityCard
