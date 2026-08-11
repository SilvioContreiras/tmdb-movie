import { useInfiniteQuery } from '@tanstack/react-query'
import { movieRepository } from '@/features/movies/data'
import { MIN_SEARCH_QUERY_LENGTH } from '@/features/search/domain'
import { movieQueryKeys } from './movie-query-keys'

export function useSearchMovies(query: string) {
  const normalizedQuery = query.trim()
  const canSearch = normalizedQuery.length >= MIN_SEARCH_QUERY_LENGTH

  return useInfiniteQuery({
    queryKey: movieQueryKeys.search(normalizedQuery),
    queryFn: ({ pageParam }) =>
      movieRepository.search(normalizedQuery, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: canSearch,
  })
}
