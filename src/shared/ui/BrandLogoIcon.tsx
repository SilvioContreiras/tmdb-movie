export function BrandLogoIcon({ className = 'size-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
      fill="none"
    >
      <rect
        x="3"
        y="8"
        width="26"
        height="18"
        rx="3"
        fill="#8b5cf6"
      />
      <rect x="7" y="12" width="10" height="10" rx="1.5" fill="#1a1d24" />
      <path
        d="M19 12h6v3h-6V12Zm0 5h6v5h-6v-5Z"
        fill="#c4b5fd"
      />
      <path
        d="M8 5.5 12 8H6l2-2.5Zm16 0L20 8h6l-2-2.5Z"
        fill="#a78bfa"
      />
    </svg>
  )
}
