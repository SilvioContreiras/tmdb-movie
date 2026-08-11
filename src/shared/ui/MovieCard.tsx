import { Link } from 'react-router-dom'
import { movieDetailsPath } from '@/app/router/paths'
import { useFavorites } from '@/features/favorites/application'
import type { MovieSummary } from '@/features/movies/domain'
import { buildTmdbImageUrl } from '@/shared/lib'
import { HighlightedText } from './HighlightedText'

type MovieCardProps = {
  movie: MovieSummary
  highlightQuery?: string
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

export function MovieCard({ movie, highlightQuery }: MovieCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorited = isFavorite(movie.id)
  const posterUrl = buildTmdbImageUrl(movie.posterPath, 'w300')

  return (
    <article className="group relative overflow-hidden rounded-lg bg-zinc-100 shadow-sm ring-1 ring-zinc-200 transition hover:shadow-md">
      <Link
        to={movieDetailsPath(movie.id)}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
      >
        <div className="aspect-2/3 bg-zinc-200">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`Poster de ${movie.title}`}
              className="size-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex size-full items-center justify-center px-3 text-center text-sm text-zinc-500">
              Sem poster
            </div>
          )}
        </div>

        <div className="space-y-1 p-3">
          <h2 className="line-clamp-2 text-sm font-semibold text-zinc-900">
            <HighlightedText text={movie.title} query={highlightQuery} />
          </h2>
          <p className="text-xs text-zinc-600">
            Nota TMDB:{' '}
            <span className="font-medium text-zinc-800">
              {movie.voteAverage.toFixed(1)}
            </span>
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          toggleFavorite(movie)
        }}
        className={[
          'absolute top-2 right-2 rounded-full bg-white/90 p-2 shadow-sm backdrop-blur transition',
          favorited
            ? 'text-red-600 hover:bg-white'
            : 'text-zinc-500 hover:bg-white hover:text-red-600',
        ].join(' ')}
        aria-label={
          favorited
            ? `Remover ${movie.title} dos favoritos`
            : `Adicionar ${movie.title} aos favoritos`
        }
        aria-pressed={favorited}
      >
        <FavoriteIcon filled={favorited} />
      </button>
    </article>
  )
}
