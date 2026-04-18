import { useState } from 'react'
import { Link } from 'react-router-dom'
import { socialLinks } from '../data/socialLinks'
import useAuth from '../hooks/useAuth'
import useToast from '../hooks/useToast'
import SocialIcon from './ui/SocialIcon'

const footerLinks = [
  { label: 'About', to: '/about' },
  { label: 'Opportunities', to: '/franchise' },
  { label: 'Plans', to: '/plans' },
  { label: 'Support', to: '/contact' },
  { label: 'Partner Login', to: '/login' },
  { label: 'Privacy', to: '/contact' },
  { label: 'Terms', to: '/contact' },
]

function Footer() {
  const { isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (event) => {
    event.preventDefault()
    if (!email.trim()) {
      showToast({
        tone: 'info',
        title: 'Enter an email address',
        description: 'We use the newsletter field as a conversion-ready placeholder for future CRM integration.',
      })
      return
    }

    showToast({
      tone: 'success',
      title: 'Interest captured',
      description: `Newsletter placeholder captured for ${email}.`,
    })
    setEmail('')
  }

  const publicLinks = [
    { label: 'Login', to: '/login' },
    { label: 'Become a Partner', to: '/register' },
  ]

  return (
    <footer className="section-shell-muted mt-8 rounded-[2.3rem] px-6 py-8 sm:px-8 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
            Business for All
          </p>
          <h3 className="mt-4 text-3xl font-bold theme-text-primary">
            Serious infrastructure for modern franchise founders.
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-7 theme-text-secondary sm:text-base">
            Explore scalable business opportunities, investor-ready systems, and launch support designed to turn ambition into real operating businesses.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/register" className="startup-button brand-button inline-flex rounded-full px-5 py-3 text-sm font-semibold">
              Become a Partner
            </Link>
            <Link
              to={isAuthenticated ? '/contact' : '/login'}
              className="startup-button secondary-button inline-flex rounded-full px-5 py-3 text-sm font-semibold"
            >
              {isAuthenticated ? 'Open Support' : 'Login'}
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ['250+', 'active franchise brands'],
              ['95%', 'partner satisfaction'],
              ['65+', 'cities evaluated'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[1.2rem] border theme-border bg-white/8 px-4 py-4">
                <p className="text-xl font-bold theme-text-primary">{value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] theme-text-tertiary">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
            {isAuthenticated ? 'Company' : 'Get Started'}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(isAuthenticated ? footerLinks : publicLinks).map((item) => (
              <Link key={item.label} to={item.to} className="startup-button theme-text-secondary hover:text-[var(--text-primary)]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
            Connect
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="startup-button secondary-button inline-flex h-11 w-11 items-center justify-center rounded-full"
              >
                <SocialIcon item={item} />
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm theme-text-tertiary">
            hello@businessforall.com
            <br />
            +91 98765 43210
          </p>
          <form onSubmit={handleNewsletterSubmit} className="mt-6 space-y-3">
            <label htmlFor="newsletter-email" className="block text-sm font-semibold theme-text-primary">
              Newsletter
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="form-field min-h-11 flex-1 rounded-full px-4 py-3 text-sm outline-none"
              />
              <button type="submit" className="startup-button brand-button rounded-full px-5 py-3 text-sm font-semibold">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3 border-t theme-border pt-5 text-sm theme-text-tertiary sm:flex-row sm:items-center sm:justify-between">
        <span>Built for modern franchise discovery, qualification, and launch support.</span>
        <span>(c) 2026 Business for All. All rights reserved.</span>
      </div>
    </footer>
  )
}

export default Footer
