import { useEffect, useState, type SubmitEvent } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { favoritesPath, paths, searchPath } from '@/app/router/paths'
import {
  MIN_SEARCH_QUERY_LENGTH,
  SEARCH_DEBOUNCE_MS,
} from '@/features/search/domain'

export function GlobalSearchBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const queryFromUrl = searchParams.get('q') ?? ''
  const isOnFavoritesPage = location.pathname === paths.favorites

  const [value, setValue] = useState(queryFromUrl)
  const [urlSnapshot, setUrlSnapshot] = useState(queryFromUrl)
  const [isFocused, setIsFocused] = useState(false)

  if (queryFromUrl !== urlSnapshot) {
    setUrlSnapshot(queryFromUrl)

    if (!isFocused) {
      setValue(queryFromUrl)
    }
  }

  useEffect(() => {
    const trimmed = value.trim()
    const hasActiveQuery = queryFromUrl.trim().length >= MIN_SEARCH_QUERY_LENGTH

    if (trimmed.length < MIN_SEARCH_QUERY_LENGTH) {
      if (isOnFavoritesPage && hasActiveQuery) {
        navigate(favoritesPath(), { replace: true })
        return
      }

      if (
        !isOnFavoritesPage &&
        (location.pathname === paths.search || hasActiveQuery)
      ) {
        navigate(paths.home, { replace: true })
      }
      return
    }

    if (trimmed === queryFromUrl.trim()) {
      if (isOnFavoritesPage || location.pathname === paths.search) {
        return
      }
    }

    const timeoutId = window.setTimeout(() => {
      if (isOnFavoritesPage) {
        navigate(favoritesPath(trimmed), { replace: true })
        return
      }

      navigate(searchPath(trimmed), {
        replace: location.pathname === paths.search,
      })
    }, SEARCH_DEBOUNCE_MS)

    return () => window.clearTimeout(timeoutId)
  }, [value, queryFromUrl, location.pathname, navigate, isOnFavoritesPage])

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = value.trim()

    if (trimmed.length < MIN_SEARCH_QUERY_LENGTH) {
      return
    }

    if (isOnFavoritesPage) {
      navigate(favoritesPath(trimmed), { replace: true })
      return
    }

    navigate(searchPath(trimmed), {
      replace: location.pathname === paths.search,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-0 flex-1"
      role="search"
      aria-label={
        isOnFavoritesPage
          ? 'Filtrar filmes favoritos'
          : 'Busca global de filmes'
      }
    >
      <label htmlFor="global-search" className="sr-only">
        {isOnFavoritesPage ? 'Filtrar favoritos' : 'Buscar filmes'}
      </label>
      <input
        id="global-search"
        name="q"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={
          isOnFavoritesPage ? 'Filtrar favoritos...' : 'Buscar filmes...'
        }
        className="w-full rounded-full border border-app-border bg-app-surface px-4 py-2.5 text-sm text-app-text outline-none placeholder:text-app-muted focus:border-nav-active focus:ring-2 focus:ring-nav-active/30"
      />
    </form>
  )
}
