import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

function TimelineCard({ index, title, description, dark = false }) {
  const MotionArticle = motion.article

  return (
    <MotionArticle
      className={cn(
        'startup-card rounded-[2rem] border bg-white p-6 text-slate-900 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-8',
        dark ? 'border-blue-100' : 'border-slate-200/80'
      )}
      whileHover={{ y: -8 }}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex items-center gap-4 sm:w-52 sm:flex-col sm:items-start sm:gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.22)]">
            {index}
          </span>
          <div>
            <p className={cn('text-sm font-medium uppercase tracking-[0.18em]', dark ? 'text-cyan-600' : 'text-blue-700')}>
              Step {index}
            </p>
            <h3 className={cn('mt-1 text-2xl font-semibold', dark ? 'text-slate-900' : 'text-slate-900')}>
              {title}
            </h3>
          </div>
        </div>

        <div className="flex-1">
          <p className={cn('max-w-2xl text-sm leading-7 sm:text-base', dark ? 'text-slate-700' : 'text-slate-700')}>
            {description}
          </p>
        </div>
      </div>
    </MotionArticle>
  )
}

export default TimelineCard
