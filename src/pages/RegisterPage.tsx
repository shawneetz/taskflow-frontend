import RegisterForm from '@/components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--paper)',
        backgroundImage: 'url("/grain.svg")',
        backgroundRepeat: 'repeat',
        backgroundBlendMode: 'multiply',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4rem',
          alignItems: 'center',
          width: '100%',
          maxWidth: '860px',
        }}
      >
        <div style={{ flex: 1 }} className="hidden md:flex justify-center">
          <svg viewBox="0 0 260 340" style={{ width: '220px', opacity: 0.75 }}>
            <path
              d="M130 320 C128 270 132 210 125 160 C120 130 115 110 110 80"
              stroke="var(--ink-soft)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.55"
            />
            <ellipse cx="95" cy="165" rx="16" ry="9" fill="var(--forest)" opacity="0.4" transform="rotate(-25 95 165)" />
            <ellipse cx="75" cy="158" rx="12" ry="7" fill="var(--forest-light)" opacity="0.3" transform="rotate(-40 75 158)" />
            <ellipse cx="150" cy="135" rx="14" ry="8" fill="var(--forest)" opacity="0.45" transform="rotate(18 150 135)" />
            <ellipse cx="108" cy="88" rx="10" ry="6" fill="var(--forest-light)" opacity="0.38" transform="rotate(-35 108 88)" />
            <text
              x="130"
              y="300"
              textAnchor="middle"
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '14px',
              }}
              fill="var(--ink-ghost)"
              opacity="0.7"
            >
              Begin here.
            </text>
          </svg>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
