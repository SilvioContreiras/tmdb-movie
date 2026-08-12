import { screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { SearchPage } from '@/features/search/presentation/pages/SearchPage'
import { env } from '@/shared/config'
import { server } from '@/test/msw/server'
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

  it('não dispara busca com menos de 3 caracteres', async () => {
    let searchCalls = 0

    server.use(
      http.get(`${env.tmdbBaseUrl}/search/movie`, () => {
        searchCalls += 1
        return HttpResponse.json({
          page: 1,
          results: [],
          total_pages: 0,
          total_results: 0,
        })
      }),
    )

    renderWithProviders(<SearchPage />, { route: '/search?q=ma' })

    expect(screen.getByRole('main')).toBeEmptyDOMElement()
    expect(screen.queryByText(/Resultados para:/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Buscando filmes/i)).not.toBeInTheDocument()

    await new Promise((resolve) => {
      window.setTimeout(resolve, 100)
    })

    expect(searchCalls).toBe(0)
  })
})
