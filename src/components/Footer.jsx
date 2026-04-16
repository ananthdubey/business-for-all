import { socialLinks } from '../data/socialLinks'
import SocialIcon from './ui/SocialIcon'

function Footer() {
  return (
    <footer className="mt-8 rounded-[2rem] border border-slate-200/80 bg-[#F8FAFC] px-6 py-8 text-sm text-slate-700 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
      <div className="flex flex-col gap-8 text-center sm:text-left lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-900">Business for All</p>
          <p className="mt-2 max-w-md leading-6">
            Premium franchise opportunities designed for ambitious founders who want
            a proven path, trusted support, and room to scale.
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-semibold uppercase tracking-[0.18em] text-blue-700">Follow Us</p>
          <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="startup-button group inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white px-4 py-3 text-slate-800 shadow-[0_10px_24px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:border-blue-100 hover:text-blue-700 hover:shadow-[0_14px_28px_rgba(37,99,235,0.12)]"
              >
                <SocialIcon item={item} className="group-hover:scale-110" />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-1 lg:text-right">
          <p className="font-medium text-slate-700">Built with React, Vite, and Tailwind CSS.</p>
          <p>Professional franchise platform for modern investors and operators.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
