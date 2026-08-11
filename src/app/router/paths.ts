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
