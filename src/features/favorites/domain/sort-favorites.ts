import type { MovieSummary } from '@/features/movies/domain'

export type FavoritesSortOption = 'title-asc' | 'title-desc' | 'rating-desc'

export function sortFavorites(
  movies: MovieSummary[],
  sort: FavoritesSortOption,
): MovieSummary[] {
  const sorted = [...movies]

  switch (sort) {
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title, 'pt-BR'))
    case 'rating-desc':
      return sorted.sort((a, b) => b.voteAverage - a.voteAverage)
    default:
      return sorted
  }
}
