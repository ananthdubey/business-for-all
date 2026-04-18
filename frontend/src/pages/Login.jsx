import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LockKeyhole, ShieldCheck } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import usePageMeta from '../hooks/usePageMeta'
import useToast from '../hooks/useToast'
import FormField from '../components/ui/FormField'
import PageHero from '../components/ui/PageHero'

function Login() {
  usePageMeta({
    title: 'Login',
    description: 'Secure login for partners, franchise buyers, and registered users of Business for All.',
  })

  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
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
    setIsLoading(true)

    try {
      await login(formData)
      const redirectTo = location.state?.from?.pathname || '/dashboard'
      setIsRedirecting(true)
      showToast({
        tone: 'success',
        title: 'Welcome back',
        description: 'Your secure workspace is ready.',
      })
      navigate(redirectTo, { replace: true })
    } catch (requestError) {
      setError(requestError.message)
      showToast({
        tone: 'error',
        title: 'Login failed',
        description: requestError.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHero
        badge="Member Login"
        title="Secure access to your franchise workspace"
        description="The login experience is redesigned for polish and trust while keeping the same protected authentication flow."
      />

      <section className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <div className="surface-panel rounded-[2rem] p-6 sm:p-8">
          {error ? (
            <div className="mb-6 rounded-[1.5rem] border border-rose-300/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              id="login-email"
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
            <FormField
              id="login-password"
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <button type="submit" disabled={isLoading || isRedirecting} className="startup-button brand-button rounded-full px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70">
              {isLoading ? 'Signing In...' : isRedirecting ? 'Redirecting...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-sm theme-text-secondary">
            Need an account?{' '}
            <Link to="/register" className="font-semibold text-cyan-500">
              Register here
            </Link>
          </p>
        </div>

        <div className="surface-panel rounded-[2rem] p-6 sm:p-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(108,92,231,0.18),rgba(24,199,216,0.18))]">
            <ShieldCheck className="h-5 w-5 theme-text-primary" />
          </div>
          <h2 className="mt-5 text-3xl font-bold theme-text-primary">Protected operator tools</h2>
          <div className="mt-6 space-y-4">
            {[
              'Track applications and profile details in one dashboard',
              'Access protected flows tied to the existing backend',
              'Move from discovery into action without leaving the product',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-7 theme-text-secondary">
                <LockKeyhole className="mt-1 h-4 w-4 shrink-0 text-cyan-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
