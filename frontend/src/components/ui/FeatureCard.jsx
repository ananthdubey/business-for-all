import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

function FeatureCard({ title, description, icon, className = '' }) {
  const MotionArticle = motion.article

  return (
    <MotionArticle
      className={cn(
        'startup-card surface-panel relative rounded-[1.75rem] p-6',
        className
      )}
      whileHover={{ y: -8 }}
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(108,92,231,0.18),rgba(24,199,216,0.18))] text-sm font-bold theme-text-primary">
        {icon ?? title.charAt(0)}
      </div>
      <h3 className="mt-5 text-[1.35rem] font-bold leading-snug theme-text-primary">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 theme-text-secondary sm:text-base">
        {description}
      </p>
    </MotionArticle>
  )
}

export default FeatureCard
