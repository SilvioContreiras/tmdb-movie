import type { MovieSummary } from '@/features/movies/domain'

export interface FavoritesRepository {
  getAll(): MovieSummary[]
  saveAll(movies: MovieSummary[]): void
}
