import { useQuery } from '@tanstack/react-query'
import { movieRepository } from '@/features/movies/data'
import { movieQueryKeys } from './movie-query-keys'

export function useSearchMovies(query: string, page = 1) {
  const normalizedQuery = query.trim()

  return useQuery({
    queryKey: movieQueryKeys.search(normalizedQuery, page),
    queryFn: () => movieRepository.search(normalizedQuery, page),
    enabled: normalizedQuery.length > 0,
  })
}
