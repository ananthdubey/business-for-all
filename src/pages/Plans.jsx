import { AnimatedReveal, StaggerGroup, StaggerItem } from '../components/ui/AnimatedReveal'
import PageHero from '../components/ui/PageHero'
import PricingCard from '../components/ui/PricingCard'
import { pricingPlans } from '../data/siteContent'

function Plans() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHero
        badge="Pricing Plans"
        title="Choose the plan that fits your business stage."
        description="Every plan is designed to help you launch with more clarity, stronger systems, and the right level of support for your next step."
      />

      <AnimatedReveal>
        <StaggerGroup className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <StaggerItem key={plan.name}>
              <PricingCard {...plan} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </AnimatedReveal>
    </div>
  )
}

export default Plans
