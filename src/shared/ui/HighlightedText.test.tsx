import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HighlightedText } from '@/shared/ui/HighlightedText'

describe('HighlightedText', () => {
  it('renderiza o texto sem highlight quando não há query', () => {
    render(<HighlightedText text="Matrix Reloaded" />)

    expect(screen.getByText('Matrix Reloaded')).toBeInTheDocument()
    expect(screen.queryByRole('mark')).not.toBeInTheDocument()
  })

  it('destaca o termo buscado de forma case-insensitive', () => {
    render(<HighlightedText text="Matrix Reloaded" query="matrix" />)

    expect(screen.getByText('Matrix', { selector: 'mark' })).toBeInTheDocument()
    expect(
      screen.getByText((_, element) => element?.textContent === ' Reloaded'),
    ).toBeInTheDocument()
  })

  it('escapa caracteres especiais da query', () => {
    render(<HighlightedText text="C++ Primer" query="C++" />)

    expect(screen.getByText('C++', { selector: 'mark' })).toBeInTheDocument()
  })
})
