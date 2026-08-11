import axios from 'axios'
import { env } from '@/shared/config'

export const httpClient = axios.create({
  baseURL: env.tmdbBaseUrl,
  params: {
    api_key: env.tmdbApiKey,
    language: 'pt-BR',
  },
  timeout: 15_000,
})
