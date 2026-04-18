import { cn } from '../../utils/cn'

function SocialIcon({ item, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('h-5 w-5 transition', item.hoverClass, className)}
      aria-hidden="true"
    >
      <path d={item.path} />
    </svg>
  )
}

export default SocialIcon
