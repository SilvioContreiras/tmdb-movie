import { beforeEach, describe, expect, it } from 'vitest'
import { LocalStorageFavoritesRepository } from '@/features/favorites/data'
import { createMovieSummary } from '@/test/fixtures/movie'

const STORAGE_KEY = 'tmdb-movie:favorites'

describe('LocalStorageFavoritesRepository', () => {
  const repository = new LocalStorageFavoritesRepository()

  beforeEach(() => {
    localStorage.clear()
  })

  it('retorna lista vazia quando não há dados salvos', () => {
    expect(repository.getAll()).toEqual([])
  })

  it('salva e recupera favoritos', () => {
    const movies = [
      createMovieSummary({ id: 1, title: 'Avatar' }),
      createMovieSummary({ id: 2, title: 'Matrix' }),
    ]

    repository.saveAll(movies)

    expect(repository.getAll()).toEqual(movies)
    expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(movies))
  })

  it('retorna lista vazia quando o JSON salvo é inválido', () => {
    localStorage.setItem(STORAGE_KEY, '{invalid-json')

    expect(repository.getAll()).toEqual([])
  })

  it('retorna lista vazia quando o valor salvo não é um array', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 1 }))

    expect(repository.getAll()).toEqual([])
  })
})
