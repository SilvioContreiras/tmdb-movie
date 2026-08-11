import type { MovieSummary } from '@/features/movies/domain'
import type { FavoritesRepository } from '@/features/favorites/domain'

const STORAGE_KEY = 'tmdb-movie:favorites'

export class LocalStorageFavoritesRepository implements FavoritesRepository {
  getAll(): MovieSummary[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        return []
      }

      const parsed: unknown = JSON.parse(raw)
      return Array.isArray(parsed) ? (parsed as MovieSummary[]) : []
    } catch {
      return []
    }
  }

  saveAll(movies: MovieSummary[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies))
  }
}

export const favoritesRepository: FavoritesRepository =
  new LocalStorageFavoritesRepository()
