import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function PremiumCarousel({ slides }) {
  const MotionButton = motion.button
  const MotionDiv = motion.div
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    if (!slides.length) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setDirection(1)
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 4000)

    return () => window.clearInterval(timer)
  }, [slides.length])

  if (!slides.length) {
    return null
  }

  const safeActiveIndex = activeIndex % slides.length

  const handlePrev = () => {
    setDirection(-1)
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
  }

  const handleNext = () => {
    setDirection(1)
    setActiveIndex((current) => (current + 1) % slides.length)
  }

  const handleDotClick = (index) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  const activeSlide = slides[safeActiveIndex]

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-4 shadow-[0_18px_44px_rgba(15,23,42,0.06)] sm:p-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="floating-orb absolute left-[-2rem] top-[-1rem] h-32 w-32 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="float-slow absolute bottom-[-2rem] right-[10%] h-36 w-36 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pulse-glow absolute right-[18%] top-[15%] h-20 w-20 rounded-full bg-violet-300/20 blur-2xl" />
      </div>

      <div className="relative">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Premium Carousel
            </p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Franchise categories and success highlights
            </h3>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <MotionButton
              type="button"
              aria-label="Previous slide"
              onClick={handlePrev}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="glass-panel startup-button inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
            >
              &larr;
            </MotionButton>
            <MotionButton
              type="button"
              aria-label="Next slide"
              onClick={handleNext}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white shadow-[0_16px_32px_rgba(37,99,235,0.24)]"
            >
              &rarr;
            </MotionButton>
          </div>
        </div>

        <div className="relative min-h-[24rem] overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-[#F8FAFC] p-1 sm:min-h-[21rem]">
          <AnimatePresence custom={direction} mode="wait">
            <MotionDiv
              key={activeSlide.title}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 90 : -90, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -90 : 90, scale: 0.96 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid min-h-[23.5rem] gap-6 rounded-[1.5rem] bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.08),transparent_24%),radial-gradient(circle_at_left,rgba(37,99,235,0.1),transparent_28%),linear-gradient(135deg,#ffffff_0%,#f8fafc_52%,#eef4ff_100%)] p-6 text-slate-900 sm:min-h-[20.5rem] sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
            >
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                    {activeSlide.tag}
                  </span>
                  <h4 className="mt-5 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {activeSlide.title}
                  </h4>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-700 sm:text-base">
                    {activeSlide.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">
                      Highlight
                    </p>
                    <p className="mt-2 text-lg font-semibold">{activeSlide.metric}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">
                      Support Promise
                    </p>
                    <p className="mt-2 text-lg font-semibold">Guided launch support</p>
                  </div>
                </div>
              </div>

              <div className="relative flex h-full min-h-[12rem] items-end justify-end">
                <div className="absolute left-4 top-3 h-24 w-24 rounded-full bg-cyan-300/15 blur-3xl" />
                <div className="absolute right-2 top-10 h-28 w-28 rounded-full bg-violet-300/15 blur-3xl" />
                <div className="relative w-full max-w-sm rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Business for All</span>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                      Slide {safeActiveIndex + 1}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 rounded-full bg-blue-100">
                      <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-[#06B6D4] via-[#2563EB] to-[#93C5FD]" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-blue-50/80 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
                          Model
                        </p>
                        <p className="mt-2 text-sm font-semibold">Trusted brand-led path</p>
                      </div>
                      <div className="rounded-2xl bg-blue-50/80 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
                          Potential
                        </p>
                        <p className="mt-2 text-sm font-semibold">Built for scalable growth</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Go to ${slide.title}`}
                onClick={() => handleDotClick(index)}
                className={`startup-button h-2.5 rounded-full transition-all ${
                  index === safeActiveIndex
                    ? 'w-10 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500'
                    : 'w-2.5 bg-blue-200 hover:bg-blue-300'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 sm:hidden">
            <MotionButton
              type="button"
              aria-label="Previous slide"
              onClick={handlePrev}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="glass-panel startup-button inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
            >
              &larr;
            </MotionButton>
            <MotionButton
              type="button"
              aria-label="Next slide"
              onClick={handleNext}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white shadow-[0_16px_32px_rgba(37,99,235,0.24)]"
            >
              &rarr;
            </MotionButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PremiumCarousel
