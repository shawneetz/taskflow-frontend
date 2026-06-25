import { useDarkMode } from '@/hooks/useDarkMode'

export default function DarkModeToggle() {
  const { dark, toggle } = useDarkMode()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: '52px',
        height: '28px',
        background: 'var(--paper-shadow)',
        border: '1.5px solid var(--border-default)',
        borderRadius: '6px',
        position: 'relative',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          left: '4px',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: dark ? 0.5 : 0.3,
        }}
      >
        <circle cx="12" cy="12" r="4" stroke="var(--gold)" strokeWidth="2" />
        <path
          d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          right: '4px',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: dark ? 0.3 : 0.5,
        }}
      >
        <path
          d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          stroke="var(--sky)"
          strokeWidth="2"
        />
      </svg>

      <div
        style={{
          width: '22px',
          height: '22px',
          position: 'absolute',
          top: '2px',
          left: dark ? '26px' : '2px',
          borderRadius: '4px 3px 5px 4px',
          background: dark ? 'var(--sky)' : 'var(--gold)',
          transition: 'left 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      />
    </button>
  )
}
