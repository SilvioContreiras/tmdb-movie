import { useLocation } from 'react-router-dom'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SearchBar } from '@/features/search/presentation/components/SearchBar'
import { renderWithProviders } from '@/test/test-utils'

function LocationDisplay() {
  const location = useLocation()
  return (
    <div data-testid="location">
      {`${location.pathname}${location.search}`}
    </div>
  )
}

function renderSearchBar(route = '/') {
  return renderWithProviders(
    <>
      <SearchBar />
      <LocationDisplay />
    </>,
    { route },
  )
}

describe('SearchBar', () => {
  it('renderiza modo busca fora de favoritos', () => {
    renderSearchBar('/')

    expect(
      screen.getByRole('search', { name: /Buscar filmes/i }),
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Buscar filmes/i)).toBeInTheDocument()
  })

  it('renderiza modo filtro em favoritos e sincroniza q da URL', () => {
    renderSearchBar('/favorites?q=matrix')

    expect(
      screen.getByRole('search', { name: /Filtrar filmes favoritos/i }),
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Filtrar favoritos/i)).toHaveValue(
      'matrix',
    )
  })

  it('navega para /search após debounce com ≥ 3 caracteres', async () => {
    const user = userEvent.setup()
    renderSearchBar('/')

    await user.type(screen.getByRole('searchbox'), 'mat')

    await waitFor(() => {
      expect(screen.getByTestId('location')).toHaveTextContent('/search?q=mat')
    })
  })

  it('não navega para busca com menos de 3 caracteres', async () => {
    const user = userEvent.setup()
    renderSearchBar('/')

    await user.type(screen.getByRole('searchbox'), 'ma')

    await new Promise((resolve) => {
      window.setTimeout(resolve, 500)
    })

    expect(screen.getByTestId('location')).toHaveTextContent('/')
  })

  it('filtra favoritos via URL após debounce', async () => {
    const user = userEvent.setup()
    renderSearchBar('/favorites')

    await user.type(screen.getByRole('searchbox'), 'avo')

    await waitFor(() => {
      expect(screen.getByTestId('location')).toHaveTextContent(
        '/favorites?q=avo',
      )
    })
  })

  it('submete imediatamente ao pressionar Enter', async () => {
    const user = userEvent.setup()
    renderSearchBar('/')

    const input = screen.getByRole('searchbox')
    await user.clear(input)
    await user.type(input, 'matrix{Enter}')

    await waitFor(() => {
      expect(screen.getByTestId('location')).toHaveTextContent(
        '/search?q=matrix',
      )
    })
  })
})
