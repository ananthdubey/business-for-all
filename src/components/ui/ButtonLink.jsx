import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

function ButtonLink({
  to,
  children,
  variant = 'primary',
  className = '',
  withArrow = false,
  ...props
}) {
  const variants = {
    primary: 'brand-button border border-white/10',
    secondary: 'secondary-button',
    light: 'border border-white/40 bg-white/90 text-slate-900 shadow-[0_16px_36px_rgba(148,163,184,0.16)]',
  }

  return (
    <Link
      to={to}
      className={cn(
        'startup-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-[0.01em]',
        variants[variant],
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {withArrow ? <ArrowRight className="h-4 w-4" /> : null}
    </Link>
  )
}

export default ButtonLink
