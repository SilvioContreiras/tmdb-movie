import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFavorites } from '@/features/favorites/application'
import { useSearchMovies } from '@/features/movies/application'
import { MIN_SEARCH_QUERY_LENGTH } from '@/features/search/domain'
import { ApiError } from '@/shared/api'
import {
  ErrorState,
  HighlightedText,
  InfiniteScrollSentinel,
  MovieCard,
  Spinner,
} from '@/shared/ui'

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const { isFavorite, toggleFavorite } = useFavorites()
  const query = searchParams.get('q')?.trim() ?? ''
  const canSearch = query.length >= MIN_SEARCH_QUERY_LENGTH

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
  const totalResults = data?.pages[0]?.totalResults ?? 0

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (!canSearch) {
    return <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6" />
  }

  if (isPending || (isFetching && !data)) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
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
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ErrorState message={message} onRetry={() => void refetch()} />
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-app-text sm:text-3xl">
          Resultados para:{' '}
          <HighlightedText text={`'${query}'`} query={query} />
        </h1>
        <p className="mt-2 text-sm text-app-muted">
          Encontrados {totalResults}{' '}
          {totalResults === 1 ? 'filme' : 'filmes'}
        </p>
      </div>

      {movies.length === 0 ? (
        <p className="text-sm text-app-muted">
          Nenhum filme encontrado para “{query}”.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                highlightQuery={query}
                isFavorite={isFavorite(movie.id)}
                onFavoriteAction={() => toggleFavorite(movie)}
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
            <p className="py-6 text-center text-sm text-app-muted">
              Você chegou ao fim dos resultados.
            </p>
          ) : null}
        </>
      )}
    </main>
  )
}
