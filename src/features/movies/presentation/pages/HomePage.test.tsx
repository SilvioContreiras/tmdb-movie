import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { HomePage } from '@/features/movies/presentation/pages/HomePage'
import { env } from '@/shared/config'
import {
  createTmdbListItemDto,
  createTmdbPaginatedMoviesDto,
} from '@/test/fixtures/tmdb'
import { server } from '@/test/msw/server'
import { renderWithProviders } from '@/test/test-utils'

const STORAGE_KEY = 'tmdb-movie:favorites'

describe('HomePage', () => {
  it('adiciona e remove um filme dos favoritos com persistência', async () => {
    const user = userEvent.setup()
    renderWithProviders(<HomePage />, { route: '/' })

    const favoriteButton = await screen.findByRole('button', {
      name: /Adicionar Clube da Luta aos favoritos/i,
    })

    await user.click(favoriteButton)

    expect(
      screen.getByRole('button', {
        name: /Remover Clube da Luta dos favoritos/i,
      }),
    ).toHaveAttribute('aria-pressed', 'true')

    await waitFor(() => {
      const stored = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? '[]',
      ) as Array<{
        id: number
        title: string
      }>
      expect(stored).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 550, title: 'Clube da Luta' }),
        ]),
      )
    })

    await user.click(
      screen.getByRole('button', {
        name: /Remover Clube da Luta dos favoritos/i,
      }),
    )

    expect(
      screen.getByRole('button', {
        name: /Adicionar Clube da Luta aos favoritos/i,
      }),
    ).toHaveAttribute('aria-pressed', 'false')

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')).toEqual([])
    })
  })

  it('exibe erro da API e recupera ao tentar novamente', async () => {
    const user = userEvent.setup()
    let popularCalls = 0

    server.use(
      http.get(`${env.tmdbBaseUrl}/movie/popular`, () => {
        popularCalls += 1

        if (popularCalls === 1) {
          return HttpResponse.json(
            { status_message: 'Internal Server Error' },
            { status: 500 },
          )
        }

        return HttpResponse.json(
          createTmdbPaginatedMoviesDto({
            results: [
              createTmdbListItemDto({
                id: 550,
                title: 'Clube da Luta',
                vote_average: 8.4,
              }),
            ],
            total_results: 1,
          }),
        )
      }),
    )

    renderWithProviders(<HomePage />, { route: '/' })

    expect(await screen.findByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/Falha na requisição à API/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Tentar novamente/i }))

    expect(
      await screen.findByAltText('Poster de Clube da Luta'),
    ).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
