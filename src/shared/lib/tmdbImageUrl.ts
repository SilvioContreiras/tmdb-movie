import { env } from '@/shared/config'

export type TmdbImageSize =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w300'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'original'

export function buildTmdbImageUrl(
  path: string | null | undefined,
  size: TmdbImageSize = 'w500',
): string | null {
  if (!path) {
    return null
  }

  return `${env.tmdbImageBaseUrl}/${size}${path}`
}
