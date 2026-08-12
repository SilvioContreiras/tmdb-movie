import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useFavorites } from '@/features/favorites/application'
import { useMovieDetails } from '@/features/movies/application'
import type { MovieId } from '@/features/movies/domain'
import { ApiError } from '@/shared/api'
import { buildTmdbImageUrl } from '@/shared/lib'
import { ErrorState, Spinner } from '@/shared/ui'

function parseMovieId(raw: string | undefined): MovieId | undefined {
  if (!raw) {
    return undefined
  }

  const id = Number(raw)
  return Number.isInteger(id) && id > 0 ? id : undefined
}

function formatReleaseDate(value: string | null): string {
  if (!value) {
    return 'Data não informada'
  }

  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date)
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      aria-hidden
      fill="currentColor"
    >
      <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  )
}

export function MovieDetailsPage() {
  const { id: rawId } = useParams<{ id: string }>()
  const movieId = useMemo(() => parseMovieId(rawId), [rawId])
  const { isFavorite, toggleFavorite } = useFavorites()
  const { data: movie, isPending, isError, error, refetch } =
    useMovieDetails(movieId)

  if (!movieId) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ErrorState
          title="Filme inválido"
          message="O identificador informado na URL não é válido."
        />
      </main>
    )
  }

  if (isPending) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Spinner label="Carregando detalhes do filme..." />
      </main>
    )
  }

  if (isError || !movie) {
    const message =
      error instanceof ApiError
        ? error.message
        : 'Não foi possível carregar os detalhes do filme.'

    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ErrorState message={message} onRetry={() => void refetch()} />
      </main>
    )
  }

  const imageUrl =
    buildTmdbImageUrl(movie.backdropPath, 'original') ??
    buildTmdbImageUrl(movie.posterPath, 'original')
  const favorited = isFavorite(movie.id)

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-xl bg-app-surface ring-1 ring-app-border/60">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Imagem de ${movie.title}`}
              className="aspect-video w-full object-cover lg:aspect-4/3"
            />
          ) : (
            <div className="flex aspect-video items-center justify-center text-sm text-app-muted lg:aspect-4/3">
              Sem imagem disponível
            </div>
          )}
        </div>

        <section className="space-y-5">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-app-text sm:text-4xl">
              {movie.title}
            </h1>

            {movie.genres.length > 0 ? (
              <ul className="flex flex-wrap gap-2" aria-label="Gêneros">
                {movie.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="rounded-full bg-nav-active px-3 py-1 text-xs font-medium text-white"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-app-muted">Gêneros não informados</p>
            )}
          </div>

          <div className="space-y-2 text-sm text-app-text">
            <p>
              Data de lançamento:{' '}
              <span className="text-app-muted">
                {formatReleaseDate(movie.releaseDate)}
              </span>
            </p>
            <p className="flex items-center gap-2">
              Nota TMDB:{' '}
              <span className="inline-flex rounded-md bg-rating px-2 py-0.5 text-xs font-bold text-app-bg">
                {movie.voteAverage.toFixed(1)}
              </span>
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-app-text">Sinopse</h2>
            <p className="mt-2 text-base leading-relaxed text-app-muted">
              {movie.overview.trim() || 'Sinopse não disponível.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => toggleFavorite(movie)}
            className={[
              'inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition',
              favorited
                ? 'bg-app-surface-elevated hover:bg-app-border'
                : 'bg-favorite hover:bg-favorite/90',
            ].join(' ')}
            aria-pressed={favorited}
          >
            <HeartIcon />
            {favorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          </button>
        </section>
      </div>
    </main>
  )
}
