import { useState, type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { FavoritesProvider } from '@/features/favorites/application'
import { AppErrorBoundary } from './AppErrorBoundary'
import { createAppQueryClient } from './create-app-query-client'

type AppProvidersProps = {
  children: ReactNode
}

/**
 * Composition of global providers.
 */
export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(() => createAppQueryClient())

  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>{children}</FavoritesProvider>
      </QueryClientProvider>
    </AppErrorBoundary>
  )
}
