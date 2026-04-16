import { motion, useReducedMotion } from 'framer-motion'

function PageHero({ badge, title, description }) {
  const MotionDiv = motion.div
  const MotionSpan = motion.span
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="hero-mesh hero-glow animated-border relative overflow-hidden rounded-[2rem] border border-white/70 px-6 py-12 text-center sm:px-10 sm:py-16">
      <MotionDiv
        className="floating-orb absolute left-10 top-10 h-20 w-20 rounded-full bg-blue-200/35 blur-2xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -12, 0], x: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <MotionDiv
        className="float-slow absolute bottom-8 right-10 h-24 w-24 rounded-full bg-cyan-200/30 blur-2xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -10, 0], x: [0, -8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <MotionDiv
        className="pulse-glow absolute left-[18%] top-[24%] h-16 w-16 rounded-full bg-white/55 blur-2xl"
        animate={prefersReducedMotion ? undefined : { opacity: [0.3, 0.6, 0.3], scale: [0.96, 1.08, 0.96] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 opacity-35">
        <div className="premium-grid grid-drift absolute inset-[-12%]" />
      </div>
      {[...Array(6)].map((_, index) => (
        <MotionDiv
          key={`page-hero-particle-${index}`}
          className="absolute rounded-full bg-blue-300/25"
          style={{
            left: `${14 + index * 12}%`,
            top: `${22 + (index % 3) * 16}%`,
            width: index % 2 === 0 ? '8px' : '6px',
            height: index % 2 === 0 ? '8px' : '6px',
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -10 - (index % 2) * 4, 0],
                  opacity: [0.14, 0.42, 0.14],
                }
          }
          transition={{
            duration: 5.4 + index * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.25,
          }}
        />
      ))}
      <div className="relative">
        <MotionSpan
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel inline-flex rounded-full border border-blue-100 px-4 py-1 text-sm font-semibold tracking-[0.08em] text-blue-800"
        >
          {badge}
        </MotionSpan>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-slate-900 sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[1.02rem] leading-8 text-slate-700 sm:text-[1.1rem]">
          {description}
        </p>
      </div>
    </section>
  )
}

export default PageHero
