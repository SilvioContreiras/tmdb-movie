import type {
  TmdbMovieDetailsDto,
  TmdbMovieListItemDto,
  TmdbPaginatedMoviesDto,
} from '@/features/movies/data/tmdb/tmdb-movie.dto'

export function createTmdbListItemDto(
  overrides: Partial<TmdbMovieListItemDto> = {},
): TmdbMovieListItemDto {
  return {
    id: 603,
    title: 'Matrix',
    overview: 'Um hacker descobre a verdade sobre a realidade.',
    poster_path: '/matrix-poster.jpg',
    backdrop_path: '/matrix-backdrop.jpg',
    release_date: '1999-03-31',
    vote_average: 8.2,
    popularity: 90,
    ...overrides,
  }
}

export function createTmdbPaginatedMoviesDto(
  overrides: Partial<TmdbPaginatedMoviesDto> = {},
): TmdbPaginatedMoviesDto {
  return {
    page: 1,
    results: [createTmdbListItemDto()],
    total_pages: 1,
    total_results: 1,
    ...overrides,
  }
}

export function createTmdbMovieDetailsDto(
  overrides: Partial<TmdbMovieDetailsDto> = {},
): TmdbMovieDetailsDto {
  return {
    ...createTmdbListItemDto(),
    tagline: 'A realidade é uma ilusão.',
    runtime: 136,
    genres: [
      { id: 28, name: 'Ação' },
      { id: 878, name: 'Ficção científica' },
    ],
    status: 'Released',
    original_language: 'en',
    vote_count: 25_000,
    ...overrides,
  }
}
