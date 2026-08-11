type HighlightedTextProps = {
  text: string
  query?: string
}

/**
 * Destaca trechos do texto que correspondem ao termo buscado (case-insensitive).
 */
export function HighlightedText({ text, query }: HighlightedTextProps) {
  const term = query?.trim()

  if (!term) {
    return <>{text}</>
  }

  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === term.toLowerCase() ? (
          <mark
            key={`${part}-${index}`}
            className="rounded-sm bg-amber-200 text-inherit"
          >
            {part}
          </mark>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  )
}
