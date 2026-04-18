import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

function BackToTopButton() {
  const MotionButton = motion.button
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible ? (
        <MotionButton
          type="button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="startup-button fixed bottom-24 left-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 brand-button md:bottom-8 md:left-8"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </MotionButton>
      ) : null}
    </AnimatePresence>
  )
}

export default BackToTopButton
