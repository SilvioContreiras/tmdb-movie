import { isAxiosError } from 'axios'

export class ApiError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error
  }

  if (isAxiosError(error)) {
    const status = error.response?.status
    const apiMessage =
      typeof error.response?.data === 'object' &&
      error.response.data !== null &&
      'status_message' in error.response.data &&
      typeof error.response.data.status_message === 'string'
        ? error.response.data.status_message
        : error.message

    return new ApiError(apiMessage || 'Falha na requisição à API', status)
  }

  if (error instanceof Error) {
    return new ApiError(error.message)
  }

  return new ApiError('Erro inesperado ao comunicar com a API')
}
