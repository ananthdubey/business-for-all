import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedReveal, StaggerGroup, StaggerItem } from '../components/ui/AnimatedReveal'
import FeatureCard from '../components/ui/FeatureCard'
import FormField from '../components/ui/FormField'
import PageHero from '../components/ui/PageHero'
import PageSection from '../components/ui/PageSection'
import SectionHeading from '../components/ui/SectionHeading'
import TimelineCard from '../components/ui/TimelineCard'
import useAuth from '../hooks/useAuth'
import { franchiseBenefits, franchiseSteps } from '../data/siteContent'
import { apiRequest } from '../utils/api'

const initialApplicationForm = {
  categoryId: '',
  businessName: '',
  investmentBudget: '',
  location: '',
  experience: '',
}

function Franchise() {
  const { isAuthenticated } = useAuth()
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState(initialApplicationForm)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const hasLoadedCategories = useRef(false)

  useEffect(() => {
    if (hasLoadedCategories.current) {
      return undefined
    }

    hasLoadedCategories.current = true

    const loadCategories = async () => {
      try {
        const response = await apiRequest('/api/categories?active=true&limit=50')
        setCategories(response.data || [])
      } catch {
        setCategories([])
      }
    }

    loadCategories()
    return undefined
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitMessage('')
    setSubmitError('')

    if (!isAuthenticated) {
      setSubmitError('Please log in first to submit your franchise application.')
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        investmentBudget: Number(formData.investmentBudget),
      }

      const response = await apiRequest('/api/applications', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      setSubmitMessage(response.message || 'Application submitted successfully.')
      setFormData(initialApplicationForm)
    } catch (requestError) {
      setSubmitError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHero
        badge="Franchise Journey"
        title="A guided path from joining to scaling your business."
        description="Our process is built to keep things practical, supportive, and easy to follow whether you are brand new or ready to grow faster."
      />

      <AnimatedReveal>
        <PageSection tone="white">
          <SectionHeading
            eyebrow="Steps"
            title="Join, learn, launch, and grow"
            description="An animated timeline that keeps the franchise journey clear, simple, and premium."
          />

          <StaggerGroup className="mt-8 space-y-4">
            {franchiseSteps.map((step, index) => (
              <StaggerItem key={step.title}>
                <TimelineCard
                  index={index + 1}
                  title={step.title}
                  description={step.description}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="tint">
          <SectionHeading
            eyebrow="Benefits"
            title="Why this model works for new and growing founders"
            description="Premium support, practical systems, and a trustworthy model built for confident execution."
            dark
          />

          <StaggerGroup className="mt-8 grid gap-4 md:grid-cols-3">
            {franchiseBenefits.map((benefit, index) => (
              <StaggerItem key={benefit.title}>
                <FeatureCard
                  title={benefit.title}
                  description={benefit.description}
                  dark
                  icon={index + 1}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </PageSection>
      </AnimatedReveal>

      <AnimatedReveal>
        <PageSection tone="gray">
          <SectionHeading
            eyebrow="Apply Online"
            title="Submit your franchise application"
            description="This form connects directly to the live backend so your franchise application can be saved online and reviewed from your dashboard."
          />

          {!isAuthenticated ? (
            <div className="mt-8 rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
              Login is required before submitting an application.
              {' '}
              <Link to="/login" className="font-semibold text-blue-700">
                Login here
              </Link>
              {' '}
              or
              {' '}
              <Link to="/register" className="font-semibold text-blue-700">
                create an account
              </Link>
              .
            </div>
          ) : null}

          {submitMessage ? (
            <div className="mt-8 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
              {submitMessage}
            </div>
          ) : null}

          {submitError ? (
            <div className="mt-8 rounded-[1.5rem] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
              {submitError}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="categoryId">
                Franchise Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="glass-panel w-full rounded-2xl border border-blue-100 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            <FormField
              id="businessName"
              name="businessName"
              label="Business Name"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Your planned business name"
            />

            <FormField
              id="investmentBudget"
              name="investmentBudget"
              type="number"
              label="Investment Budget"
              value={formData.investmentBudget}
              onChange={handleChange}
              placeholder="500000"
            />

            <FormField
              id="location"
              name="location"
              label="Preferred Location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City / Area"
            />

            <div className="hidden lg:block" />

            <div className="lg:col-span-2">
              <FormField
                as="textarea"
                id="experience"
                name="experience"
                label="Experience"
                rows="5"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Tell us about your business or operational experience."
              />
            </div>

            <div className="lg:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="startup-button inline-flex items-center justify-center rounded-full border border-blue-800/80 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(30,58,138,0.24)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </PageSection>
      </AnimatedReveal>
    </div>
  )
}

export default Franchise
