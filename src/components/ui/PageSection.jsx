import { cn } from '../../utils/cn'

function PageSection({ children, dark = false, tone = 'white', className = '' }) {
  const resolvedTone = dark ? 'tint' : tone
  const tones = {
    white: 'border-slate-200/80 bg-white text-slate-900 shadow-[0_18px_42px_rgba(15,23,42,0.05)]',
    gray: 'border-slate-200/80 bg-[#F8FAFC] text-slate-900 shadow-[0_18px_42px_rgba(15,23,42,0.045)]',
    tint: 'border-blue-100 bg-[linear-gradient(180deg,#eef4ff_0%,#ffffff_100%)] text-slate-900 shadow-[0_18px_42px_rgba(37,99,235,0.07)]',
  }

  return (
    <section
      className={cn(
        'section-sheen relative overflow-hidden rounded-[2rem] border px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16',
        tones[resolvedTone],
        className
      )}
    >
      {children}
    </section>
  )
}

export default PageSection
