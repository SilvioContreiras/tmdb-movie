import type { MovieDetails, MovieId, PaginatedMovies } from './movie'

export interface MovieRepository {
  getPopular(page?: number): Promise<PaginatedMovies>
  getById(id: MovieId): Promise<MovieDetails>
  search(query: string, page?: number): Promise<PaginatedMovies>
}
