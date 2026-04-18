import { useState } from 'react'
import { CheckCircle2, Headphones, PhoneCall } from 'lucide-react'
import { AnimatedReveal } from '../components/ui/AnimatedReveal'
import FormField from '../components/ui/FormField'
import PageHero from '../components/ui/PageHero'
import usePageMeta from '../hooks/usePageMeta'
import useToast from '../hooks/useToast'
import { contactDetails } from '../data/siteContent'
import { apiRequest } from '../utils/api'
import {
  initialContactForm,
  validateContactForm,
} from '../utils/contactValidation'

function Contact() {
  usePageMeta({
    title: 'Contact',
    description: 'Talk to a Business for All advisor about franchise fit, launch support, and next steps.',
  })

  const { showToast } = useToast()
  const [formData, setFormData] = useState(initialContactForm)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateContactForm(formData)
    setErrors(nextErrors)
    setIsSubmitted(false)
    setSubmitMessage('')

    if (Object.keys(nextErrors).length !== 0) {
      return
    }

    setIsSubmitting(true)

    apiRequest('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then((response) => {
        setIsSubmitted(true)
        setSubmitMessage(response.message || 'Your message has been submitted successfully.')
        setFormData(initialContactForm)
        showToast({
          tone: 'success',
          title: 'Message submitted',
          description: 'A team member will get back to you soon.',
        })
      })
      .catch((requestError) => {
        setSubmitMessage(requestError.message)
        showToast({
          tone: 'error',
          title: 'Unable to submit message',
          description: requestError.message,
        })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <PageHero
        badge="Contact"
        title="Talk to a real advisor about your next business move."
        description="The contact flow is now designed to feel high-trust and product-grade while preserving the same backend submission logic."
      />

      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <AnimatedReveal className="surface-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">
            Enquiry Form
          </p>
          <h2 className="mt-3 text-3xl font-bold theme-text-primary">
            Tell us what kind of opportunity you want to build.
          </h2>

          {submitMessage ? (
            <div className={`mt-6 rounded-[1.5rem] px-4 py-4 text-sm ${
              isSubmitted
                ? 'border border-emerald-300/30 bg-emerald-400/10 text-emerald-300'
                : 'border border-rose-300/30 bg-rose-400/10 text-rose-300'
            }`}>
              <div className="flex items-start gap-3">
                {isSubmitted ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : null}
                <span>{submitMessage}</span>
              </div>
            </div>
          ) : null}

          <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                id="name"
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                error={errors.name}
              />
              <FormField
                id="email"
                name="email"
                type="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                error={errors.email}
              />
            </div>

            <FormField
              id="phone"
              name="phone"
              type="tel"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              error={errors.phone}
            />

            <FormField
              as="textarea"
              id="message"
              name="message"
              label="Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you are looking for."
              error={errors.message}
            />

            <button type="submit" disabled={isSubmitting} className="startup-button brand-button rounded-full px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70">
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>
        </AnimatedReveal>

        <div className="space-y-6">
          <AnimatedReveal className="surface-panel rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Headphones className="h-5 w-5 text-cyan-500" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">
                Contact Info
              </p>
            </div>
            <div className="mt-6 space-y-5 text-sm leading-7 theme-text-secondary sm:text-base">
              {contactDetails.map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-semibold theme-text-primary">{item.title}</h3>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </AnimatedReveal>

          <AnimatedReveal className="hero-shell animated-border rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <PhoneCall className="h-5 w-5 text-cyan-500" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">
                Instant Connect
              </p>
            </div>
            <h2 className="mt-3 text-3xl font-bold theme-text-primary">
              Prefer WhatsApp?
            </h2>
            <p className="mt-4 text-sm leading-7 theme-text-secondary sm:text-base">
              Start a direct conversation for faster responses around pricing, support, and opportunity fit.
            </p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="startup-button secondary-button mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
            >
              Chat on WhatsApp
            </a>
          </AnimatedReveal>
        </div>
      </section>
    </div>
  )
}

export default Contact
