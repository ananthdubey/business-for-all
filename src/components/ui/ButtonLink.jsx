import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

function ButtonLink({ to, children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary:
      'border border-blue-800/80 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 text-white shadow-[0_18px_40px_rgba(30,58,138,0.24)] hover:shadow-[0_24px_48px_rgba(30,58,138,0.28)]',
    secondary:
      'glass-panel border border-blue-100 text-slate-800 shadow-[0_12px_28px_rgba(15,23,42,0.07)] hover:border-blue-200 hover:bg-white',
    light:
      'border border-white/70 bg-white text-blue-800 shadow-[0_14px_34px_rgba(148,163,184,0.14)] hover:bg-blue-50',
  }

  return (
    <Link
      to={to}
      className={cn(
        'startup-button inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-[0.01em]',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

export default ButtonLink
