import { motion } from 'framer-motion'
import ButtonLink from './ButtonLink'
import { cn } from '../../utils/cn'

function PricingCard({ name, price, description, features, cta, popular }) {
  const MotionArticle = motion.article

  return (
    <MotionArticle
      className={cn(
        'startup-card relative flex h-full flex-col rounded-[2rem] border bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.06)]',
        popular
          ? 'border-blue-200 bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] shadow-[0_22px_50px_rgba(59,130,246,0.14)]'
          : 'border-slate-200/80'
      )}
      whileHover={{ y: -10 }}
    >
      {popular && (
        <span className="absolute right-6 top-6 inline-flex rounded-full bg-gradient-to-r from-blue-900 to-cyan-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
          Most Popular
        </span>
      )}

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
          {name}
        </p>
        <p className="mt-4 text-4xl font-extrabold leading-none tracking-[-0.03em] text-slate-900">{price}</p>
        <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-[1rem]">{description}</p>
      </div>

      <ul className="mt-8 space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm leading-7 text-slate-700">
            <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
              &#10003;
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <ButtonLink
          to="/contact"
          variant={popular ? 'primary' : 'secondary'}
          className="w-full"
        >
          {cta}
        </ButtonLink>
      </div>
    </MotionArticle>
  )
}

export default PricingCard
