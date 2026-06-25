import LoginForm from '@/components/auth/LoginForm'

function InkWashIllustration() {
  return (
    <svg
      viewBox="0 0 300 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: '280px' }}
    >
      <path
        d="M150 380 C148 320 152 260 145 200 C140 160 130 130 120 100"
        stroke="var(--ink-soft)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M138 220 C120 210 100 215 80 205"
        stroke="var(--ink-soft)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M143 180 C165 165 185 170 205 158"
        stroke="var(--ink-soft)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <ellipse cx="90" cy="200" rx="14" ry="8" fill="var(--forest)" opacity="0.4" transform="rotate(-20 90 200)" />
      <ellipse cx="72" cy="194" rx="12" ry="7" fill="var(--forest)" opacity="0.35" transform="rotate(-35 72 194)" />
      <ellipse cx="108" cy="207" rx="10" ry="6" fill="var(--forest-light)" opacity="0.3" transform="rotate(-10 108 207)" />
      <ellipse cx="195" cy="152" rx="14" ry="8" fill="var(--forest)" opacity="0.4" transform="rotate(15 195 152)" />
      <ellipse cx="210" cy="145" rx="11" ry="6" fill="var(--forest-light)" opacity="0.3" transform="rotate(25 210 145)" />
      <ellipse cx="132" cy="135" rx="13" ry="7" fill="var(--forest)" opacity="0.45" transform="rotate(-30 132 135)" />
      <ellipse cx="118" cy="108" rx="10" ry="6" fill="var(--forest-light)" opacity="0.35" transform="rotate(-40 118 108)" />
      <path
        d="M85 185 C83 182 80 181 78 182 C76 183 76 185 78 185 C80 185 82 184 85 185Z"
        fill="var(--ink-soft)"
        opacity="0.7"
      />
      <circle cx="76" cy="183" r="1.5" fill="var(--ink)" opacity="0.6" />
      <text
        x="150"
        y="340"
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-hand)', fontSize: '16px' }}
        fill="var(--ink-soft)"
        opacity="0.6"
      >
        The garden that watches
      </text>
    </svg>
  )
}

export default function LoginPage() {
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="hidden md:flex">
          <InkWashIllustration />
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
