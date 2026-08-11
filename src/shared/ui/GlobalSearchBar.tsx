import { useNavigate, useSearchParams } from 'react-router-dom'
import { searchPath } from '@/app/router/paths'
import type { FormEvent } from 'react'

export function GlobalSearchBar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const queryFromUrl = searchParams.get('q') ?? ''

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const query = String(formData.get('q') ?? '').trim()

    if (!query) {
      return
    }

    navigate(searchPath(query))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-0 flex-1"
      role="search"
      aria-label="Busca global de filmes"
    >
      <label htmlFor="global-search" className="sr-only">
        Buscar filmes
      </label>
      <input
        key={queryFromUrl}
        id="global-search"
        name="q"
        type="search"
        defaultValue={queryFromUrl}
        placeholder="Buscar filmes..."
        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
      />
    </form>
  )
}
