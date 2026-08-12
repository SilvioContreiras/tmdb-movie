type SpinnerProps = {
  label?: string
}

export function Spinner({ label = 'Carregando...' }: SpinnerProps) {
  return (
    <div
      className="flex items-center justify-center gap-3 py-10 text-app-muted"
      role="status"
      aria-live="polite"
    >
      <span
        className="size-5 animate-spin rounded-full border-2 border-app-border border-t-brand"
        aria-hidden
      />
      <span className="text-sm">{label}</span>
    </div>
  )
}
