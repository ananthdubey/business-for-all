import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Menu,
  Sparkles,
  X,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { navigationLinks } from '../data/navigation'
import ButtonLink from './ui/ButtonLink'

function Navbar() {
  const MotionNav = motion.nav
  const navigate = useNavigate()
  const { isAuthenticated, logout, user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClassName = ({ isActive }) =>
    [
      'startup-button rounded-full px-4 py-2 text-sm font-medium',
      isActive
        ? 'bg-[rgba(108,92,231,0.14)] text-[var(--text-primary)] shadow-[0_10px_24px_rgba(79,124,255,0.12)]'
        : 'theme-text-secondary hover:bg-white/10 hover:text-[var(--text-primary)]',
    ].join(' ')

  return (
    <header id="top" className="sticky top-3 z-50 sm:top-4">
      <MotionNav
        initial={false}
        animate={{
          y: isScrolled ? 0 : 2,
          boxShadow: isScrolled
            ? '0 20px 60px rgba(15,23,42,0.18)'
            : '0 12px 36px rgba(15,23,42,0.08)',
        }}
        className={`nav-shell rounded-[1.8rem] px-4 py-4 sm:px-6 ${isScrolled ? 'premium-surface' : 'glass-panel'}`}
      >
        <div className="flex items-center justify-between gap-4">
          <NavLink to="/" className="startup-button flex items-center gap-3 rounded-full px-2 py-1">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6c5ce7,#18c7d8)] text-white shadow-[0_14px_30px_rgba(108,92,231,0.28)]">
              <Sparkles className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-[0.22em] text-cyan-500">Business for All</span>
              <span className="block text-base font-bold theme-text-primary">Franchise Growth Platform</span>
            </span>
          </NavLink>

          <div className="hidden items-center gap-2 xl:flex">
            {isAuthenticated
              ? navigationLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/home'}
                  className={linkClassName}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))
              : null}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <>
                <div className="kpi-chip hidden items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] theme-text-secondary lg:inline-flex">
                  <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Live platform
                </div>
                <div className="hidden rounded-full border theme-border bg-white/8 px-4 py-2 text-sm font-medium theme-text-secondary lg:block">
                  {user?.fullName?.split(' ')[0] || 'Member'}
                </div>
                <ButtonLink to="/dashboard" variant="secondary">
                  Dashboard
                </ButtonLink>
                <button
                  type="button"
                  onClick={async () => {
                    await logout()
                    navigate('/')
                  }}
                  className="startup-button secondary-button rounded-full px-5 py-3 text-sm font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <ButtonLink to="/login" variant="secondary">
                  Login
                </ButtonLink>
                <ButtonLink to="/register" withArrow>
                  Become a Partner
                </ButtonLink>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="startup-button secondary-button inline-flex h-11 w-11 items-center justify-center rounded-full"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isOpen ? (
          <div id="mobile-navigation" className="mt-4 space-y-2 border-t theme-border pt-4 md:hidden">
            {isAuthenticated
              ? navigationLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/home'}
                  className={linkClassName}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))
              : null}
            <div className="grid gap-3 pt-2">
              {isAuthenticated ? (
                <>
                  <ButtonLink to="/dashboard" variant="secondary" className="w-full" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </ButtonLink>
                  <button
                    type="button"
                    onClick={async () => {
                      setIsOpen(false)
                      await logout()
                      navigate('/')
                    }}
                    className="startup-button secondary-button w-full rounded-full px-5 py-3 text-sm font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <ButtonLink to="/login" variant="secondary" className="w-full" onClick={() => setIsOpen(false)}>
                    Login
                  </ButtonLink>
                  <ButtonLink to="/register" className="w-full" onClick={() => setIsOpen(false)}>
                    Become a Partner
                  </ButtonLink>
                </>
              )}
            </div>
          </div>
        ) : null}
      </MotionNav>
    </header>
  )
}

export default Navbar
