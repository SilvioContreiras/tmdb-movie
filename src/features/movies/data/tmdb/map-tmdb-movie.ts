import type {
  Genre,
  MovieDetails,
  MovieSummary,
  PaginatedMovies,
} from '@/features/movies/domain'
import type {
  TmdbGenreDto,
  TmdbMovieDetailsDto,
  TmdbMovieListItemDto,
  TmdbPaginatedMoviesDto,
} from './tmdb-movie.dto'

function mapGenre(dto: TmdbGenreDto): Genre {
  return {
    id: dto.id,
    name: dto.name,
  }
}

export function mapMovieSummary(dto: TmdbMovieListItemDto): MovieSummary {
  return {
    id: dto.id,
    title: dto.title,
    overview: dto.overview,
    posterPath: dto.poster_path,
    backdropPath: dto.backdrop_path,
    releaseDate: dto.release_date || null,
    voteAverage: dto.vote_average,
    popularity: dto.popularity,
  }
}

export function mapMovieDetails(dto: TmdbMovieDetailsDto): MovieDetails {
  return {
    ...mapMovieSummary(dto),
    tagline: dto.tagline,
    runtime: dto.runtime,
    genres: dto.genres.map(mapGenre),
    status: dto.status,
    originalLanguage: dto.original_language,
    voteCount: dto.vote_count,
  }
}

export function mapPaginatedMovies(dto: TmdbPaginatedMoviesDto): PaginatedMovies {
  return {
    page: dto.page,
    totalPages: dto.total_pages,
    totalResults: dto.total_results,
    results: dto.results.map(mapMovieSummary),
  }
}
