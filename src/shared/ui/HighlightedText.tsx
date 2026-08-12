type HighlightedTextProps = {
  text: string
  query?: string
}

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
            className="rounded-sm bg-highlight px-0.5 font-semibold text-app-bg"
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
