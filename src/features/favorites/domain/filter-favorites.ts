import type { MovieSummary } from '@/features/movies/domain'

export function filterFavoritesByQuery(
  movies: MovieSummary[],
  query: string,
): MovieSummary[] {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return movies
  }

  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(normalizedQuery),
  )
}
