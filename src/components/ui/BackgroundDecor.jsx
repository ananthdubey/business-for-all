import { motion, useReducedMotion } from 'framer-motion'

const particles = [
  { position: 'left-[12%] top-[18%]', size: 'h-2.5 w-2.5', color: 'bg-blue-300/30' },
  { position: 'left-[28%] top-[42%]', size: 'h-2 w-2', color: 'bg-cyan-300/30' },
  { position: 'left-[65%] top-[24%]', size: 'h-2.5 w-2.5', color: 'bg-blue-200/35' },
  { position: 'left-[82%] top-[36%]', size: 'h-2 w-2', color: 'bg-sky-300/30' },
  { position: 'left-[18%] top-[76%]', size: 'h-2.5 w-2.5', color: 'bg-cyan-200/35' },
  { position: 'left-[52%] top-[68%]', size: 'h-2 w-2', color: 'bg-blue-300/25' },
  { position: 'left-[74%] top-[82%]', size: 'h-2.5 w-2.5', color: 'bg-sky-200/35' },
  { position: 'left-[90%] top-[70%]', size: 'h-2 w-2', color: 'bg-cyan-300/25' },
]

const circles = [
  { position: 'left-[6%] top-[24%]', size: 'h-32 w-32', color: 'border-blue-100/80 bg-white/18' },
  { position: 'right-[10%] top-[18%]', size: 'h-24 w-24', color: 'border-cyan-100/80 bg-cyan-50/20' },
  { position: 'left-[18%] bottom-[18%]', size: 'h-20 w-20', color: 'border-sky-100/80 bg-sky-50/20' },
  { position: 'right-[20%] bottom-[10%]', size: 'h-28 w-28', color: 'border-blue-100/80 bg-white/16' },
]

function BackgroundDecor() {
  const MotionDiv = motion.div
  const MotionSpan = motion.span
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_45%,#eef2ff_100%)]" />
      <MotionDiv
        className="pulse-glow absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-blue-300/24 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, 20, 0], y: [0, 18, 0], scale: [0.98, 1.06, 0.98] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <MotionDiv
        className="float-slow absolute right-[-6rem] top-[10rem] h-80 w-80 rounded-full bg-sky-200/22 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, -26, 0], y: [0, -16, 0], scale: [1, 1.04, 1] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <MotionDiv
        className="floating-orb absolute bottom-[8rem] left-[10%] h-72 w-72 rounded-full bg-cyan-300/18 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, 14, 0], y: [0, -20, 0], scale: [0.98, 1.05, 0.98] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <MotionDiv
        className="absolute bottom-[12%] right-[14%] h-56 w-56 rounded-full bg-white/30 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.28, 0.5, 0.28], scale: [0.96, 1.08, 0.96] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 opacity-45">
        <div className="premium-grid grid-drift absolute inset-[-10%]" />
      </div>
      {circles.map((circle, index) => (
        <MotionDiv
          key={circle.position}
          className={`absolute rounded-full border backdrop-blur-sm ${circle.position} ${circle.size} ${circle.color}`}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -14 - (index % 2) * 5, 0],
                  x: [0, index % 2 === 0 ? 10 : -10, 0],
                  opacity: [0.3, 0.48, 0.3],
                }
          }
          transition={{
            duration: 12 + index * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.5,
          }}
        />
      ))}

      {particles.map((particle, index) => (
        <MotionSpan
          key={particle.position}
          className={`absolute rounded-full ${particle.size} ${particle.color} ${particle.position}`}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, index % 2 === 0 ? 10 : -8, 0],
                  y: [0, -16, 0],
                  opacity: [0.16, 0.52, 0.16],
                  scale: [0.9, 1.15, 0.9],
                }
          }
          transition={{
            duration: 7 + index * 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.35,
          }}
        />
      ))}
    </div>
  )
}

export default BackgroundDecor
