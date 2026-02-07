import { useState, useEffect } from "react"
import { ShoppingBag, Minus, Plus } from "@medusajs/icons"
import { Button } from "./button"
import { Thumbnail } from "./thumbnail"

interface StickyAddToCartProps {
  productTitle: string
  productImage?: string
  price: string
  originalPrice?: string
  variant?: string
  quantity: number
  onQuantityChange: (quantity: number) => void
  onAddToCart: () => void
  showAfterScroll?: number
  isLoading?: boolean
  inStock?: boolean
}

export function StickyAddToCart({
  productTitle,
  productImage,
  price,
  originalPrice,
  variant,
  quantity,
  onQuantityChange,
  onAddToCart,
  showAfterScroll = 500,
  isLoading = false,
  inStock = true
}: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterScroll)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showAfterScroll])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg transform transition-transform duration-300 md:hidden">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Product Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <Thumbnail src={productImage} alt={productTitle} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">{productTitle}</p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{price}</span>
                {originalPrice && (
                  <span className="text-xs text-gray-400 line-through">{originalPrice}</span>
                )}
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="p-2 hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart */}
          <Button
            onClick={onAddToCart}
            disabled={isLoading || !inStock}
            className="flex-shrink-0"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingBag className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
