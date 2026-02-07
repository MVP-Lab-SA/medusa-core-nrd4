import * as React from "react"
import { Link } from "@tanstack/react-router"
import { X, Clock } from "lucide-react"
import { clx } from "@medusajs/ui"

interface RecentProduct {
  id: string
  handle: string
  title: string
  thumbnail?: string
  price: string
  viewedAt: Date
}

interface RecentlyViewedProps {
  products: RecentProduct[]
  maxItems?: number
  onRemove?: (productId: string) => void
  onClear?: () => void
  countryCode?: string
  className?: string
}

export function RecentlyViewed({
  products,
  maxItems = 6,
  onRemove,
  onClear,
  countryCode = "us",
  className
}: RecentlyViewedProps) {
  if (products.length === 0) return null

  const displayProducts = products.slice(0, maxItems)

  return (
    <div className={clx("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-400">
          <Clock className="w-5 h-5" />
          <h3 className="font-medium text-white">Recently Viewed</h3>
        </div>
        {onClear && products.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {displayProducts.map((product) => (
          <div key={product.id} className="group relative">
            {onRemove && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onRemove(product.id)
                }}
                className="absolute -top-2 -right-2 z-10 p-1 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 opacity-0 group-hover:opacity-100 transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            )}

            <Link
              to={`/${countryCode}/products/${product.handle}`}
              className="block"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-zinc-800 mb-2">
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600">
                    No image
                  </div>
                )}
              </div>
              <h4 className="text-white text-sm font-medium truncate group-hover:text-cyan-400 transition-colors">
                {product.title}
              </h4>
              <p className="text-cyan-400 text-sm font-medium">{product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

// Hook to manage recently viewed products
const STORAGE_KEY = "recently_viewed"
const MAX_ITEMS = 20

export function useRecentlyViewed() {
  const [products, setProducts] = React.useState<RecentProduct[]>([])

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setProducts(parsed.map((p: RecentProduct) => ({
          ...p,
          viewedAt: new Date(p.viewedAt)
        })))
      } catch {
        // Invalid data, clear it
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  const addProduct = React.useCallback((product: Omit<RecentProduct, "viewedAt">) => {
    setProducts((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id)
      const updated = [
        { ...product, viewedAt: new Date() },
        ...filtered
      ].slice(0, MAX_ITEMS)
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeProduct = React.useCallback((productId: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== productId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearAll = React.useCallback(() => {
    setProducts([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return {
    products,
    addProduct,
    removeProduct,
    clearAll
  }
}
