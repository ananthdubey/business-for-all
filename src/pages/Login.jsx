import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import FormField from '../components/ui/FormField'
import PageHero from '../components/ui/PageHero'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
      navigate(redirectTo, { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHero
        badge="Member Login"
        title="Access your franchise account"
        description="Sign in to manage your profile, applications, and protected business actions."
      />

      <section className="glass-panel rounded-[2rem] border border-white/70 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-8">
        {error ? (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
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
          />
          <FormField
            id="login-password"
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="startup-button inline-flex items-center justify-center rounded-full border border-blue-800/80 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(30,58,138,0.24)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Signing In...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          Need an account?{' '}
          <Link to="/register" className="font-semibold text-blue-700">
            Register here
          </Link>
        </p>
      </section>
    </div>
  )
}

export default Login
