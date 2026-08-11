import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '@/app/layouts/MainLayout'
import { paths } from '@/app/router/paths'
import { FavoritesPage } from '@/features/favorites/presentation/pages/FavoritesPage'
import { HomePage } from '@/features/movies/presentation/pages/HomePage'
import { MovieDetailsPage } from '@/features/movies/presentation/pages/MovieDetailsPage'
import { SearchPage } from '@/features/search/presentation/pages/SearchPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={paths.movieDetails} element={<MovieDetailsPage />} />
          <Route path={paths.favorites} element={<FavoritesPage />} />
          <Route path={paths.search} element={<SearchPage />} />
          <Route path="*" element={<Navigate to={paths.home} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
