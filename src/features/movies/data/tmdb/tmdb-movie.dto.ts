export interface TmdbMovieListItemDto {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date?: string
  vote_average: number
  popularity: number
}

export interface TmdbPaginatedMoviesDto {
  page: number
  results: TmdbMovieListItemDto[]
  total_pages: number
  total_results: number
}

export interface TmdbGenreDto {
  id: number
  name: string
}

export interface TmdbMovieDetailsDto extends TmdbMovieListItemDto {
  tagline: string
  runtime: number | null
  genres: TmdbGenreDto[]
  status: string
  original_language: string
  vote_count: number
}
