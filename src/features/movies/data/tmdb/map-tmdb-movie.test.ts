import { describe, expect, it } from 'vitest'
import {
  mapMovieDetails,
  mapMovieSummary,
  mapPaginatedMovies,
} from '@/features/movies/data/tmdb/map-tmdb-movie'
import type {
  TmdbMovieDetailsDto,
  TmdbMovieListItemDto,
  TmdbPaginatedMoviesDto,
} from '@/features/movies/data/tmdb/tmdb-movie.dto'

const listItemDto: TmdbMovieListItemDto = {
  id: 550,
  title: 'Clube da Luta',
  overview: 'Um homem deprimido forma um clube...',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  release_date: '1999-10-15',
  vote_average: 8.4,
  popularity: 61.2,
}

describe('mapMovieSummary', () => {
  it('converte o DTO da listagem para o modelo de domínio', () => {
    expect(mapMovieSummary(listItemDto)).toEqual({
      id: 550,
      title: 'Clube da Luta',
      overview: 'Um homem deprimido forma um clube...',
      posterPath: '/poster.jpg',
      backdropPath: '/backdrop.jpg',
      releaseDate: '1999-10-15',
      voteAverage: 8.4,
      popularity: 61.2,
    })
  })

  it('normaliza release_date ausente para null', () => {
    const withoutDate: TmdbMovieListItemDto = {
      ...listItemDto,
      release_date: undefined,
    }

    expect(mapMovieSummary(withoutDate).releaseDate).toBeNull()
  })

  it('normaliza release_date vazia para null', () => {
    const emptyDate: TmdbMovieListItemDto = {
      ...listItemDto,
      release_date: '',
    }

    expect(mapMovieSummary(emptyDate).releaseDate).toBeNull()
  })
})

describe('mapMovieDetails', () => {
  it('converte o DTO de detalhes incluindo gêneros e metadados', () => {
    const detailsDto: TmdbMovieDetailsDto = {
      ...listItemDto,
      tagline: 'Caos',
      runtime: 139,
      genres: [
        { id: 18, name: 'Drama' },
        { id: 53, name: 'Thriller' },
      ],
      status: 'Released',
      original_language: 'en',
      vote_count: 28000,
    }

    expect(mapMovieDetails(detailsDto)).toEqual({
      id: 550,
      title: 'Clube da Luta',
      overview: 'Um homem deprimido forma um clube...',
      posterPath: '/poster.jpg',
      backdropPath: '/backdrop.jpg',
      releaseDate: '1999-10-15',
      voteAverage: 8.4,
      popularity: 61.2,
      tagline: 'Caos',
      runtime: 139,
      genres: [
        { id: 18, name: 'Drama' },
        { id: 53, name: 'Thriller' },
      ],
      status: 'Released',
      originalLanguage: 'en',
      voteCount: 28000,
    })
  })
})

describe('mapPaginatedMovies', () => {
  it('converte a página paginada e mapeia os resultados', () => {
    const paginatedDto: TmdbPaginatedMoviesDto = {
      page: 1,
      total_pages: 3,
      total_results: 42,
      results: [listItemDto],
    }

    expect(mapPaginatedMovies(paginatedDto)).toEqual({
      page: 1,
      totalPages: 3,
      totalResults: 42,
      results: [
        {
          id: 550,
          title: 'Clube da Luta',
          overview: 'Um homem deprimido forma um clube...',
          posterPath: '/poster.jpg',
          backdropPath: '/backdrop.jpg',
          releaseDate: '1999-10-15',
          voteAverage: 8.4,
          popularity: 61.2,
        },
      ],
    })
  })
})
