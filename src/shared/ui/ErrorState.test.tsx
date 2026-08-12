import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ErrorState } from '@/shared/ui/ErrorState'

describe('ErrorState', () => {
  it('exibe título e mensagem', () => {
    render(<ErrorState message="Falha na requisição à API." />)

    expect(
      screen.getByRole('heading', { name: /Algo deu errado/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Falha na requisição à API/i)).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('chama onRetry ao clicar em tentar novamente', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()

    render(
      <ErrorState message="Erro temporário." onRetry={onRetry} />,
    )

    await user.click(screen.getByRole('button', { name: /Tentar novamente/i }))

    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('não renderiza botão quando onRetry não é informado', () => {
    render(<ErrorState message="Erro sem retry." />)

    expect(
      screen.queryByRole('button', { name: /Tentar novamente/i }),
    ).not.toBeInTheDocument()
  })
})
