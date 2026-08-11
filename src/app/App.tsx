import { AppProviders } from '@/app/providers'
import { AppRouter } from '@/app/router'

/**
 * Composition root: providers + router.
 */
export function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  )
}
