import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { ShoppingBag, XMark, Trash } from "@medusajs/icons"
import { Button } from "./button"
import { Thumbnail } from "./thumbnail"

interface CartItem {
  id: string
  title: string
  variant?: string
  thumbnail?: string
  quantity: number
  price: string
  productHandle: string
}

interface MiniCartProps {
  items: CartItem[]
  subtotal: string
  itemCount: number
  onRemove: (itemId: string) => void
  onCheckout: () => void
  freeShippingThreshold?: number
  currentTotal?: number
  currency?: string
}

export function MiniCart({
  items,
  subtotal,
  itemCount,
  onRemove,
  onCheckout,
  freeShippingThreshold,
  currentTotal,
  currency = "USD"
}: MiniCartProps) {
  const [isOpen, setIsOpen] = useState(false)

  const freeShippingProgress = freeShippingThreshold && currentTotal
    ? Math.min((currentTotal / freeShippingThreshold) * 100, 100)
    : null

  const amountToFreeShipping = freeShippingThreshold && currentTotal
    ? Math.max(freeShippingThreshold - currentTotal, 0)
    : null

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full"
      >
        <ShoppingBag className="w-5 h-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">
              Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <XMark className="w-4 h-4" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="p-8 text-center">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Your cart is empty</p>
              <Link
                to="/us/store"
                onClick={() => setIsOpen(false)}
                className="text-cyan-600 hover:text-cyan-700 text-sm font-medium mt-2 inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Free Shipping Progress */}
              {freeShippingProgress !== null && amountToFreeShipping !== null && (
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  {amountToFreeShipping > 0 ? (
                    <>
                      <p className="text-xs text-gray-600 mb-2">
                        Add{" "}
                        <span className="font-semibold">
                          {new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amountToFreeShipping)}
                        </span>{" "}
                        more for free shipping
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-cyan-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${freeShippingProgress}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-green-600 font-medium">
                      You've qualified for free shipping!
                    </p>
                  )}
                </div>
              )}

              {/* Items */}
              <div className="max-h-64 overflow-y-auto p-4 space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <Link
                      to={`/us/products/${item.productHandle}`}
                      onClick={() => setIsOpen(false)}
                      className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0"
                    >
                      <Thumbnail src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/us/products/${item.productHandle}`}
                        onClick={() => setIsOpen(false)}
                        className="text-sm font-medium text-gray-900 hover:text-cyan-600 line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      {item.variant && (
                        <p className="text-xs text-gray-500">{item.variant}</p>
                      )}
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        <span className="text-sm font-medium text-gray-900">{item.price}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">{subtotal}</span>
                </div>
                <div className="space-y-2">
                  <Button onClick={onCheckout} className="w-full">
                    Checkout
                  </Button>
                  <Link
                    to="/us/cart"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
