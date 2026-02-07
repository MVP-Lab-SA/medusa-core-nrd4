import { useState, useEffect } from "react"
import { Link } from "@tanstack/react-router"
import { clx } from "@medusajs/ui"
import { XMark } from "@medusajs/icons"

interface Product {
  id: string
  title: string
  handle: string
  thumbnail?: string
  price?: string
}

interface RecentlyViewedProps {
  currentProductId?: string
  maxItems?: number
  storageKey?: string
  countryCode?: string
  className?: string
}

const STORAGE_KEY = "recently-viewed-products"

export function RecentlyViewed({
  currentProductId,
  maxItems = 6,
  storageKey = STORAGE_KEY,
  countryCode = "us",
  className,
}: RecentlyViewedProps) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored) as Product[]
        const filtered = currentProductId
          ? parsed.filter((p) => p.id !== currentProductId)
          : parsed
        setProducts(filtered.slice(0, maxItems))
      }
    } catch {
      console.error("Failed to load recently viewed products")
    }
  }, [currentProductId, maxItems, storageKey])

  const removeProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId)
    setProducts(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
  }

  const clearAll = () => {
    setProducts([])
    localStorage.removeItem(storageKey)
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Recently Viewed</h2>
        <button
          onClick={clearAll}
          className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <button
              onClick={() => removeProduct(product.id)}
              className="absolute top-2 right-2 z-10 p-1 bg-black/50 hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Remove ${product.title}`}
            >
              <XMark className="w-4 h-4 text-white" />
            </button>

            <Link
              to={`/${countryCode}/products/${product.handle}`}
              className="block"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-neutral-800 mb-3">
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-600">
                    No image
                  </div>
                )}
              </div>
              <h3 className="text-sm text-white font-medium line-clamp-1 group-hover:text-cyan-400 transition-colors">
                {product.title}
              </h3>
              {product.price && (
                <p className="text-sm text-neutral-400 mt-1">{product.price}</p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper hook to add products to recently viewed
export function useRecentlyViewed(storageKey = STORAGE_KEY, maxItems = 20) {
  const addProduct = (product: Product) => {
    try {
      const stored = localStorage.getItem(storageKey)
      let products: Product[] = stored ? JSON.parse(stored) : []
      
      // Remove if already exists
      products = products.filter((p) => p.id !== product.id)
      
      // Add to beginning
      products.unshift(product)
      
      // Limit to max items
      products = products.slice(0, maxItems)
      
      localStorage.setItem(storageKey, JSON.stringify(products))
    } catch {
      console.error("Failed to add to recently viewed")
    }
  }

  return { addProduct }
}
