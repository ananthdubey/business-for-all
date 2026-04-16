import { AnimatedReveal, StaggerGroup, StaggerItem } from '../components/ui/AnimatedReveal'
import FeatureCard from '../components/ui/FeatureCard'
import PageHero from '../components/ui/PageHero'
import { aboutSections } from '../data/siteContent'

function About() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHero
        badge="About Us"
        title="Built to help more people step into business ownership with clarity."
        description="We combine structured business systems with a supportive, professional approach so new founders can grow with direction and confidence."
      />

      <AnimatedReveal>
        <StaggerGroup className="grid gap-4 md:grid-cols-3">
          {aboutSections.map((section, index) => (
            <StaggerItem key={section.title} className="text-center">
              <FeatureCard title={section.title} description={section.description} icon={index + 1} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </AnimatedReveal>
    </div>
  )
}

export default About
