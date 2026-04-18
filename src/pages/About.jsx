import { AnimatedReveal, StaggerGroup, StaggerItem } from '../components/ui/AnimatedReveal'
import FeatureCard from '../components/ui/FeatureCard'
import PageHero from '../components/ui/PageHero'
import PageSection from '../components/ui/PageSection'
import SectionHeading from '../components/ui/SectionHeading'
import usePageMeta from '../hooks/usePageMeta'
import { aboutSections } from '../data/siteContent'

function About() {
  usePageMeta({
    title: 'About',
    description: 'Learn how Business for All helps founders discover, validate, and launch modern franchise businesses with more confidence.',
  })

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHero
        badge="About Us"
        title="Built to make business ownership look and feel more achievable."
        description="Business for All is positioned like a serious modern company because trust, clarity, and execution matter at the top of the funnel."
      />

      <AnimatedReveal>
        <PageSection tone="default">
          <SectionHeading
            eyebrow="Brand Story"
            title="A startup-style platform for scalable business opportunities"
            description="The redesign presents the company as a product-led platform rather than a basic brochure website, while preserving the same working app structure underneath."
          />
          <StaggerGroup className="mt-8 grid gap-4 md:grid-cols-3">
            {aboutSections.map((section, index) => (
              <StaggerItem key={section.title}>
                <FeatureCard title={section.title} description={section.description} icon={index + 1} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </PageSection>
      </AnimatedReveal>
    </div>
  )
}

export default About
