import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ErrorState } from '@/shared/ui'

type AppErrorBoundaryProps = {
  children: ReactNode
}

type AppErrorBoundaryState = {
  hasError: boolean
}

/**
 * Captura erros de renderização não tratados e evita tela branca.
 */
export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Erro não tratado na UI:', error, info.componentStack)
  }

  private handleRetry = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="mx-auto flex min-h-dvh max-w-lg items-center px-4 py-8">
          <ErrorState
            title="Algo inesperado aconteceu"
            message="A interface encontrou um erro. Você pode tentar novamente ou recarregar a página."
            onRetry={this.handleRetry}
          />
        </main>
      )
    }

    return this.props.children
  }
}
