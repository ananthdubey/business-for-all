import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function ScrollProgress() {
  const MotionDiv = motion.div
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0
      setProgress(Math.min(nextProgress, 100))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <MotionDiv
      className="progress-line fixed left-0 top-0 z-[70] h-1 origin-left"
      style={{ width: `${progress}%` }}
    />
  )
}

export default ScrollProgress
