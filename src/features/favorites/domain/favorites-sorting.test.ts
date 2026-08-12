import { describe, expect, it } from 'vitest'
import {
  filterFavoritesByQuery,
  sortFavorites,
} from '@/features/favorites/domain'
import { createMovieSummary } from '@/test/fixtures/movie'

const movies = [
  createMovieSummary({ id: 1, title: 'Zorro', voteAverage: 7.2 }),
  createMovieSummary({ id: 2, title: 'Avatar', voteAverage: 9.1 }),
  createMovieSummary({ id: 3, title: 'Matrix Reloaded', voteAverage: 8.0 }),
]

describe('filterFavoritesByQuery', () => {
  it('retorna a lista original quando a query está vazia', () => {
    expect(filterFavoritesByQuery(movies, '   ')).toEqual(movies)
  })

  it('filtra por título de forma case-insensitive', () => {
    expect(filterFavoritesByQuery(movies, 'matrix')).toEqual([
      createMovieSummary({
        id: 3,
        title: 'Matrix Reloaded',
        voteAverage: 8.0,
      }),
    ])
  })

  it('retorna lista vazia quando não há correspondência', () => {
    expect(filterFavoritesByQuery(movies, 'batman')).toEqual([])
  })
})

describe('sortFavorites', () => {
  it('ordena por título A-Z', () => {
    expect(sortFavorites(movies, 'title-asc').map((movie) => movie.title)).toEqual([
      'Avatar',
      'Matrix Reloaded',
      'Zorro',
    ])
  })

  it('ordena por título Z-A', () => {
    expect(sortFavorites(movies, 'title-desc').map((movie) => movie.title)).toEqual([
      'Zorro',
      'Matrix Reloaded',
      'Avatar',
    ])
  })

  it('ordena por nota maior → menor', () => {
    expect(
      sortFavorites(movies, 'rating-desc').map((movie) => movie.voteAverage),
    ).toEqual([9.1, 8.0, 7.2])
  })

  it('não muta a lista original', () => {
    const original = [...movies]
    sortFavorites(movies, 'title-asc')
    expect(movies).toEqual(original)
  })
})
