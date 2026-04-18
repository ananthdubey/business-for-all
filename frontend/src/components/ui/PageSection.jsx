import { cn } from '../../utils/cn'

function PageSection({ children, tone = 'default', className = '' }) {
  const tones = {
    default: 'section-shell',
    muted: 'section-shell-muted',
    glass: 'glass-panel',
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16',
        tones[tone],
        className
      )}
    >
      {children}
    </section>
  )
}

export default PageSection
