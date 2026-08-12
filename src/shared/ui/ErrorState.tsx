type ErrorStateProps = {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Algo deu errado',
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="rounded-xl border border-favorite/30 bg-favorite/10 px-4 py-6 text-center"
      role="alert"
    >
      <h2 className="text-base font-semibold text-app-text">{title}</h2>
      <p className="mt-1 text-sm text-app-muted">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg bg-nav-active px-3 py-2 text-sm font-medium text-white hover:bg-nav-active/90"
        >
          Tentar novamente
        </button>
      ) : null}
    </div>
  )
}
