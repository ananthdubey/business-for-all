import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

function FeatureCard({ title, description, dark = false, icon, className = '' }) {
  const MotionArticle = motion.article

  return (
    <MotionArticle
      className={cn(
        'startup-card relative rounded-[1.75rem] border bg-white p-6 text-slate-900 shadow-[0_16px_40px_rgba(15,23,42,0.06)]',
        dark ? 'border-blue-100' : 'border-slate-200/80',
        className
      )}
      whileHover={{ y: -10 }}
    >
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold',
          dark
            ? 'bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-700'
            : 'bg-gradient-to-br from-blue-100 via-indigo-100 to-cyan-100 text-blue-900'
        )}
      >
        {icon ?? title.charAt(0)}
      </div>
      <h3 className={cn('mt-5 text-[1.35rem] font-bold leading-snug tracking-[-0.02em]', dark ? 'text-slate-900' : 'text-slate-900')}>
        {title}
      </h3>
      <p className={cn('mt-3 text-sm leading-7 sm:text-[1rem]', dark ? 'text-slate-700' : 'text-slate-700')}>
        {description}
      </p>
    </MotionArticle>
  )
}

export default FeatureCard
