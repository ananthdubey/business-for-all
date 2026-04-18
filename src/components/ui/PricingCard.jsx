import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import ButtonLink from './ButtonLink'
import { cn } from '../../utils/cn'

function PricingCard({ name, price, description, features, cta, popular }) {
  const MotionArticle = motion.article

  return (
    <MotionArticle
      className={cn(
        'startup-card surface-panel relative flex h-full flex-col rounded-[2rem] p-8',
        popular ? 'animated-border bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(235,244,255,0.92))]' : ''
      )}
      whileHover={{ y: -8 }}
    >
      {popular ? (
        <span className="absolute right-6 top-6 inline-flex rounded-full border border-white/10 bg-[linear-gradient(135deg,#6c5ce7,#18c7d8)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
          Recommended
        </span>
      ) : null}

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">
          {name}
        </p>
        <p className="mt-4 text-4xl font-bold leading-none theme-text-primary">{price}</p>
        <p className="mt-4 text-sm leading-8 theme-text-secondary sm:text-base">{description}</p>
      </div>

      <ul className="mt-8 space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm leading-7 theme-text-secondary">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <ButtonLink to="/contact" variant={popular ? 'primary' : 'secondary'} className="w-full">
          {cta}
        </ButtonLink>
      </div>
    </MotionArticle>
  )
}

export default PricingCard
