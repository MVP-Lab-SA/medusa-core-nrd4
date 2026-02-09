import { Heart, XMark, Plus, Trash, PencilSquare } from "@medusajs/icons"
import { Link } from "@tanstack/react-router"
import { clsx } from "clsx"
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils/price"

// Types
export interface WishlistItem {
  id: string;
  handle: string;
  title: string;
  thumbnail?: string;
  price?: {
    amount: number;
    currency_code: string;
  };
  addedAt?: number;
}

export interface Wishlist {
  id: string;
  name: string;
  items: WishlistItem[];
  createdAt: number;
  updatedAt: number;
}

interface WishlistContextType {
  // Multi-wishlist support
  wishlists: Wishlist[];
  createWishlist: (name: string) => Wishlist;
  deleteWishlist: (id: string) => void;
  renameWishlist: (id: string, name: string) => void;
  
  // Item management
  addItem: (item: WishlistItem, wishlistId?: string) => void;
  removeItem: (itemId: string, wishlistId?: string) => void;
  moveItem: (itemId: string, fromWishlistId: string, toWishlistId: string) => void;
  
  // Quick access for default wishlist (backward compatibility)
  items: WishlistItem[];
  isInWishlist: (id: string) => boolean;
  isInAnyWishlist: (id: string) => boolean;
  getWishlistsContaining: (id: string) => Wishlist[];
  clearWishlist: (wishlistId?: string) => void;
  itemCount: number;
  totalItemCount: number;
  
  // Default wishlist
  defaultWishlist: Wishlist | null;
}

const DEFAULT_WISHLIST_ID = "default"
const DEFAULT_WISHLIST_NAME = "My Wishlist"
const STORAGE_KEY = "wishlists"

// Context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

// Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider")
  }
  return context
}

// Provider
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Handle migration from old single-list format
        if (Array.isArray(parsed) && parsed.length > 0 && !parsed[0].items) {
          // Old format: array of items
          const migratedWishlist: Wishlist = {
            id: DEFAULT_WISHLIST_ID,
            name: DEFAULT_WISHLIST_NAME,
            items: parsed,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          }
          setWishlists([migratedWishlist])
        } else if (Array.isArray(parsed)) {
          // New format: array of wishlists
          setWishlists(parsed)
        }
      } catch {
        // Invalid data, start fresh
        setWishlists([])
      }
    }
    setIsInitialized(true)
  }, [])

  // Save to localStorage on change (after initialization)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlists))
    }
  }, [wishlists, isInitialized])

  // Ensure default wishlist exists
  useEffect(() => {
    if (isInitialized && wishlists.length === 0) {
      setWishlists([{
        id: DEFAULT_WISHLIST_ID,
        name: DEFAULT_WISHLIST_NAME,
        items: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }])
    }
  }, [isInitialized, wishlists.length])

  const defaultWishlist = wishlists.find(w => w.id === DEFAULT_WISHLIST_ID) || wishlists[0] || null

  const createWishlist = useCallback((name: string): Wishlist => {
    const newWishlist: Wishlist = {
      id: `wishlist-${Date.now()}`,
      name,
      items: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setWishlists(prev => [...prev, newWishlist])
    return newWishlist
  }, [])

  const deleteWishlist = useCallback((id: string) => {
    // Don't delete if it's the only wishlist
    setWishlists(prev => {
      if (prev.length <= 1) return prev
      return prev.filter(w => w.id !== id)
    })
  }, [])

  const renameWishlist = useCallback((id: string, name: string) => {
    setWishlists(prev => prev.map(w => 
      w.id === id ? { ...w, name, updatedAt: Date.now() } : w
    ))
  }, [])

  const addItem = useCallback((item: WishlistItem, wishlistId?: string) => {
    const targetId = wishlistId || defaultWishlist?.id || DEFAULT_WISHLIST_ID
    setWishlists(prev => prev.map(w => {
      if (w.id !== targetId) return w
      if (w.items.some(i => i.id === item.id)) return w
      return {
        ...w,
        items: [...w.items, { ...item, addedAt: Date.now() }],
        updatedAt: Date.now(),
      }
    }))
  }, [defaultWishlist?.id])

  const removeItem = useCallback((itemId: string, wishlistId?: string) => {
    if (wishlistId) {
      // Remove from specific wishlist
      setWishlists(prev => prev.map(w => {
        if (w.id !== wishlistId) return w
        return {
          ...w,
          items: w.items.filter(item => item.id !== itemId),
          updatedAt: Date.now(),
        }
      }))
    } else {
      // Remove from all wishlists
      setWishlists(prev => prev.map(w => ({
        ...w,
        items: w.items.filter(item => item.id !== itemId),
        updatedAt: Date.now(),
      })))
    }
  }, [])

  const moveItem = useCallback((itemId: string, fromWishlistId: string, toWishlistId: string) => {
    setWishlists(prev => {
      const fromWishlist = prev.find(w => w.id === fromWishlistId)
      const item = fromWishlist?.items.find(i => i.id === itemId)
      if (!item) return prev

      return prev.map(w => {
        if (w.id === fromWishlistId) {
          return {
            ...w,
            items: w.items.filter(i => i.id !== itemId),
            updatedAt: Date.now(),
          }
        }
        if (w.id === toWishlistId) {
          if (w.items.some(i => i.id === itemId)) return w
          return {
            ...w,
            items: [...w.items, item],
            updatedAt: Date.now(),
          }
        }
        return w
      })
    })
  }, [])

  const isInWishlist = useCallback((id: string) => {
    return defaultWishlist?.items.some(item => item.id === id) || false
  }, [defaultWishlist])

  const isInAnyWishlist = useCallback((id: string) => {
    return wishlists.some(w => w.items.some(item => item.id === id))
  }, [wishlists])

  const getWishlistsContaining = useCallback((id: string) => {
    return wishlists.filter(w => w.items.some(item => item.id === id))
  }, [wishlists])

  const clearWishlist = useCallback((wishlistId?: string) => {
    const targetId = wishlistId || defaultWishlist?.id
    if (!targetId) return
    setWishlists(prev => prev.map(w => 
      w.id === targetId ? { ...w, items: [], updatedAt: Date.now() } : w
    ))
  }, [defaultWishlist?.id])

  const items = defaultWishlist?.items || []
  const itemCount = items.length
  const totalItemCount = wishlists.reduce((acc, w) => acc + w.items.length, 0)

  return (
    <WishlistContext.Provider
      value={{
        wishlists,
        createWishlist,
        deleteWishlist,
        renameWishlist,
        addItem,
        removeItem,
        moveItem,
        items,
        isInWishlist,
        isInAnyWishlist,
        getWishlistsContaining,
        clearWishlist,
        itemCount,
        totalItemCount,
        defaultWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

// Wishlist button component for product cards
export const WishlistButton = ({
  product,
  className,
  size = "md",
}: {
  product: WishlistItem;
  className?: string;
  size?: "sm" | "md" | "lg";
}) => {
  const { addItem, removeItem, isInAnyWishlist } = useWishlist()
  const isWishlisted = isInAnyWishlist(product.id)

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isWishlisted) {
      removeItem(product.id) // Remove from all wishlists
    } else {
      addItem(product) // Add to default wishlist
    }
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "flex items-center justify-center transition-all",
        "bg-city-dark/50 hover:bg-city-dark/80 backdrop-blur-sm",
        isWishlisted ? "text-red-500" : "text-city-gray hover:text-city-white",
        sizeClasses[size],
        className
      )}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={clsx(iconSizes[size], isWishlisted && "fill-current")} />
    </button>
  )
}

