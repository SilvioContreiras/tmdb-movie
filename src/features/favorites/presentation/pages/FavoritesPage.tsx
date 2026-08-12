import { useMemo, useState } from 'react'
import { useFavorites } from '@/features/favorites/application'
import {
  sortFavorites,
  type FavoritesSortOption,
} from '@/features/favorites/domain'
import { MovieCard } from '@/shared/ui'
import { FavoritesEmptyState } from '../components/FavoritesEmptyState'
import { FavoritesSortSelect } from '../components/FavoritesSortSelect'

export function FavoritesPage() {
  const { favorites } = useFavorites()
  const [sort, setSort] = useState<FavoritesSortOption>('title-asc')

  const sortedFavorites = useMemo(
    () => sortFavorites(favorites, sort),
    [favorites, sort],
  )

  if (favorites.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <FavoritesEmptyState />
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 space-y-4">
        <h1 className="text-2xl font-bold tracking-tight text-app-text sm:text-3xl">
          Meus Filmes Favoritos
        </h1>
        <FavoritesSortSelect value={sort} onChange={setSort} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {sortedFavorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} action="remove-favorite" />
        ))}
      </div>
    </main>
  )
}
