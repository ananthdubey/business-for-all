import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, UserPlus } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import usePageMeta from '../hooks/usePageMeta'
import useToast from '../hooks/useToast'
import FormField from '../components/ui/FormField'
import PageHero from '../components/ui/PageHero'

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  city: '',
  state: '',
}

function Register() {
  usePageMeta({
    title: 'Register',
    description: 'Create a Business for All account to save opportunities, apply, and manage your franchise journey.',
  })

  const navigate = useNavigate()
  const { register } = useAuth()
  const { showToast } = useToast()
  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    setIsLoading(true)

    try {
      const { confirmPassword, ...payload } = formData
      void confirmPassword
      await register(payload)
      setIsRedirecting(true)
      showToast({
        tone: 'success',
        title: 'Account created',
        description: 'Your account is active. Redirecting you to your dashboard now.',
      })
      navigate('/dashboard', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
      showToast({
        tone: 'error',
        title: 'Registration failed',
        description: requestError.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHero
        badge="Create Account"
        title="Become a partner and unlock the full business journey"
        description="Registration now feels like a serious product onboarding step while preserving the existing protected account logic."
      />

      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="surface-panel rounded-[2rem] p-6 sm:p-8">
          {error ? (
            <div className="mb-6 rounded-[1.5rem] border border-rose-300/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="fullName" name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} placeholder="Your full name" required />
              <FormField id="register-email" name="email" type="email" label="Email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="phone" name="phone" label="Phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
              <FormField id="city" name="city" label="City" value={formData.city} onChange={handleChange} placeholder="Your city" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="state" name="state" label="State" value={formData.state} onChange={handleChange} placeholder="Your state" />
              <div className="hidden sm:block" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="register-password" name="password" type="password" label="Password" value={formData.password} onChange={handleChange} placeholder="Create a strong password" hint="Use 8+ characters with uppercase, lowercase, number, and special character." required />
              <FormField id="confirm-password" name="confirmPassword" type="password" label="Confirm Password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
            </div>

            <button type="submit" disabled={isLoading || isRedirecting} className="startup-button brand-button rounded-full px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70">
              {isLoading ? 'Creating Account...' : isRedirecting ? 'Redirecting...' : 'Register'}
            </button>
          </form>

          <p className="mt-6 text-sm theme-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-cyan-500">
              Login here
            </Link>
          </p>
        </div>

        <div className="surface-panel rounded-[2rem] p-6 sm:p-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(108,92,231,0.18),rgba(24,199,216,0.18))]">
            <UserPlus className="h-5 w-5 theme-text-primary" />
          </div>
          <h2 className="mt-5 text-3xl font-bold theme-text-primary">What you unlock</h2>
          <div className="mt-6 space-y-4">
            {[
              'Protected application submission and profile management',
              'A smoother path into advisor conversations and business matching',
              'A more serious, trust-building onboarding flow for premium leads',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-7 theme-text-secondary">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register
