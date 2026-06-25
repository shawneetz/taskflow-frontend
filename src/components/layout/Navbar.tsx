import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useAuthStore } from '@/store/auth.store'
import { useTaskStore } from '@/store/task.store'
import DarkModeToggle from '@/components/ui/DarkModeToggle'

function Avatar({ fullName }: { fullName: string }) {
  const initials = fullName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      style={{
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        background: 'var(--gold)',
        color: 'var(--forest-deep)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: 'var(--text-xs)',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}

export default function Navbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const fetchTasks = useTaskStore((s) => s.fetchTasks)
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearch = (val: string) => {
    setSearch(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchTasks({ search: val || undefined })
    }, 300)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav
      style={{
        height: '56px',
        background: 'var(--paper)',
        backgroundImage: 'url("/grain.svg")',
        backgroundRepeat: 'repeat',
        backgroundBlendMode: 'multiply',
        borderBottom: '1px solid var(--border-default)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--space-4)',
        gap: 'var(--space-4)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--forest)' }}>
          <path
            d="M12 2C9 2 6 4 5 7C4 10 5 14 8 17C10 19 12 20 12 20C12 20 14 19 16 17C19 14 20 10 19 7C18 4 15 2 12 2Z"
            fill="currentColor"
            opacity="0.9"
          />
          <path d="M12 20L12 10" stroke="white" strokeWidth="1" strokeLinecap="round" />
        </svg>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 460,
            color: 'var(--forest)',
          }}
        >
          TaskFlow
        </span>
      </div>

      <div style={{ flex: 1, maxWidth: '320px' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Find a task…"
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            borderBottom: '1.5px solid var(--border-default)',
            borderRadius: 0,
            padding: '0.35rem 0.25rem',
            fontFamily: 'var(--font-hand)',
            fontStyle: 'italic',
            fontSize: 'var(--text-base)',
            color: 'var(--ink)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          flexShrink: 0,
        }}
      >
        <DarkModeToggle />

        <div style={{ position: 'relative' }}>
          <div onClick={() => setMenuOpen((o) => !o)}>
            <Avatar fullName={user?.full_name ?? 'U'} />
          </div>

          {menuOpen && (
            <>
              <div
                style={{ position: 'fixed', inset: 0, zIndex: 49 }}
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
              />
              <div
                style={{
                  position: 'absolute',
                  top: '42px',
                  right: 0,
                  zIndex: 50,
                  background: 'var(--surface-modal)',
                  backgroundImage: 'url("/grain.svg")',
                  backgroundBlendMode: 'multiply',
                  border: '1.5px solid var(--border-default)',
                  borderRadius: '12px 8px 14px 10px',
                  boxShadow: 'var(--shadow-modal)',
                  padding: '0.5rem',
                  minWidth: '160px',
                }}
              >
                <div
                  style={{
                    padding: '0.35rem 0.6rem',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--ink-ghost)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {user?.email}
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: '0.35rem 0' }} />
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.4rem 0.6rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--ink-soft)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '6px',
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
