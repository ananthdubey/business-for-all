import { motion } from 'framer-motion'
import { MessageSquareMore } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import ButtonLink from './ui/ButtonLink'

function MobileFloatingCTA() {
  const MotionDiv = motion.div
  const { isAuthenticated } = useAuth()

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="fixed inset-x-4 bottom-4 z-40 md:hidden"
    >
      <ButtonLink
        to={isAuthenticated ? '/contact' : '/register'}
        className="w-full justify-between rounded-[1.4rem] px-5 py-4 text-sm font-semibold"
      >
        <span>{isAuthenticated ? 'Talk to support' : 'Become a partner'}</span>
        <MessageSquareMore className="h-4 w-4" />
      </ButtonLink>
    </MotionDiv>
  )
}

export default MobileFloatingCTA
