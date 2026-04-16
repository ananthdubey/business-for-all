import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
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
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState(initialState)
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsLoading(true)

    try {
      const { confirmPassword, ...payload } = formData
      void confirmPassword
      await register(payload)
      navigate('/dashboard', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <PageHero
        badge="Create Account"
        title="Register to start your franchise journey"
        description="Create your account to access protected application flows, profile tools, and business updates."
      />

      <section className="glass-panel rounded-[2rem] border border-white/70 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-8">
        {error ? (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="fullName" name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} placeholder="Your full name" />
            <FormField id="register-email" name="email" type="email" label="Email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="phone" name="phone" label="Phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
            <FormField id="city" name="city" label="City" value={formData.city} onChange={handleChange} placeholder="Your city" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="state" name="state" label="State" value={formData.state} onChange={handleChange} placeholder="Your state" />
            <div className="hidden sm:block" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="register-password" name="password" type="password" label="Password" value={formData.password} onChange={handleChange} placeholder="Create a strong password" />
            <FormField id="confirm-password" name="confirmPassword" type="password" label="Confirm Password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" />
          </div>

          <p className="text-xs leading-6 text-slate-500">
            Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="startup-button inline-flex items-center justify-center rounded-full border border-blue-800/80 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(30,58,138,0.24)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-700">
            Login here
          </Link>
        </p>
      </section>
    </div>
  )
}

export default Register
