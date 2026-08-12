import type { MovieSummary } from '@/features/movies/domain'
import type { FavoritesRepository } from '@/features/favorites/domain'

const STORAGE_KEY = 'tmdb-movie:favorites'

function isMovieSummary(value: unknown): value is MovieSummary {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const movie = value as Record<string, unknown>

  return (
    typeof movie.id === 'number' &&
    typeof movie.title === 'string' &&
    typeof movie.overview === 'string' &&
    (typeof movie.posterPath === 'string' || movie.posterPath === null) &&
    (typeof movie.backdropPath === 'string' || movie.backdropPath === null) &&
    (typeof movie.releaseDate === 'string' || movie.releaseDate === null) &&
    typeof movie.voteAverage === 'number' &&
    typeof movie.popularity === 'number'
  )
}

export class LocalStorageFavoritesRepository implements FavoritesRepository {
  getAll(): MovieSummary[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        return []
      }

      const parsed: unknown = JSON.parse(raw)
      if (!Array.isArray(parsed)) {
        return []
      }

      return parsed.filter(isMovieSummary)
    } catch {
      return []
    }
  }

  saveAll(movies: MovieSummary[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(movies))
    } catch {
      throw new Error(
        'Não foi possível salvar os favoritos. Verifique o espaço disponível no navegador.',
      )
    }
  }
}

export const favoritesRepository: FavoritesRepository =
  new LocalStorageFavoritesRepository()
