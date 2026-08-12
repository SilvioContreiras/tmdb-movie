import { http, HttpResponse, type RequestHandler } from 'msw'
import { env } from '@/shared/config'
import {
  createTmdbListItemDto,
  createTmdbPaginatedMoviesDto,
} from '@/test/fixtures/tmdb'

const popularMovies = createTmdbPaginatedMoviesDto({
  results: [
    createTmdbListItemDto({
      id: 550,
      title: 'Clube da Luta',
      vote_average: 8.4,
      popularity: 61.2,
    }),
    createTmdbListItemDto({
      id: 680,
      title: 'Pulp Fiction',
      vote_average: 8.5,
      popularity: 70,
    }),
  ],
  total_results: 2,
})

export const handlers: RequestHandler[] = [
  http.get(`${env.tmdbBaseUrl}/movie/popular`, () => {
    return HttpResponse.json(popularMovies)
  }),

  http.get(`${env.tmdbBaseUrl}/search/movie`, ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('query')?.trim().toLowerCase() ?? ''

    if (!query) {
      return HttpResponse.json(
        createTmdbPaginatedMoviesDto({ results: [], total_results: 0 }),
      )
    }

    const results = [
      createTmdbListItemDto({
        id: 603,
        title: 'Matrix',
        vote_average: 8.2,
      }),
      createTmdbListItemDto({
        id: 604,
        title: 'Matrix Reloaded',
        vote_average: 7.2,
      }),
    ].filter((movie) => movie.title.toLowerCase().includes(query))

    return HttpResponse.json(
      createTmdbPaginatedMoviesDto({
        results,
        total_results: results.length,
      }),
    )
  }),
]
