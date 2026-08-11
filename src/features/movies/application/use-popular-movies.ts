import { useInfiniteQuery } from '@tanstack/react-query'
import { movieRepository } from '@/features/movies/data'
import { movieQueryKeys } from './movie-query-keys'

export function usePopularMovies() {
  return useInfiniteQuery({
    queryKey: movieQueryKeys.popular(),
    queryFn: ({ pageParam }) => movieRepository.getPopular(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  })
}
