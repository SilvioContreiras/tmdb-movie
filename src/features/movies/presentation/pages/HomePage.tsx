import { useCallback, useMemo } from 'react'
import { useFavorites } from '@/features/favorites/application'
import { usePopularMovies } from '@/features/movies/application'
import { ApiError } from '@/shared/api'
import {
  ErrorState,
  InfiniteScrollSentinel,
  MovieCard,
  Spinner,
} from '@/shared/ui'

export function HomePage() {
  const { isFavorite, toggleFavorite } = useFavorites()
  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePopularMovies()

  const movies = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  )

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (isPending) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Spinner label="Carregando filmes populares..." />
      </main>
    )
  }

  if (isError) {
    const message =
      error instanceof ApiError
        ? error.message
        : 'Não foi possível carregar os filmes populares.'

    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ErrorState message={message} onRetry={() => void refetch()} />
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {movies.length === 0 ? (
        <p className="text-sm text-app-muted">Nenhum filme encontrado.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
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
            <Spinner label="Carregando mais filmes..." />
          ) : null}

          {!hasNextPage && movies.length > 0 ? (
            <p className="py-6 text-center text-sm text-app-muted">
              Você chegou ao fim da lista.
            </p>
          ) : null}
        </>
      )}
    </main>
  )
}
