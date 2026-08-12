import { Link } from 'react-router-dom'
import { movieDetailsPath } from '@/app/router/paths'
import type { MovieSummary } from '@/features/movies/domain'
import { buildTmdbImageUrl } from '@/shared/lib'
import { HighlightedText } from './HighlightedText'

type MovieCardAction = 'toggle-favorite' | 'remove-favorite'

type MovieCardProps = {
  movie: MovieSummary
  isFavorite: boolean
  onFavoriteAction: () => void
  highlightQuery?: string
  action?: MovieCardAction
}

function FavoriteIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      aria-hidden
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6h18M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6m2 0v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6h10ZM10 11v6M14 11v6"
      />
    </svg>
  )
}

export function MovieCard({
  movie,
  isFavorite,
  onFavoriteAction,
  highlightQuery,
  action = 'toggle-favorite',
}: MovieCardProps) {
  const posterUrl = buildTmdbImageUrl(movie.posterPath, 'w300')
  const isRemoveAction = action === 'remove-favorite'

  return (
    <article className="group relative overflow-hidden rounded-xl bg-app-surface shadow-sm ring-1 ring-app-border/60 transition hover:ring-app-border">
      <Link
        to={movieDetailsPath(movie.id)}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-nav-active"
      >
        <div className="aspect-2/3 bg-app-surface-elevated">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`Poster de ${movie.title}`}
              className="size-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex size-full items-center justify-center px-3 text-center text-sm text-app-muted">
              Sem poster
            </div>
          )}
        </div>

        <div className="space-y-2 bg-app-surface p-3">
          <h2 className="line-clamp-2 min-h-10 text-sm font-semibold text-app-text">
            <HighlightedText text={movie.title} query={highlightQuery} />
          </h2>
          <span className="inline-flex rounded-md bg-rating px-2 py-0.5 text-xs font-bold text-app-bg">
            {movie.voteAverage.toFixed(1)}
          </span>
        </div>
      </Link>

      <button
        type="button"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onFavoriteAction()
        }}
        className={[
          'absolute top-2 right-2 rounded-full bg-app-bg/80 p-2 shadow-sm backdrop-blur transition hover:bg-app-bg',
          isRemoveAction
            ? 'text-app-text hover:text-favorite'
            : isFavorite
              ? 'text-favorite'
              : 'text-app-muted hover:text-favorite',
        ].join(' ')}
        aria-label={
          isRemoveAction || isFavorite
            ? `Remover ${movie.title} dos favoritos`
            : `Adicionar ${movie.title} aos favoritos`
        }
        aria-pressed={isRemoveAction ? undefined : isFavorite}
      >
        {isRemoveAction ? (
          <TrashIcon />
        ) : (
          <FavoriteIcon filled={isFavorite} />
        )}
      </button>
    </article>
  )
}
