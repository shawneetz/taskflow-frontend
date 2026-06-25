import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form)
      navigate('/board')
    } catch {
      setError('Incorrect email or password.')
    } finally {
      setLoading(false)
    }
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
          TaskFlow
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
          Your tasks, your flow.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
            placeholder="you@example.com"
            style={{
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
            }}
          />
        </div>

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
            placeholder="•••••••••"
            style={{
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
            }}
          />
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            transition: 'transform 120ms ease-out, background 120ms ease-out',
          }}
        >
          {loading ? 'Signing in…' : 'Sign in'}
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
        No account yet?{' '}
        <Link to="/register" style={{ color: 'var(--forest)', fontWeight: 600, textDecoration: 'none' }}>
          Register here →
        </Link>
      </p>
    </div>
  )
}
