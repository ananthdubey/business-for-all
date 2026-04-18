import { BarChart3, BriefcaseBusiness, CircleDollarSign, Sparkles } from 'lucide-react'
import ButtonLink from '../components/ui/ButtonLink'
import PageHero from '../components/ui/PageHero'
import PageSection from '../components/ui/PageSection'
import SectionHeading from '../components/ui/SectionHeading'
import useAuth from '../hooks/useAuth'
import usePageMeta from '../hooks/usePageMeta'

const quickActions = [
  {
    title: 'Browse categories',
    description: 'Compare verticals, shortlist opportunity types, and move into your best-fit business model.',
    to: '/categories',
    icon: Sparkles,
  },
  {
    title: 'Review opportunities',
    description: 'Open richer opportunity cards, detail pages, and economics before you apply.',
    to: '/franchise',
    icon: BriefcaseBusiness,
  },
  {
    title: 'See plans and support',
    description: 'Understand the support layers behind discovery, launch, and scale before moving ahead.',
    to: '/plans',
    icon: CircleDollarSign,
  },
  {
    title: 'Open dashboard',
    description: 'Track saved opportunities, applications, and profile quality inside your protected workspace.',
    to: '/dashboard',
    icon: BarChart3,
  },
]

function MemberHome() {
  const { user } = useAuth()

  usePageMeta({
    title: 'Home',
    description: 'Internal member home for Business for All with quick access to categories, opportunities, plans, and dashboard workflows.',
  })

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <PageHero
        badge="Member Home"
        title={`Welcome to the platform, ${user?.fullName?.split(' ')[0] || 'Partner'}`}
        description="Your internal home brings together discovery, planning, and application management in one premium product workspace."
      />

      <PageSection tone="muted">
        <SectionHeading
          eyebrow="Quick Access"
          title="Everything you need to move from shortlist to launch"
          description="Use this internal home as the starting point for the rest of the product."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {quickActions.map((item) => {
            const Icon = item.icon

            return (
              <article key={item.title} className="dashboard-card p-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(108,92,231,0.18),rgba(24,199,216,0.18))]">
                  <Icon className="h-5 w-5 theme-text-primary" />
                </div>
                <h3 className="mt-5 text-2xl font-bold theme-text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 theme-text-secondary">{item.description}</p>
                <ButtonLink to={item.to} className="mt-6" withArrow>
                  Open
                </ButtonLink>
              </article>
            )
          })}
        </div>
      </PageSection>
    </div>
  )
}

export default MemberHome
