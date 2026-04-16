import { motion } from 'framer-motion'
import SocialIcon from './ui/SocialIcon'
import { socialLinks } from '../data/socialLinks'

function SocialFloat() {
  const MotionLink = motion.a

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-3 md:bottom-28 md:right-8">
      {socialLinks.map((item, index) => (
        <MotionLink
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          className={`glass-panel startup-button group inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/65 text-slate-700 shadow-[0_18px_40px_rgba(15,23,42,0.12)] ${item.bgClass}`}
          whileHover={{ y: -6, scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            y: {
              duration: 2.6 + index * 0.35,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            default: { duration: 0.2 },
          }}
        >
          <SocialIcon item={item} />
        </MotionLink>
      ))}
    </div>
  )
}

export default SocialFloat
