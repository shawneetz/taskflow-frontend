export default function Spinner({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="animate-leaf-sway"
      style={{ color: 'var(--forest)' }}
      aria-hidden="true"
    >
      <path
        d="M12 2C9 2 6 4 5 7C4 10 5 14 8 17C10 19 12 20 12 20C12 20 14 19 16 17C19 14 20 10 19 7C18 4 15 2 12 2Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M12 20L12 10"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  )
}
