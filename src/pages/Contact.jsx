import { useState } from 'react'
import { AnimatedReveal } from '../components/ui/AnimatedReveal'
import FormField from '../components/ui/FormField'
import PageHero from '../components/ui/PageHero'
import { contactDetails } from '../data/siteContent'
import { apiRequest } from '../utils/api'
import {
  initialContactForm,
  validateContactForm,
} from '../utils/contactValidation'

function Contact() {
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
      })
      .catch((requestError) => {
        setSubmitMessage(requestError.message)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHero
        badge="Contact Us"
        title="Let's talk about your next business move."
        description="Reach out for plan details, franchise guidance, or help choosing the right path to get started."
      />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <AnimatedReveal className="glass-panel rounded-[2rem] border border-white/70 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              Enquiry Form
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
              Send us a message
            </h2>
          </div>

          {submitMessage ? (
            <div className={`mt-6 rounded-2xl px-4 py-3 text-sm ${
              isSubmitted
                ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border border-rose-200 bg-rose-50 text-rose-700'
            }`}>
              {submitMessage}
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="startup-button inline-flex items-center justify-center rounded-full border border-blue-800/80 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(30,58,138,0.24)]"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>
        </AnimatedReveal>

        <div className="space-y-6">
          <AnimatedReveal className="glass-panel rounded-[2rem] border border-white/70 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              Contact Info
            </p>
            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
              {contactDetails.map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </AnimatedReveal>

          <AnimatedReveal className="animated-border rounded-[2rem] border border-blue-100 bg-[linear-gradient(180deg,#eef4ff_0%,#ffffff_100%)] p-6 text-slate-900 shadow-[0_22px_54px_rgba(37,99,235,0.1)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Quick Connect
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
              Prefer WhatsApp?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
              Start a conversation directly for faster responses about plans,
              pricing, and franchise opportunities.
            </p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="startup-button mt-6 inline-flex items-center justify-center rounded-full border border-white/60 bg-white px-6 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50"
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
