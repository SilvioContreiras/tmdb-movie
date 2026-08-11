import type { AxiosInstance } from 'axios'
import { httpClient, toApiError } from '@/shared/api'
import type {
  MovieDetails,
  MovieId,
  MovieRepository,
  PaginatedMovies,
} from '@/features/movies/domain'
import {
  mapMovieDetails,
  mapPaginatedMovies,
} from './map-tmdb-movie'
import type {
  TmdbMovieDetailsDto,
  TmdbPaginatedMoviesDto,
} from './tmdb-movie.dto'

export class TmdbMovieRepository implements MovieRepository {
  private readonly http: AxiosInstance

  constructor(http: AxiosInstance = httpClient) {
    this.http = http
  }

  async getPopular(page = 1): Promise<PaginatedMovies> {
    try {
      const { data } = await this.http.get<TmdbPaginatedMoviesDto>(
        '/movie/popular',
        { params: { page } },
      )
      return mapPaginatedMovies(data)
    } catch (error) {
      throw toApiError(error)
    }
  }

  async getById(id: MovieId): Promise<MovieDetails> {
    try {
      const { data } = await this.http.get<TmdbMovieDetailsDto>(`/movie/${id}`)
      return mapMovieDetails(data)
    } catch (error) {
      throw toApiError(error)
    }
  }

  async search(query: string, page = 1): Promise<PaginatedMovies> {
    try {
      const { data } = await this.http.get<TmdbPaginatedMoviesDto>(
        '/search/movie',
        { params: { query, page, include_adult: false } },
      )
      return mapPaginatedMovies(data)
    } catch (error) {
      throw toApiError(error)
    }
  }
}

export const movieRepository: MovieRepository = new TmdbMovieRepository()
