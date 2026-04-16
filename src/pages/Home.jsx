import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ButtonLink from '../components/ui/ButtonLink'
import { AnimatedReveal, StaggerGroup, StaggerItem } from '../components/ui/AnimatedReveal'
import FeatureCard from '../components/ui/FeatureCard'
import PageSection from '../components/ui/PageSection'
import PremiumCarousel from '../components/ui/PremiumCarousel'
import PricingCard from '../components/ui/PricingCard'
import SectionHeading from '../components/ui/SectionHeading'
import TestimonialCard from '../components/ui/TestimonialCard'
import VideoShowcase from '../components/ui/VideoShowcase'
import { apiRequest } from '../utils/api'
import {
  carouselHighlights,
  featuredVideos,
  homeFeatures,
  homeSteps,
  pricingPlans,
  testimonials,
} from '../data/siteContent'

const trustBadges = ['Low Investment', 'Full Support', 'Trusted Model']
const fallbackCategoryCards = [
  {
    title: 'Retail & Everyday Services',
    description: 'Investor-friendly franchise options with repeat demand and strong local visibility.',
  },
  {
    title: 'Education & Skill Centers',
    description: 'Structured models built for community trust, recurring engagement, and scalable operations.',
  },
  {
    title: 'Health, Wellness & Lifestyle',
    description: 'Modern concepts designed for aspirational markets and premium customer experience.',
  },
]

const formatCurrency = (value) =>
  typeof value === 'number' ? `Rs.${value.toLocaleString()}` : 'Flexible'

