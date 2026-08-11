export type MovieId = number

export interface MovieSummary {
  id: MovieId
  title: string
  overview: string
  posterPath: string | null
  backdropPath: string | null
  releaseDate: string | null
  voteAverage: number
  popularity: number
}

export interface Genre {
  id: number
  name: string
}

export interface MovieDetails extends MovieSummary {
  tagline: string
  runtime: number | null
  genres: Genre[]
  status: string
  originalLanguage: string
  voteCount: number
}

export interface PaginatedMovies {
  page: number
  totalPages: number
  totalResults: number
  results: MovieSummary[]
}