// Wishlist drawer/page content
export const WishlistContent = ({
  countryCode,
  onClose,
}: {
  countryCode: string;
  onClose?: () => void;
}) => {
  const { items, removeItem, clearWishlist, defaultWishlist } = useWishlist()

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-city-steel mx-auto mb-4" />
        <h3 className="text-xl font-bold text-city-white mb-2">Your wishlist is empty</h3>
        <p className="text-city-gray mb-6">Save items you love to your wishlist</p>
        <Link to="/$countryCode/store" params={{ countryCode }} onClick={onClose}>
          <Button variant="primary">Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-city-white">
          {items.length} {items.length === 1 ? "Item" : "Items"}
        </h3>
        <button
          onClick={() => clearWishlist(defaultWishlist?.id)}
          className="text-city-muted hover:text-red-400 text-sm transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-3 bg-city-slate border border-city-steel"
          >
            {item.thumbnail && (
              <Link
                to="/$countryCode/products/$handle"
                params={{ countryCode, handle: item.handle }}
                onClick={onClose}
                className="w-16 h-16 bg-city-navy flex-shrink-0"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </Link>
            )}
            <div className="flex-1 min-w-0">
              <Link
                to="/$countryCode/products/$handle"
                params={{ countryCode, handle: item.handle }}
                onClick={onClose}
                className="text-city-white font-medium hover:text-city-cyan transition-colors block truncate"
              >
                {item.title}
              </Link>
              {item.price && (
                <p className="text-city-cyan text-sm">
                  {formatPrice({
                    amount: item.price.amount,
                    currency_code: item.price.currency_code,
                  })}
                </p>
              )}
            </div>
            <button
              onClick={() => removeItem(item.id, defaultWishlist?.id)}
              className="p-2 text-city-muted hover:text-red-400 transition-colors"
              aria-label="Remove from wishlist"
            >
              <XMark className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Wishlist icon with count badge for navbar
export const WishlistIcon = ({ onClick }: { onClick?: () => void }) => {
  const { totalItemCount } = useWishlist()

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-city-gray hover:text-city-cyan transition-colors"
      aria-label="View wishlist"
    >
      <Heart className="w-5 h-5" />
      {totalItemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-city-cyan text-city-dark text-xs font-bold flex items-center justify-center">
          {totalItemCount > 9 ? "9+" : totalItemCount}
        </span>
      )}
    </button>
  )
}

// Export for account page usage
export { Plus, Trash, PencilSquare }

export default WishlistProvider
