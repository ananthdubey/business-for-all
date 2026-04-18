import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  CircleDollarSign,
  Rocket,
  Star,
  TrendingUp,
} from 'lucide-react'
import ButtonLink from '../components/ui/ButtonLink'
import { AnimatedReveal, StaggerGroup, StaggerItem } from '../components/ui/AnimatedReveal'
import FeatureCard from '../components/ui/FeatureCard'
import PageSection from '../components/ui/PageSection'
import SectionHeading from '../components/ui/SectionHeading'
import usePageMeta from '../hooks/usePageMeta'
import {
  homeFeatures,
  homeSteps,
  testimonials,
} from '../data/siteContent'

const trustStats = [
  { label: 'Aspiring founders', value: 10000, suffix: '+', prefix: '' },
  { label: 'Franchise brands', value: 250, suffix: '+', prefix: '' },
  { label: 'Ecosystem value', value: 50, suffix: 'Cr+', prefix: 'Rs ' },
  { label: 'Partner satisfaction', value: 95, suffix: '%', prefix: '' },
]

const heroMetrics = [
  { label: 'Launch playbooks', value: '120+' },
  { label: 'Cities evaluated', value: '65+' },
  { label: 'Avg. setup speed', value: '43 days' },
]

const iconMap = [Rocket, CircleDollarSign, TrendingUp]

function CountUp({ value, suffix = '', prefix = '' }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let frameId
    const duration = 1400
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      setDisplayValue(Math.round(value * progress))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick)
      }
    }

    frameId = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(frameId)
  }, [value])

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}