function Home() {
  const MotionSection = motion.section
  const MotionDiv = motion.div
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 90, damping: 18 })
  const springY = useSpring(pointerY, { stiffness: 90, damping: 18 })
  const blobOneX = useTransform(springX, [-0.5, 0.5], [-18, 18])
  const blobOneY = useTransform(springY, [-0.5, 0.5], [-12, 12])
  const blobTwoX = useTransform(springX, [-0.5, 0.5], [16, -16])
  const blobTwoY = useTransform(springY, [-0.5, 0.5], [10, -10])
  const panelX = useTransform(springX, [-0.5, 0.5], [-12, 12])
  const panelY = useTransform(springY, [-0.5, 0.5], [-8, 8])
  const [dynamicCategories, setDynamicCategories] = useState([])
  const hasLoadedCategories = useRef(false)

  useEffect(() => {
    if (hasLoadedCategories.current) {
      return undefined
    }

    hasLoadedCategories.current = true

    const loadCategories = async () => {
      try {
        const response = await apiRequest('/api/categories?active=true&limit=5')
        setDynamicCategories(response.data || [])
      } catch {
        setDynamicCategories([])
      }
    }

    loadCategories()
    return undefined
  }, [])

  const handleHeroPointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const nextX = (event.clientX - bounds.left) / bounds.width - 0.5
    const nextY = (event.clientY - bounds.top) / bounds.height - 0.5

    pointerX.set(nextX)
    pointerY.set(nextY)
  }

  const handleHeroPointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  const showcaseCategories = dynamicCategories.length
    ? dynamicCategories.slice(0, 3).map((category) => ({
        title: category.title,
        description: category.description,
      }))
    : fallbackCategoryCards

  const carouselSlides = dynamicCategories.length
    ? dynamicCategories.slice(0, 5).map((category, index) => ({
        title: category.title,
        description: category.description,
        tag: category.type || `Category ${index + 1}`,
        metric: `${formatCurrency(category.investmentMin)} - ${formatCurrency(category.investmentMax)}`,
      }))
    : carouselHighlights

  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12">
      <MotionSection
        className="hero-mesh hero-glow animated-border relative overflow-hidden rounded-[2rem] border border-blue-100/80 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
        onMouseMove={handleHeroPointerMove}
        onMouseLeave={handleHeroPointerLeave}
      >
        <MotionDiv
          className="floating-orb absolute left-[-3rem] top-[-3rem] h-40 w-40 rounded-full bg-blue-200/35 blur-3xl"
          style={{ x: blobOneX, y: blobOneY }}
        />
        <MotionDiv
          className="float-slow absolute right-[12%] top-[10%] h-28 w-28 rounded-full bg-sky-200/35 blur-3xl"
          style={{ x: blobTwoX, y: blobTwoY }}
        />
        <MotionDiv
          className="floating-orb absolute bottom-[12%] right-[-2rem] h-44 w-44 rounded-full bg-cyan-200/35 blur-3xl"
          style={{ x: blobOneY, y: blobTwoX }}
        />
        <MotionDiv
          className="pulse-glow absolute left-[18%] top-[22%] h-20 w-20 rounded-full bg-white/60 blur-2xl"
          style={{ x: blobTwoX, y: blobOneY }}
        />
        <div className="absolute inset-0 opacity-45">
          <div className="premium-grid grid-drift absolute inset-[-8%]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.9),transparent_32%)]" />
        {[...Array(10)].map((_, index) => (
          <MotionDiv
            key={`hero-particle-${index}`}
            className="absolute rounded-full bg-blue-300/30"
            style={{
              left: `${8 + index * 8}%`,
              top: `${18 + (index % 4) * 16}%`,
              width: index % 3 === 0 ? '10px' : '6px',
              height: index % 3 === 0 ? '10px' : '6px',
            }}
            animate={{
              y: [0, -12 - (index % 3) * 4, 0],
              opacity: [0.12, 0.42, 0.12],
              scale: [0.92, 1.18, 0.92],
            }}
            transition={{
              duration: 4.4 + index * 0.35,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.22,
            }}
          />
        ))}

        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <AnimatedReveal className="flex flex-col justify-center">
            <span className="glass-panel inline-flex w-fit rounded-full border border-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
              Premium franchise ecosystem
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[0.98] tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[0.96]">
              Start Your Own Business Without Starting From Scratch
            </h1>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-8 text-slate-700 sm:text-[1.12rem]">
              Launch your franchise with a proven business model and full support.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                to="/contact"
                className="min-w-[10rem] shadow-[0_22px_44px_rgba(37,99,235,0.28)]"
              >
                Apply Now
              </ButtonLink>
              <ButtonLink
                to="/franchise"
                variant="secondary"
                className="min-w-[12rem] border-blue-200 bg-white/90 text-slate-900 shadow-[0_16px_34px_rgba(15,23,42,0.1)]"
              >
                Explore Categories
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {trustBadges.map((badge, index) => (
                <MotionDiv
                  key={badge}
                  className="glass-panel rounded-full border border-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.12, duration: 0.5 }}
                >
                  {badge}
                </MotionDiv>
              ))}
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.15} className="relative flex min-h-[28rem] items-center justify-center">
            <MotionDiv
              className="glass-panel animated-border relative w-full max-w-lg rounded-[2rem] border border-white/80 p-6 shadow-[0_28px_80px_rgba(30,58,138,0.14)]"
              style={{ x: panelX, y: panelY, rotateX: springY, rotateY: springX }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MotionDiv
                className="absolute -left-8 top-12 h-24 w-24 rounded-full bg-blue-300/20 blur-3xl"
                style={{ x: blobOneX, y: blobTwoY }}
              />
              <MotionDiv
                className="absolute -right-8 bottom-10 h-28 w-28 rounded-full bg-cyan-300/20 blur-3xl"
                style={{ x: blobTwoX, y: blobOneY }}
              />
              <div className="grid gap-4">
                <div className="rounded-[1.5rem] border border-blue-100 bg-[linear-gradient(135deg,#eef4ff_0%,#ffffff_100%)] p-5 text-slate-900">
                  <p className="text-sm text-cyan-700">Investor confidence</p>
                  <p className="mt-2 text-2xl font-bold leading-snug tracking-[-0.02em]">A launch-ready business framework</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="glass-panel rounded-[1.5rem] border border-white/70 p-5">
                    <p className="text-sm text-slate-600">Entry model</p>
                    <p className="mt-2 text-xl font-bold tracking-[-0.02em] text-slate-900">Low investment</p>
                  </div>
                  <div className="glass-panel rounded-[1.5rem] border border-white/70 p-5">
                    <p className="text-sm text-slate-600">Support promise</p>
                    <p className="mt-2 text-xl font-bold tracking-[-0.02em] text-slate-900">Full operational guidance</p>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-[1.5rem] border border-blue-100 bg-[linear-gradient(135deg,#ffffff_0%,#eef4ff_100%)] px-5 py-6 text-slate-900">
                  <div className="pulse-glow absolute right-6 top-5 h-16 w-16 rounded-full bg-cyan-300/25 blur-2xl" />
                  <p className="text-sm text-slate-600">Growth visibility</p>
                  <p className="mt-2 max-w-xs text-lg font-bold leading-7 tracking-[-0.02em]">
                    Trusted model with smooth onboarding, launch support, and scale systems.
                  </p>
                </div>
              </div>
            </MotionDiv>
          </AnimatedReveal>
        </div>
      </MotionSection>

      <AnimatedReveal>
        <PageSection tone="gray">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Everything you need to start strong"
            description="A premium support structure built for founders who want speed, trust, and a proven operating model."
          />
          <StaggerGroup className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {homeFeatures.map((feature, index) => (
              <StaggerItem key={feature.title}>
                <FeatureCard {...feature} icon={index + 1} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="white">
          <SectionHeading
            eyebrow="Franchise Categories"
            title="Opportunities shaped for modern demand"
            description="Explore concept directions tailored for practical launch potential, brand trust, and sustainable growth."
          />
          <StaggerGroup className="mt-8 grid gap-4 lg:grid-cols-3">
            {showcaseCategories.map((category, index) => (
              <StaggerItem key={category.title}>
                <FeatureCard {...category} icon={['R', 'E', 'W'][index]} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="tint">
          <SectionHeading
            eyebrow="Highlights"
            title="Explore categories and success drivers in motion"
            description="A premium carousel for showcasing franchise opportunities, trusted systems, and high-potential entry points."
          />
          <div className="mt-8">
            <PremiumCarousel slides={carouselSlides} />
          </div>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="white">
          <SectionHeading
            eyebrow="How It Works"
            title="A simple path from sign-up to scale"
            description="Clear milestones, transparent support, and smooth execution from onboarding to expansion."
            dark
          />
          <StaggerGroup className="mt-8 grid gap-4 lg:grid-cols-4">
            {homeSteps.map((step, index) => (
              <StaggerItem key={step.title}>
                <FeatureCard
                  title={`Step ${index + 1}: ${step.title}`}
                  description={step.description}
                  dark
                  icon={index + 1}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="gray">
          <SectionHeading
            eyebrow="Video Showcase"
            title="Watch Success Stories & Learn More"
            description="Explore featured business opportunity videos, success stories, and founder-focused insights in a premium embedded showcase."
          />
          <div className="mt-8">
            <VideoShowcase videos={featuredVideos} />
          </div>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="white">
          <SectionHeading
            eyebrow="Investment Plans"
            title="Premium plan design for different growth stages"
            description="Clear plan positioning for first-time founders, growth-focused operators, and ambitious franchise buyers."
          />
          <StaggerGroup className="mt-8 grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <StaggerItem key={plan.name}>
                <PricingCard {...plan} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="tint">
          <SectionHeading
            eyebrow="Testimonials"
            title="Founders who started with momentum"
            description="Social proof that reinforces trust, execution quality, and the strength of the model."
          />
          <StaggerGroup className="mt-8 grid gap-4 lg:grid-cols-3">
            {testimonials.map((item) => (
              <StaggerItem key={item.name}>
                <TestimonialCard {...item} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <section className="animated-border relative overflow-hidden rounded-[2rem] border border-blue-100 bg-[linear-gradient(135deg,#eef4ff_0%,#ffffff_70%,#f8fafc_100%)] px-6 py-10 text-slate-900 shadow-[0_22px_60px_rgba(37,99,235,0.1)] sm:px-10 sm:py-12">
          <div className="pulse-glow absolute left-[-3rem] top-[-2rem] h-28 w-28 rounded-full bg-blue-200/30 blur-2xl" />
          <div className="float-slow absolute bottom-[-2rem] right-[10%] h-28 w-28 rounded-full bg-cyan-300/25 blur-2xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Final CTA
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Ready to build something that already has momentum?
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg">
                Take the next step toward launching a business with guidance,
                systems, and room to grow.
              </p>
            </div>
            <div>
              <ButtonLink to="/contact">
                Apply Now
              </ButtonLink>
            </div>
          </div>
        </section>
      </AnimatedReveal>
    </div>
  )
}

export default Home
