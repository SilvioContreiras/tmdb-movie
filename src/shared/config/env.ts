function requireEnv(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name]

  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}. Copy .env.example to .env and fill in the values.`,
    )
  }

  return value
}

/**
 * Centralized, typed access to env vars (Single Responsibility).
 * Call sites should depend on this module, not on import.meta.env directly.
 */
export const env = {
  tmdbApiKey: requireEnv('VITE_TMDB_API_KEY'),
  tmdbBaseUrl: requireEnv('VITE_TMDB_BASE_URL'),
  tmdbImageBaseUrl: requireEnv('VITE_TMDB_IMAGE_BASE_URL'),
} as const