function Home() {
  usePageMeta({
    title: 'Home',
    description:
      'Business for All is a premium franchise discovery platform for browsing, comparing, saving, and applying to launch-ready business opportunities.',
  })

  const MotionDiv = motion.div
  const [selectedTestimonial, setSelectedTestimonial] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSelectedTestimonial((current) => (current + 1) % testimonials.length)
    }, 4500)

    return () => window.clearInterval(intervalId)
  }, [])

  const currentTestimonial = testimonials[selectedTestimonial]

  return (
    <div className="space-y-10 sm:space-y-12 lg:space-y-14">
      <section className="hero-shell hero-mesh animated-border relative overflow-hidden rounded-[2.4rem] border border-white/10 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="absolute inset-0 opacity-40">
          <div className="premium-grid grid-drift absolute inset-[-10%]" />
        </div>
        <div className="pulse-glow absolute left-[-3rem] top-[-2rem] h-44 w-44 rounded-full bg-[rgba(108,92,231,0.22)] blur-3xl" />
        <div className="float-slow absolute bottom-[10%] right-[-3rem] h-52 w-52 rounded-full bg-[rgba(24,199,216,0.18)] blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <AnimatedReveal className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/30 bg-white/12 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">
              Investor-grade franchise discovery platform
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[0.95] theme-text-primary sm:text-5xl lg:text-7xl">
              Start your franchise journey today with the confidence of a serious operator
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 theme-text-secondary sm:text-lg">
              Business for All combines vetted opportunities, capital-fit guidance, and a premium onboarding experience so founders can move from interest to launch with trust, clarity, and speed.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/login" className="min-w-[12rem]" withArrow>
                Login
              </ButtonLink>
              <ButtonLink to="/register" variant="secondary" className="min-w-[12rem]">
                Become a Partner
              </ButtonLink>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm theme-text-secondary">
              {['Verified opportunities', 'Protected dashboard', 'Advisor-backed launch path'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border theme-border bg-white/8 px-4 py-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {heroMetrics.map((metric) => (
                <div key={metric.label} className="glass-panel rounded-[1.35rem] p-4">
                  <p className="text-2xl font-bold theme-text-primary">{metric.value}</p>
                  <p className="mt-1 text-sm theme-text-secondary">{metric.label}</p>
                </div>
              ))}
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.15}>
            <MotionDiv
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-panel relative rounded-[2rem] p-5"
            >
              <div className="flex items-center justify-between rounded-[1.4rem] border theme-border bg-white/8 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-400">Founder dashboard</p>
                  <p className="mt-1 text-lg font-semibold theme-text-primary">Growth command center</p>
                </div>
                <div className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Live demand
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="surface-panel rounded-[1.5rem] p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm theme-text-secondary">Projected monthly growth</p>
                    <TrendingUp className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="mt-5 flex items-end gap-3">
                    {[48, 72, 66, 92, 118, 138].map((height, index) => (
                      <MotionDiv
                        key={height}
                        className="flex-1 rounded-t-2xl bg-[linear-gradient(180deg,rgba(24,199,216,0.35),rgba(108,92,231,0.82))]"
                        style={{ height }}
                        animate={{ opacity: [0.72, 1, 0.72] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.12 }}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm theme-text-secondary">
                    <span>Setup velocity</span>
                    <span className="font-semibold text-emerald-400">+38%</span>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="surface-panel rounded-[1.5rem] p-5">
                    <p className="text-sm theme-text-secondary">Matched opportunities</p>
                    <p className="mt-2 text-3xl font-bold theme-text-primary">18</p>
                    <p className="mt-2 text-sm theme-text-tertiary">Based on location, capital, and growth goals.</p>
                  </div>
                  <div className="surface-panel rounded-[1.5rem] p-5">
                    <p className="text-sm theme-text-secondary">Readiness score</p>
                    <p className="mt-2 text-3xl font-bold theme-text-primary">92%</p>
                    <div className="mt-4 h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[92%] rounded-full bg-[linear-gradient(90deg,#18c7d8,#6c5ce7)]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {[
                  ['ROI snapshot', '26-34%'],
                  ['Investment fit', 'Rs 8L-Rs 22L'],
                  ['Launch support', 'Included'],
                ].map(([label, value]) => (
                  <div key={label} className="surface-panel rounded-[1.35rem] p-4">
                    <p className="text-xs uppercase tracking-[0.16em] theme-text-tertiary">{label}</p>
                    <p className="mt-2 text-lg font-semibold theme-text-primary">{value}</p>
                  </div>
                ))}
              </div>
            </MotionDiv>
          </AnimatedReveal>
        </div>
      </section>

      <AnimatedReveal>
        <PageSection tone="default" className="relative">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Built like a serious startup, not a generic listing site"
            description="The product experience is designed to increase trust, shorten decision cycles, and help users feel guided at every step."
          />
          <StaggerGroup className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {homeFeatures.map((feature, index) => (
              <StaggerItem key={feature.title}>
                <FeatureCard {...feature} icon={index + 1} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="muted" className="relative">
          <SectionHeading
            eyebrow="How It Works"
            title="A clean three-step path from ambition to operation"
            description="We remove decision friction with a startup-grade flow that helps founders discover, prepare, and launch faster."
          />
          <StaggerGroup className="mt-8 grid gap-5 lg:grid-cols-3">
            {homeSteps.map((step, index) => {
              const Icon = iconMap[index]
              return (
                <StaggerItem key={step.title}>
                  <div className="startup-card surface-panel rounded-[1.8rem] p-6">
                    <div className="flex items-center gap-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(108,92,231,0.16),rgba(24,199,216,0.16))]">
                        <Icon className="h-5 w-5 theme-text-primary" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-cyan-500">Step {index + 1}</p>
                        <h3 className="text-xl font-bold theme-text-primary">{step.title}</h3>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 theme-text-secondary sm:text-base">{step.description}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="muted" className="relative">
          <div className="hero-shell rounded-[2rem] border border-white/10 px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
            <SectionHeading
              eyebrow="Ready To Begin"
              title="Create your account and move into the protected partner experience"
              description="Public visitors get a clean, high-trust overview. Once you sign in, the full franchise discovery and dashboard workflow opens up."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/register" className="min-w-[12rem]" withArrow>
                Become a Partner
              </ButtonLink>
              <ButtonLink to="/login" variant="secondary" className="min-w-[12rem]">
                Login
              </ButtonLink>
            </div>
          </div>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="muted" className="relative">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trustStats.map((stat) => (
              <div key={stat.label} className="stat-glow glass-panel rounded-[1.6rem] p-6">
                <p className="text-4xl font-bold theme-text-primary">
                  <CountUp value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </p>
                <p className="mt-2 text-sm theme-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="muted" className="relative">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="surface-panel rounded-[2rem] p-6 sm:p-8">
              <SectionHeading
                eyebrow="Founder Stories"
                title="Proof that the platform feels trustworthy"
                description="A rotating testimonial module adds social proof without making the page feel static."
              />
              <div className="mt-6 flex gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelectedTestimonial(index)}
                    className={`startup-button h-2 flex-1 rounded-full ${
                      index === selectedTestimonial ? 'bg-[linear-gradient(90deg,#6c5ce7,#18c7d8)]' : 'bg-white/12'
                    }`}
                    aria-label={`View testimonial from ${item.name}`}
                  />
                ))}
              </div>
            </div>

            <MotionDiv
              key={currentTestimonial.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="surface-panel rounded-[2rem] p-6 sm:p-8"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-6 text-xl leading-9 theme-text-primary sm:text-2xl">
                "{currentTestimonial.quote}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#6c5ce7,#18c7d8)] text-lg font-bold text-white">
                  {currentTestimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold theme-text-primary">{currentTestimonial.name}</p>
                  <p className="text-sm theme-text-secondary">
                    {currentTestimonial.role} | {currentTestimonial.location}
                  </p>
                </div>
              </div>
            </MotionDiv>
          </div>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <section id="final-cta" className="hero-shell animated-border relative overflow-hidden rounded-[2.2rem] border border-white/10 px-6 py-10 sm:px-10 sm:py-12">
          <div className="absolute inset-0 opacity-30 dot-pattern" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
                Final CTA
              </p>
              <h2 className="mt-3 text-3xl font-bold theme-text-primary sm:text-4xl">
                Your next serious business move can start in one session
              </h2>
              <p className="mt-4 text-base leading-8 theme-text-secondary sm:text-lg">
                Explore opportunities, compare economics, and step into a guided launch experience built to feel trustworthy from the first click.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/register" className="min-w-[11rem]">
                Become a Partner
              </ButtonLink>
              <ButtonLink to="/login" variant="secondary" className="min-w-[11rem]">
                Login
              </ButtonLink>
            </div>
          </div>
        </section>
      </AnimatedReveal>
    </div>
  )
}

export default Home
