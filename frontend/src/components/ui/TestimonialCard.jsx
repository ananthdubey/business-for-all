import { motion } from 'framer-motion'

function TestimonialCard({ quote, name, role }) {
  const MotionBlockquote = motion.blockquote

  return (
    <MotionBlockquote
      className="startup-card rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
      whileHover={{ y: -8 }}
    >
      <p className="text-[1.02rem] leading-8 text-slate-700">"{quote}"</p>
      <footer className="mt-6">
        <p className="font-semibold tracking-[-0.01em] text-slate-900">{name}</p>
        <p className="text-sm text-slate-600">{role}</p>
      </footer>
    </MotionBlockquote>
  )
}

export default TestimonialCard
