import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SearchPage } from '@/features/search/presentation/pages/SearchPage'
import { renderWithProviders } from '@/test/test-utils'

describe('SearchPage', () => {
  it('exibe resultados da busca e destaca o termo no título', async () => {
    renderWithProviders(<SearchPage />, { route: '/search?q=matrix' })

    expect(await screen.findByText(/Resultados para:/i)).toBeInTheDocument()
    expect(await screen.findByAltText('Poster de Matrix')).toBeInTheDocument()
    expect(screen.getByAltText('Poster de Matrix Reloaded')).toBeInTheDocument()
    expect(screen.getByText(/Encontrados 2 filmes/i)).toBeInTheDocument()

    const highlights = screen.getAllByText('Matrix', { selector: 'mark' })
    expect(highlights.length).toBeGreaterThan(0)
  })
})
