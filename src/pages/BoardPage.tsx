import Navbar from '@/components/layout/Navbar'

export default function BoardPage() {
  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: 'calc(100vh - 56px)',
          background: 'var(--paper)',
          color: 'var(--ink)',
          padding: '2rem',
        }}
      >
        <p style={{ fontFamily: 'var(--font-hand)', fontSize: 'var(--text-lg)' }}>
          Board coming on Day 4…
        </p>
      </div>
    </>
  )
}
