import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { favoritesRepository } from '@/features/favorites/data'
import type { MovieId, MovieSummary } from '@/features/movies/domain'
import { FavoritesContext } from './favorites-context'

type FavoritesProviderProps = {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<MovieSummary[]>(() =>
    favoritesRepository.getAll(),
  )

  const favoriteIds = useMemo(
    () => new Set(favorites.map((movie) => movie.id)),
    [favorites],
  )

  const isFavorite = useCallback(
    (id: MovieId) => favoriteIds.has(id),
    [favoriteIds],
  )

  const toggleFavorite = useCallback((movie: MovieSummary) => {
    setFavorites((current) => {
      const exists = current.some((item) => item.id === movie.id)
      const next = exists
        ? current.filter((item) => item.id !== movie.id)
        : [...current, movie]

      try {
        favoritesRepository.saveAll(next)
        return next
      } catch {
        return current
      }
    })
  }, [])

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite }),
    [favorites, isFavorite, toggleFavorite],
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
