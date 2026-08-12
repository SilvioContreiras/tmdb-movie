import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { FavoritesPage } from '@/features/favorites/presentation/pages/FavoritesPage'
import { createMovieSummary } from '@/test/fixtures/movie'
import { renderWithProviders } from '@/test/test-utils'

const STORAGE_KEY = 'tmdb-movie:favorites'

describe('FavoritesPage', () => {
  it('exibe empty state quando não há favoritos', () => {
    renderWithProviders(<FavoritesPage />, { route: '/favorites' })

    expect(
      screen.getByRole('heading', { name: /Nenhum filme favorito ainda/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Explorar Filmes/i }),
    ).toHaveAttribute('href', '/')
  })

  it('lista favoritos e remove ao clicar no ícone de lixeira', async () => {
    const user = userEvent.setup()
    const movie = createMovieSummary({ id: 550, title: 'Clube da Luta' })
    localStorage.setItem(STORAGE_KEY, JSON.stringify([movie]))

    renderWithProviders(<FavoritesPage />, { route: '/favorites' })

    expect(
      screen.getByRole('heading', { name: /Meus Filmes Favoritos/i }),
    ).toBeInTheDocument()
    expect(screen.getByAltText('Poster de Clube da Luta')).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', {
        name: /Remover Clube da Luta dos favoritos/i,
      }),
    )

    expect(
      await screen.findByRole('heading', {
        name: /Nenhum filme favorito ainda/i,
      }),
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')).toEqual([])
    })
  })
})
