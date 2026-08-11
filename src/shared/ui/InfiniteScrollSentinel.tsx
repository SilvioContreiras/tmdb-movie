import { useEffect, useRef } from 'react'

type InfiniteScrollSentinelProps = {
  enabled: boolean
  onIntersect: () => void
}

/**
 * Triggers onIntersect when the sentinel enters the viewport.
 */
export function InfiniteScrollSentinel({
  enabled,
  onIntersect,
}: InfiniteScrollSentinelProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || !enabled) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onIntersect()
        }
      },
      { rootMargin: '240px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [enabled, onIntersect])

  return <div ref={ref} className="h-8 w-full" aria-hidden />
}
