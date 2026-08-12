import { Route, Routes } from 'react-router-dom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { MovieDetailsPage } from '@/features/movies/presentation/pages/MovieDetailsPage'
import { env } from '@/shared/config'
import { server } from '@/test/msw/server'
import { renderWithProviders } from '@/test/test-utils'

function renderDetails(route: string) {
  return renderWithProviders(
    <Routes>
      <Route path="/movie/:id" element={<MovieDetailsPage />} />
    </Routes>,
    { route },
  )
}

describe('MovieDetailsPage', () => {
  it('exibe detalhes do filme e permite favoritar', async () => {
    const user = userEvent.setup()
    renderDetails('/movie/550')

    expect(
      await screen.findByRole('heading', { name: 'Clube da Luta' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Drama')).toBeInTheDocument()
    expect(
      screen.getByText(/Um homem deprimido forma um clube secreto/i),
    ).toBeInTheDocument()

    const favoriteButton = screen.getByRole('button', {
      name: /Adicionar aos Favoritos/i,
    })
    expect(favoriteButton).toHaveAttribute('aria-pressed', 'false')

    await user.click(favoriteButton)

    expect(
      screen.getByRole('button', { name: /Remover dos Favoritos/i }),
    ).toHaveAttribute('aria-pressed', 'true')
  })

  it('exibe erro quando o id da URL é inválido', () => {
    renderDetails('/movie/abc')

    expect(
      screen.getByRole('heading', { name: /Filme inválido/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/identificador informado na URL não é válido/i),
    ).toBeInTheDocument()
  })

  it('exibe erro da API e permite tentar novamente', async () => {
    const user = userEvent.setup()
    let detailsCalls = 0

    server.use(
      http.get(`${env.tmdbBaseUrl}/movie/:id`, () => {
        detailsCalls += 1

        if (detailsCalls === 1) {
          return HttpResponse.json(
            { status_message: 'Internal Server Error' },
            { status: 500 },
          )
        }

        return HttpResponse.json({
          id: 550,
          title: 'Clube da Luta',
          overview: 'Sinopse recuperada.',
          poster_path: '/poster.jpg',
          backdrop_path: '/backdrop.jpg',
          release_date: '1999-10-15',
          vote_average: 8.4,
          popularity: 61,
          tagline: '',
          runtime: 139,
          genres: [{ id: 18, name: 'Drama' }],
          status: 'Released',
          original_language: 'en',
          vote_count: 100,
        })
      }),
    )

    renderDetails('/movie/550')

    expect(await screen.findByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/Falha na requisição à API/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Tentar novamente/i }))

    expect(
      await screen.findByRole('heading', { name: 'Clube da Luta' }),
    ).toBeInTheDocument()
  })
})
