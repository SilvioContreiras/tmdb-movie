export const paths = {
  home: '/',
  movieDetails: '/movie/:id',
  favorites: '/favorites',
  search: '/search',
} as const

export function movieDetailsPath(id: string | number): string {
  return `/movie/${id}`
}

export function searchPath(query: string): string {
  const params = new URLSearchParams({ q: query })
  return `${paths.search}?${params.toString()}`
}

export function favoritesPath(query?: string): string {
  const trimmed = query?.trim() ?? ''

  if (!trimmed) {
    return paths.favorites
  }

  const params = new URLSearchParams({ q: trimmed })
  return `${paths.favorites}?${params.toString()}`
}
