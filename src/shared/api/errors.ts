import { isAxiosError } from 'axios'

export class ApiError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function messageFromStatus(status?: number): string {
  switch (status) {
    case 401:
      return 'Não autorizado. Verifique a chave da API do TMDB.'
    case 404:
      return 'Conteúdo não encontrado.'
    case 429:
      return 'Muitas requisições. Tente novamente em instantes.'
    default:
      return 'Falha na requisição à API.'
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error
  }

  if (isAxiosError(error)) {
    const status = error.response?.status

    if (!error.response) {
      return new ApiError(
        'Falha de conexão. Verifique sua internet e tente novamente.',
      )
    }

    return new ApiError(messageFromStatus(status), status)
  }

  if (error instanceof Error && error.message.trim()) {
    return new ApiError(error.message)
  }

  return new ApiError('Erro inesperado ao comunicar com a API.')
}
