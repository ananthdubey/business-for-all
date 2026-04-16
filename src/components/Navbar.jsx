import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { navigationLinks } from '../data/navigation'
import { socialLinks } from '../data/socialLinks'
import ButtonLink from './ui/ButtonLink'
import SocialIcon from './ui/SocialIcon'

function Navbar() {
  const MotionNav = motion.nav
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClassName = ({ isActive }) =>
    `startup-button rounded-full px-4 py-2 transition ${
      isActive
        ? 'border border-blue-100 bg-blue-50 text-blue-700 shadow-[0_10px_26px_rgba(37,99,235,0.12)]'
        : 'text-slate-800 hover:bg-white hover:text-blue-700'
    }`

  return (
    <header className="sticky top-3 z-50 sm:top-4">
      <MotionNav
        initial={false}
        animate={{
          backgroundColor: isScrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.78)',
          borderColor: isScrolled ? 'rgba(226,232,240,0.95)' : 'rgba(219,234,254,0.8)',
          boxShadow: isScrolled
            ? '0 18px 44px rgba(15, 23, 42, 0.1)'
            : '0 12px 28px rgba(148, 163, 184, 0.1)',
        }}
        className="glass-panel rounded-[1.75rem] border px-4 py-4 backdrop-blur-xl sm:px-6"
      >
        <div className="flex items-center justify-between gap-4">
          <NavLink
            to="/"
            className="startup-button rounded-full px-3 py-2 text-xl font-extrabold tracking-tight text-slate-900"
          >
            <span className="gradient-text">Business</span> for All
          </NavLink>

          <button
            type="button"
            className="startup-button inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-100 bg-white/80 text-slate-700 shadow-sm hover:bg-white md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-current transition-transform ${
                  isOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-opacity ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-transform ${
                  isOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </div>
          </button>

          <div className="hidden items-center gap-2 text-sm font-medium xl:flex">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={linkClassName}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                <ButtonLink to="/dashboard" className="ml-2" variant="secondary">
                  Dashboard
                </ButtonLink>
                <button
                  type="button"
                  onClick={async () => {
                    await logout()
                    navigate('/')
                  }}
                  className="startup-button rounded-full border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <ButtonLink to="/login" className="ml-2" variant="secondary">
                  Login
                </ButtonLink>
                <ButtonLink to="/register">
                  Register
                </ButtonLink>
              </>
            )}
          </div>

          <div className="hidden items-center gap-2 md:flex xl:hidden">
            {socialLinks.slice(0, 3).map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="startup-button group inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:text-blue-700 hover:shadow-[0_14px_28px_rgba(37,99,235,0.14)]"
              >
                <SocialIcon item={item} />
              </a>
            ))}
          </div>
        </div>

        <div
          id="mobile-navigation"
          className={`${isOpen ? 'mt-4 flex' : 'hidden'} flex-col gap-2 border-t border-blue-100 pt-4 md:hidden`}
        >
          {navigationLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={linkClassName}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <>
              <ButtonLink to="/dashboard" className="mt-2 w-full" variant="secondary" onClick={() => setIsOpen(false)}>
                Dashboard
              </ButtonLink>
              <button
                type="button"
                onClick={async () => {
                  setIsOpen(false)
                  await logout()
                  navigate('/')
                }}
                className="startup-button mt-2 inline-flex w-full items-center justify-center rounded-full border border-blue-100 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <ButtonLink to="/login" className="mt-2 w-full" variant="secondary" onClick={() => setIsOpen(false)}>
                Login
              </ButtonLink>
              <ButtonLink to="/register" className="mt-2 w-full" onClick={() => setIsOpen(false)}>
                Register
              </ButtonLink>
            </>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="startup-button group inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:text-blue-700 hover:shadow-[0_14px_28px_rgba(37,99,235,0.14)]"
              >
                <SocialIcon item={item} />
              </a>
            ))}
          </div>
        </div>
      </MotionNav>
    </header>
  )
}

export default Navbar
