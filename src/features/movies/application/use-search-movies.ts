import { useInfiniteQuery } from '@tanstack/react-query'
import { movieRepository } from '@/features/movies/data'
import { movieQueryKeys } from './movie-query-keys'

export function useSearchMovies(query: string) {
  const normalizedQuery = query.trim()

  return useInfiniteQuery({
    queryKey: movieQueryKeys.search(normalizedQuery),
    queryFn: ({ pageParam }) =>
      movieRepository.search(normalizedQuery, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: normalizedQuery.length > 0,
  })
}
