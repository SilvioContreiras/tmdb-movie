import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FavoritesSortSelect } from '@/features/favorites/presentation/components/FavoritesSortSelect'

describe('FavoritesSortSelect', () => {
  it('exibe as opções de ordenação', () => {
    render(
      <FavoritesSortSelect value="title-asc" onChange={() => undefined} />,
    )

    expect(screen.getByLabelText(/Ordenar por/i)).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: 'Título (A-Z)' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: 'Título (Z-A)' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: 'Nota (maior → menor)' }),
    ).toBeInTheDocument()
  })

  it('notifica onChange ao selecionar outra opção', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<FavoritesSortSelect value="title-asc" onChange={onChange} />)

    await user.selectOptions(screen.getByLabelText(/Ordenar por/i), 'rating-desc')

    expect(onChange).toHaveBeenCalledWith('rating-desc')
  })
})
