import { AppRouter } from '@/app/router'

/**
 * Composition root.
 * Providers (Query, Favorites, etc.) will wrap AppRouter in later steps.
 */
export function App() {
  return <AppRouter />
}
