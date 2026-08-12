import { useEffect, useState, type SubmitEvent } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { favoritesPath, paths, searchPath } from '@/app/router/paths'
import {
  MIN_SEARCH_QUERY_LENGTH,
  SEARCH_DEBOUNCE_MS,
} from '@/features/search/domain'

export function useDebouncedSearchParam() {
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

  function submit(event: SubmitEvent<HTMLFormElement>) {
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

  return {
    value,
    setValue,
    isOnFavoritesPage,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    submit,
  }
}
