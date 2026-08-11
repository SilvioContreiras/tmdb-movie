import { useSearchParams } from 'react-router-dom'

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
        Busca
      </h1>
      <p className="mt-2 text-zinc-600">
        Rota{' '}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">
          /search?q=termo
        </code>
        {query ? (
          <>
            {' '}
            — termo: <strong>{query}</strong>
          </>
        ) : (
          <> — nenhum termo informado ainda.</>
        )}
      </p>
    </main>
  )
}
