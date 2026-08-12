import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LocalStorageFavoritesRepository } from '@/features/favorites/data'
import { createMovieSummary } from '@/test/fixtures/movie'

const STORAGE_KEY = 'tmdb-movie:favorites'

describe('LocalStorageFavoritesRepository', () => {
  const repository = new LocalStorageFavoritesRepository()

  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
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

  it('ignora itens com formato inválido no array salvo', () => {
    const valid = createMovieSummary({ id: 1, title: 'Avatar' })
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([valid, { id: 'bad' }, null, { title: 'Sem id' }]),
    )

    expect(repository.getAll()).toEqual([valid])
  })

  it('lança erro amigável quando o localStorage falha ao salvar', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('QuotaExceededError')
    })

    expect(() =>
      repository.saveAll([createMovieSummary({ id: 1 })]),
    ).toThrow(/Não foi possível salvar os favoritos/i)
  })
})
