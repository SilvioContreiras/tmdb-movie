import type { MovieSummary } from '@/features/movies/domain'

export function createMovieSummary(
  overrides: Partial<MovieSummary> = {},
): MovieSummary {
  return {
    id: 1,
    title: 'Filme Exemplo',
    overview: 'Sinopse de exemplo',
    posterPath: '/poster.jpg',
    backdropPath: '/backdrop.jpg',
    releaseDate: '2024-01-15',
    voteAverage: 8.5,
    popularity: 100,
    ...overrides,
  }
}
