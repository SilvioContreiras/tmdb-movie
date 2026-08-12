import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MovieCard } from '@/features/movies/presentation/components/MovieCard'
import { createMovieSummary } from '@/test/fixtures/movie'
import { renderWithProviders } from '@/test/test-utils'

describe('MovieCard', () => {
  const movie = createMovieSummary({
    id: 550,
    title: 'Clube da Luta',
    voteAverage: 8.4,
  })

  it('exibe poster, título, nota e link para detalhes', () => {
    renderWithProviders(
      <MovieCard
        movie={movie}
        isFavorite={false}
        onFavoriteAction={() => undefined}
      />,
    )

    expect(screen.getByAltText('Poster de Clube da Luta')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Clube da Luta' }),
    ).toBeInTheDocument()
    expect(screen.getByText('8.4')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/movie/550')
  })

  it('chama onFavoriteAction ao favoritar', async () => {
    const user = userEvent.setup()
    const onFavoriteAction = vi.fn()

    renderWithProviders(
      <MovieCard
        movie={movie}
        isFavorite={false}
        onFavoriteAction={onFavoriteAction}
      />,
    )

    await user.click(
      screen.getByRole('button', {
        name: /Adicionar Clube da Luta aos favoritos/i,
      }),
    )

    expect(onFavoriteAction).toHaveBeenCalledTimes(1)
  })

  it('usa ícone de lixeira no modo remove-favorite', () => {
    renderWithProviders(
      <MovieCard
        movie={movie}
        isFavorite
        action="remove-favorite"
        onFavoriteAction={() => undefined}
      />,
    )

    expect(
      screen.getByRole('button', {
        name: /Remover Clube da Luta dos favoritos/i,
      }),
    ).not.toHaveAttribute('aria-pressed')
  })

  it('destaca o termo no título quando highlightQuery é informado', () => {
    renderWithProviders(
      <MovieCard
        movie={createMovieSummary({ title: 'Matrix Reloaded' })}
        isFavorite={false}
        highlightQuery="Matrix"
        onFavoriteAction={() => undefined}
      />,
    )

    expect(screen.getByText('Matrix', { selector: 'mark' })).toBeInTheDocument()
  })
})
