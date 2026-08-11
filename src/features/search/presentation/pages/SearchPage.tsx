import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearchMovies } from '@/features/movies/application'
import { ApiError } from '@/shared/api'
import {
  ErrorState,
  InfiniteScrollSentinel,
  MovieCard,
  Spinner,
} from '@/shared/ui'

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useSearchMovies(query)

  const movies = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  )

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (!query) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Busca
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          Digite um termo na barra de busca do header para encontrar filmes.
        </p>
      </main>
    )
  }

  if (isPending || (isFetching && !data)) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Spinner label="Buscando filmes..." />
      </main>
    )
  }

  if (isError) {
    const message =
      error instanceof ApiError
        ? error.message
        : 'Não foi possível realizar a busca.'

    return (
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <ErrorState message={message} onRetry={() => void refetch()} />
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Resultados da busca
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          Termo buscado:{' '}
          <span className="font-medium text-zinc-900">“{query}”</span>
        </p>
      </div>

      {movies.length === 0 ? (
        <p className="text-sm text-zinc-600">
          Nenhum filme encontrado para “{query}”.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                highlightQuery={query}
              />
            ))}
          </div>

          <InfiniteScrollSentinel
            enabled={Boolean(hasNextPage)}
            onIntersect={handleLoadMore}
          />

          {isFetchingNextPage ? (
            <Spinner label="Carregando mais resultados..." />
          ) : null}

          {!hasNextPage && movies.length > 0 ? (
            <p className="py-6 text-center text-sm text-zinc-500">
              Você chegou ao fim dos resultados.
            </p>
          ) : null}
        </>
      )}
    </main>
  )
}
