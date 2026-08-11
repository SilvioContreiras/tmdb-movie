import type { MovieId } from '@/features/movies/domain'

export const movieQueryKeys = {
  all: ['movies'] as const,
  popular: () => [...movieQueryKeys.all, 'popular'] as const,
  details: (id: MovieId) => [...movieQueryKeys.all, 'details', id] as const,
  search: (query: string, page: number) =>
    [...movieQueryKeys.all, 'search', query, page] as const,
} as const
