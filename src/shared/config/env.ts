function requireEnv(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name]

  if (!value) {
    throw new Error(
      `Variável de ambiente ausente: ${name}. Copie .env.example para .env e preencha os valores.`,
    )
  }

  return value
}

/**
 * Acesso tipado e centralizado às variáveis de ambiente.
 * O restante do app deve usar este módulo em vez de import.meta.env diretamente.
 */
export const env = {
  tmdbApiKey: requireEnv('VITE_TMDB_API_KEY'),
  tmdbBaseUrl: requireEnv('VITE_TMDB_BASE_URL'),
  tmdbImageBaseUrl: requireEnv('VITE_TMDB_IMAGE_BASE_URL'),
} as const
