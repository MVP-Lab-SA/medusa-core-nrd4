import { useEffect, useRef, useState } from "react"

interface InfiniteScrollProps {
  loadMore: () => Promise<boolean>
  hasMore: boolean
  isLoading?: boolean
  threshold?: number
  className?: string
  children: React.ReactNode
}

export function InfiniteScroll({
  loadMore,
  hasMore,
  isLoading = false,
  threshold = 200,
  className = "",
  children
}: InfiniteScrollProps) {
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setLoading(true)
          await loadMore()
          setLoading(false)
        }
      },
      {
        rootMargin: `${threshold}px`
      }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore, hasMore, loading, threshold])

  return (
    <div className={className}>
      {children}
      
      <div ref={sentinelRef} className="h-1" />

      {(loading || isLoading) && hasMore && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-cyan-500 rounded-full animate-spin" />
            <span className="text-gray-500">Loading more...</span>
          </div>
        </div>
      )}

      {!hasMore && (
        <div className="text-center py-8 text-gray-500">
          You've reached the end
        </div>
      )}
    </div>
  )
}
