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

  return new Intl.DateTimeFormat('pt-BR').format(date)
}

export function MovieDetailsPage() {
  const { id: rawId } = useParams<{ id: string }>()
  const movieId = useMemo(() => parseMovieId(rawId), [rawId])
  const { isFavorite, toggleFavorite } = useFavorites()
  const { data: movie, isPending, isError, error, refetch } =
    useMovieDetails(movieId)

  if (!movieId) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <ErrorState
          title="Filme inválido"
          message="O identificador informado na URL não é válido."
        />
      </main>
    )
  }

  if (isPending) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
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
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <ErrorState message={message} onRetry={() => void refetch()} />
      </main>
    )
  }

  const imageUrl =
    buildTmdbImageUrl(movie.backdropPath, 'original') ??
    buildTmdbImageUrl(movie.posterPath, 'original')
  const favorited = isFavorite(movie.id)

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-lg bg-zinc-200 ring-1 ring-zinc-200">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Imagem de ${movie.title}`}
              className="aspect-video w-full object-cover lg:aspect-[4/3]"
            />
          ) : (
            <div className="flex aspect-video items-center justify-center text-sm text-zinc-500 lg:aspect-[4/3]">
              Sem imagem disponível
            </div>
          )}
        </div>

        <section className="space-y-5">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              {movie.title}
            </h1>

            {movie.genres.length > 0 ? (
              <ul className="flex flex-wrap gap-2" aria-label="Gêneros">
                {movie.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">Gêneros não informados</p>
            )}
          </div>

          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-zinc-500">Data de lançamento</dt>
              <dd className="mt-1 text-zinc-900">
                {formatReleaseDate(movie.releaseDate)}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-500">Nota TMDB</dt>
              <dd className="mt-1 text-zinc-900">
                {movie.voteAverage.toFixed(1)}
              </dd>
            </div>
          </dl>

          <div>
            <h2 className="text-sm font-medium text-zinc-500">Sinopse</h2>
            <p className="mt-2 text-base leading-relaxed text-zinc-700">
              {movie.overview.trim() || 'Sinopse não disponível.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => toggleFavorite(movie)}
            className={[
              'rounded-md px-4 py-2.5 text-sm font-medium transition',
              favorited
                ? 'bg-zinc-900 text-white hover:bg-zinc-800'
                : 'border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50',
            ].join(' ')}
            aria-pressed={favorited}
          >
            {favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </button>
        </section>
      </div>
    </main>
  )
}
