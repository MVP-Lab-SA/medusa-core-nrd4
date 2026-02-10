import { MagnifyingGlass, XMark } from "@medusajs/icons"
import { Link, useNavigate } from "@tanstack/react-router"
import { clsx } from "clsx"
import { useCallback, useEffect, useRef, useState } from "react"
import { formatPrice } from "@/lib/utils/price"
import { Spinner } from "@/components/ui/loading"
import { sdk } from "@/lib/utils/sdk"
import type { StoreProduct } from "@medusajs/types"

interface SearchProps {
  countryCode: string;
  isOpen?: boolean;
  onClose?: () => void;
}

// Search trigger button for navbar
export const SearchTrigger = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-city-gray hover:text-city-cyan transition-colors"
      aria-label="Open search"
    >
      <MagnifyingGlass className="w-5 h-5" />
    </button>
  )
}

// Full search modal/overlay
export const SearchModal = ({ countryCode, isOpen, onClose }: SearchProps) => {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [products, setProducts] = useState<StoreProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  // Fetch products based on search query
  useEffect(() => {
    if (!debouncedQuery) {
      setProducts([])
      return
    }

    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const { products } = await sdk.store.product.list({
          q: debouncedQuery,
          limit: 6,
        })
        setProducts(products || [])
      } catch {
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [debouncedQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate({ 
        to: "/$countryCode/store", 
        params: { countryCode },
        search: { q: query } 
      })
      onClose?.()
    }
  }

  const handleResultClick = useCallback(() => {
    setQuery("")
    onClose?.()
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-city-dark/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Search container */}
      <div className="relative max-w-2xl mx-auto mt-20 px-4">
        <div className="bg-city-navy border border-city-steel shadow-2xl">
          {/* Search input */}
          <form onSubmit={handleSubmit} className="relative">
            <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-city-muted" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className={clsx(
                "w-full bg-transparent text-city-white text-lg",
                "pl-12 pr-12 py-4",
                "border-b border-city-steel",
                "focus:outline-none focus:border-city-cyan",
                "placeholder:text-city-muted"
              )}
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-city-muted hover:text-city-white transition-colors"
            >
              <XMark className="w-5 h-5" />
            </button>
          </form>

          {/* Search results */}
          {debouncedQuery && (
            <div className="p-4 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Spinner />
                </div>
              ) : products && products.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs text-city-muted uppercase tracking-wide mb-3">
                    Products
                  </p>
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      to="/$countryCode/products/$handle"
                      params={{ countryCode, handle: product.handle || "" }}
                      onClick={handleResultClick}
                      className="flex items-center gap-4 p-3 hover:bg-city-slate transition-colors group"
                    >
                      {product.thumbnail && (
                        <div className="w-12 h-12 bg-city-slate flex-shrink-0">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-city-white font-medium truncate group-hover:text-city-cyan transition-colors">
                          {product.title}
                        </h4>
                        {product.variants?.[0]?.calculated_price && (
                          <p className="text-city-muted text-sm">
                            {formatPrice({
                              amount: product.variants[0].calculated_price.calculated_amount || 0,
                              currency_code: product.variants[0].calculated_price.currency_code || "usd",
                            })}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                  
                  {/* View all results link */}
                  <Link
                    to="/$countryCode/store"
                    params={{ countryCode }}
                    search={{ q: debouncedQuery }}
                    onClick={handleResultClick}
                    className="block text-center py-3 text-city-cyan hover:text-city-cyan-light transition-colors text-sm font-medium"
                  >
                    View all results for "{debouncedQuery}"
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-city-gray">No products found for "{debouncedQuery}"</p>
                </div>
              )}
            </div>
          )}

          {/* Quick links when no query */}
          {!debouncedQuery && (
            <div className="p-4">
              <p className="text-xs text-city-muted uppercase tracking-wide mb-3">
                Quick Links
              </p>
              <div className="flex flex-wrap gap-2">
                {["Sensors", "Lighting", "Security", "New Arrivals"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-city-slate text-city-gray text-sm hover:bg-city-steel hover:text-city-white transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Keyboard hint */}
        <p className="text-city-muted text-xs text-center mt-4">
          Press <kbd className="px-1.5 py-0.5 bg-city-slate border border-city-steel rounded text-city-gray">ESC</kbd> to close
        </p>
      </div>
    </div>
  )
}

export default SearchModal
