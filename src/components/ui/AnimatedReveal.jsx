import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../utils/cn'

function AnimatedReveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  blur = true,
  once = true,
}) {
  const MotionDiv = motion.div
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <MotionDiv
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionDiv>
  )
}

function StaggerGroup({ children, className = '' }) {
  const MotionDiv = motion.div
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <MotionDiv
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
    >
      {children}
    </MotionDiv>
  )
}

function StaggerItem({ children, className = '' }) {
  const MotionDiv = motion.div
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <MotionDiv
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </MotionDiv>
  )
}

export { AnimatedReveal, StaggerGroup, StaggerItem }
