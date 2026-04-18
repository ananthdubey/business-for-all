import { AnimatedReveal, StaggerGroup, StaggerItem } from '../components/ui/AnimatedReveal'
import PageHero from '../components/ui/PageHero'
import PageSection from '../components/ui/PageSection'
import PricingCard from '../components/ui/PricingCard'
import SectionHeading from '../components/ui/SectionHeading'
import usePageMeta from '../hooks/usePageMeta'
import { pricingPlans } from '../data/siteContent'

function Plans() {
  usePageMeta({
    title: 'Plans',
    description: 'Review Business for All support packages for discovery, launch, and growth-stage franchise buyers.',
  })

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHero
        badge="Plans"
        title="Choose the support layer that matches your growth stage."
        description="Pricing now looks more premium and credible while keeping the same overall plan structure and routing."
      />

      <AnimatedReveal>
        <PageSection tone="muted">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple plans with clearer value framing"
            description="These packages help visitors understand exactly how much support they can expect before moving into consultation."
          />
          <StaggerGroup className="mt-8 grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <StaggerItem key={plan.name}>
                <PricingCard {...plan} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </PageSection>
      </AnimatedReveal>
    </div>
  )
}

export default Plans
