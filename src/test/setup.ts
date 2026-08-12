import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, afterAll } from 'vitest'
import { server } from '@/test/msw/server'

class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds: ReadonlyArray<number> = []

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

beforeAll(() => {
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserverMock,
  })

  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  cleanup()
  server.resetHandlers()
  localStorage.clear()
})

afterAll(() => {
  server.close()
})
