import { Heart, XMark } from "@medusajs/icons"
import { Link } from "@tanstack/react-router"
import { clsx } from "clsx"
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils/price"

// Types
interface WishlistItem {
  id: string;
  handle: string;
  title: string;
  thumbnail?: string;
  price?: {
    amount: number;
    currency_code: string;
  };
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  itemCount: number;
}

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
  const [items, setItems] = useState<WishlistItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("wishlist")
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch {
        // Invalid data, ignore
      }
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items))
  }, [items])

  const addItem = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev
      return [...prev, item]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const isInWishlist = useCallback((id: string) => {
    return items.some((item) => item.id === id)
  }, [items])

  const clearWishlist = useCallback(() => {
    setItems([])
  }, [])

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
        itemCount: items.length,
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
  const { addItem, removeItem, isInWishlist } = useWishlist()
  const isWishlisted = isInWishlist(product.id)

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
      removeItem(product.id)
    } else {
      addItem(product)
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
  const { items, removeItem, clearWishlist } = useWishlist()

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
          onClick={clearWishlist}
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
              onClick={() => removeItem(item.id)}
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
  const { itemCount } = useWishlist()

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-city-gray hover:text-city-cyan transition-colors"
      aria-label="View wishlist"
    >
      <Heart className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-city-cyan text-city-dark text-xs font-bold flex items-center justify-center">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </button>
  )
}

export default WishlistProvider
