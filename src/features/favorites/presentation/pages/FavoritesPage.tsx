import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFavorites } from '@/features/favorites/application'
import {
  filterFavoritesByQuery,
  sortFavorites,
  type FavoritesSortOption,
} from '@/features/favorites/domain'
import { MIN_SEARCH_QUERY_LENGTH } from '@/features/search/domain'
import { MovieCard } from '@/shared/ui'
import { FavoritesEmptyState } from '../components/FavoritesEmptyState'
import { FavoritesSortSelect } from '../components/FavoritesSortSelect'

export function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites()
  const [searchParams] = useSearchParams()
  const [sort, setSort] = useState<FavoritesSortOption>('title-asc')

  const query = searchParams.get('q')?.trim() ?? ''
  const activeQuery =
    query.length >= MIN_SEARCH_QUERY_LENGTH ? query : ''

  const visibleFavorites = useMemo(() => {
    const filtered = filterFavoritesByQuery(favorites, activeQuery)
    return sortFavorites(filtered, sort)
  }, [favorites, activeQuery, sort])

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
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-app-text sm:text-3xl">
            Meus Filmes Favoritos
          </h1>
          {activeQuery ? (
            <p className="mt-2 text-sm text-app-muted">
              Filtrando por “{activeQuery}” — {visibleFavorites.length}{' '}
              {visibleFavorites.length === 1 ? 'filme' : 'filmes'}
            </p>
          ) : null}
        </div>
        <FavoritesSortSelect value={sort} onChange={setSort} />
      </div>

      {visibleFavorites.length === 0 ? (
        <p className="text-sm text-app-muted">
          Nenhum favorito encontrado para “{activeQuery}”.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {visibleFavorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              action="remove-favorite"
              highlightQuery={activeQuery || undefined}
              isFavorite
              onFavoriteAction={() => toggleFavorite(movie)}
            />
          ))}
        </div>
      )}
    </main>
  )
}
