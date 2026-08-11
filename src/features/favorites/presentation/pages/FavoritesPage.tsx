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
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <FavoritesEmptyState />
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Favoritos
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            {favorites.length}{' '}
            {favorites.length === 1 ? 'filme salvo' : 'filmes salvos'}
          </p>
        </div>

        <FavoritesSortSelect value={sort} onChange={setSort} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {sortedFavorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} action="remove-favorite" />
        ))}
      </div>
    </main>
  )
}
