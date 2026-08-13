import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '@/app/layouts/MainLayout'
import { paths } from '@/app/router/paths'
import { ScrollToTop } from '@/app/router/ScrollToTop'
import { Spinner } from '@/shared/ui'

const HomePage = lazy(() =>
  import('@/features/movies/presentation/pages/HomePage').then((module) => ({
    default: module.HomePage,
  })),
)

const MovieDetailsPage = lazy(() =>
  import('@/features/movies/presentation/pages/MovieDetailsPage').then(
    (module) => ({
      default: module.MovieDetailsPage,
    }),
  ),
)

const FavoritesPage = lazy(() =>
  import('@/features/favorites/presentation/pages/FavoritesPage').then(
    (module) => ({
      default: module.FavoritesPage,
    }),
  ),
)

const SearchPage = lazy(() =>
  import('@/features/search/presentation/pages/SearchPage').then((module) => ({
    default: module.SearchPage,
  })),
)

function RouteFallback() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Spinner label="Carregando página..." />
    </main>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<RouteFallback />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path={paths.movieDetails}
            element={
              <Suspense fallback={<RouteFallback />}>
                <MovieDetailsPage />
              </Suspense>
            }
          />
          <Route
            path={paths.favorites}
            element={
              <Suspense fallback={<RouteFallback />}>
                <FavoritesPage />
              </Suspense>
            }
          />
          <Route
            path={paths.search}
            element={
              <Suspense fallback={<RouteFallback />}>
                <SearchPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to={paths.home} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
