type MovieGridSkeletonProps = {
  count?: number
  label?: string
}

function MovieCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-xl bg-app-surface ring-1 ring-app-border/60"
      aria-hidden
    >
      <div className="aspect-2/3 animate-pulse bg-app-surface-elevated" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-app-surface-elevated" />
        <div className="h-5 w-10 animate-pulse rounded-md bg-app-surface-elevated" />
      </div>
    </div>
  )
}

export function MovieGridSkeleton({
  count = 12,
  label = 'Carregando filmes...',
}: MovieGridSkeletonProps) {
  return (
    <div role="status" aria-live="polite" aria-busy="true" aria-label={label}>
      <span className="sr-only">{label}</span>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: count }, (_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
