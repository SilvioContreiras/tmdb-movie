import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FavoritesEmptyState } from '@/features/favorites/presentation/components/FavoritesEmptyState'
import { renderWithProviders } from '@/test/test-utils'

describe('FavoritesEmptyState', () => {
  it('exibe mensagem e CTA para explorar filmes', () => {
    renderWithProviders(<FavoritesEmptyState />)

    expect(
      screen.getByRole('heading', { name: /Nenhum filme favorito ainda/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Explorar Filmes/i }),
    ).toHaveAttribute('href', '/')
  })
})
