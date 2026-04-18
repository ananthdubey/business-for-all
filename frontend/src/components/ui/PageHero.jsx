import { motion, useReducedMotion } from 'framer-motion'

function PageHero({ badge, title, description }) {
  const MotionDiv = motion.div
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="hero-shell animated-border relative overflow-hidden rounded-[2.25rem] border border-white/10 px-6 py-12 sm:px-10 sm:py-16">
      <MotionDiv
        className="floating-orb absolute left-[-2rem] top-8 h-28 w-28 rounded-full bg-[rgba(108,92,231,0.22)] blur-3xl"
        animate={prefersReducedMotion ? undefined : { x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <MotionDiv
        className="float-slow absolute bottom-0 right-6 h-32 w-32 rounded-full bg-[rgba(24,199,216,0.18)] blur-3xl"
        animate={prefersReducedMotion ? undefined : { x: [0, -18, 0], y: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 opacity-40">
        <div className="premium-grid grid-drift absolute inset-[-8%]" />
      </div>
      <div className="relative max-w-3xl">
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold tracking-[0.16em] text-cyan-300 uppercase">
          {badge}
        </span>
        <h1 className="mt-5 text-4xl font-bold leading-[1.02] theme-text-primary sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 theme-text-secondary sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  )
}

export default PageHero
