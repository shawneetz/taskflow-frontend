import { useState, type CSSProperties, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

function passwordStrength(pw: string): 'weak' | 'medium' | 'strong' {
  if (pw.length < 8) return 'weak'
  if (pw.length < 12) return 'medium'
  return 'strong'
}

const STRENGTH_COLOR = { weak: 'var(--error)', medium: 'var(--gold)', strong: 'var(--forest)' }

export default function RegisterForm() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ full_name: '', email: '', password: '' })

  const strength = passwordStrength(form.password)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register(form)
      navigate('/board')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: unknown } } })?.response?.data?.detail
      setError(typeof msg === 'string' ? msg : 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: CSSProperties = {
    width: '100%',
    background: 'var(--paper-shadow)',
    border: '1.5px solid var(--border-default)',
    borderRadius: '9px 8px 10px 7px',
    padding: '0.6rem 0.85rem',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-base)',
    color: 'var(--ink)',
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div
      style={{
        background: 'var(--surface-modal)',
        backgroundImage: 'url("/grain.svg")',
        backgroundBlendMode: 'multiply',
        border: '1.5px solid var(--border-default)',
        borderRadius: '18px 14px 20px 12px',
        boxShadow: 'var(--shadow-modal)',
        padding: '2rem',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 460,
            color: 'var(--ink)',
            margin: 0,
          }}
        >
          Create your workspace
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-hand)',
            fontStyle: 'italic',
            fontSize: 'var(--text-base)',
            color: 'var(--ink-soft)',
            margin: '4px 0 0',
          }}
        >
          A place for everything you&apos;re growing.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { key: 'full_name', label: 'Full name', type: 'text', placeholder: 'Your name' },
          { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
        ].map(({ key, label, type, placeholder }) => (
          <div key={key}>
            <label
              style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--ink-soft)',
                marginBottom: '4px',
              }}
            >
              {label}
            </label>
            <input
              type={type}
              value={form[key as keyof typeof form]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              required
              placeholder={placeholder}
              style={inputStyle}
            />
          </div>
        ))}

        <div>
          <label
            style={{
              display: 'block',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--ink-soft)',
              marginBottom: '4px',
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            required
            placeholder="min. 8 characters"
            style={inputStyle}
          />
          {form.password.length > 0 && (
            <div
              style={{
                height: '2px',
                marginTop: '4px',
                borderRadius: '1px',
                background: STRENGTH_COLOR[strength],
                width: strength === 'weak' ? '33%' : strength === 'medium' ? '66%' : '100%',
                transition: 'width 300ms ease, background 300ms ease',
              }}
            />
          )}
        </div>

        {error && (
          <div
            style={{
              background: 'var(--paper-shadow)',
              border: '1px solid var(--error-light)',
              borderRadius: '6px 8px 5px 7px',
              padding: '0.5rem 0.75rem',
              fontFamily: 'var(--font-hand)',
              fontSize: 'var(--text-sm)',
              color: 'var(--error)',
              transform: 'rotate(-0.5deg)',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 'var(--text-base)',
            color: 'var(--paper)',
            background: 'var(--forest)',
            border: 'none',
            borderRadius: '10px 8px 11px 9px',
            padding: '0.65rem 1.4rem',
            boxShadow: 'var(--shadow-button)',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            width: '100%',
            transition: 'transform 120ms ease-out',
          }}
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p
        style={{
          marginTop: '1.25rem',
          fontSize: 'var(--text-sm)',
          color: 'var(--ink-ghost)',
          textAlign: 'center',
        }}
      >
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--forest)', fontWeight: 600, textDecoration: 'none' }}>
          Sign in →
        </Link>
      </p>
    </div>
  )
}
