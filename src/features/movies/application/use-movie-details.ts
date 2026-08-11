import { useQuery } from '@tanstack/react-query'
import { movieRepository } from '@/features/movies/data'
import type { MovieId } from '@/features/movies/domain'
import { movieQueryKeys } from './movie-query-keys'

export function useMovieDetails(id: MovieId | undefined) {
  return useQuery({
    queryKey: movieQueryKeys.details(id ?? 0),
    queryFn: () => movieRepository.getById(id!),
    enabled: typeof id === 'number' && Number.isFinite(id) && id > 0,
  })
}
