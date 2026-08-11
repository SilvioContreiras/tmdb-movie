import { createContext } from 'react'
import type { MovieId, MovieSummary } from '@/features/movies/domain'

export type FavoritesContextValue = {
  favorites: MovieSummary[]
  isFavorite: (id: MovieId) => boolean
  toggleFavorite: (movie: MovieSummary) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
)
