import { useState } from "react"
import { ArrowPath, Check, ShoppingBag } from "@medusajs/icons"
import { Button } from "./button"

interface OrderItem {
  productId: string
  variantId: string
  quantity: number
  title: string
  available: boolean
}

interface ReorderButtonProps {
  orderId: string
  items: OrderItem[]
  onReorder: (items: Array<{ variantId: string; quantity: number }>) => Promise<void>
  variant?: "default" | "outline" | "icon"
  className?: string
}

export function ReorderButton({
  orderId,
  items,
  onReorder,
  variant = "default",
  className = ""
}: ReorderButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [success, setSuccess] = useState(false)
  const [unavailableItems, setUnavailableItems] = useState<string[]>([])

  const availableItems = items.filter(item => item.available)
  const hasUnavailable = items.some(item => !item.available)

  const handleReorder = async () => {
    setIsLoading(true)
    try {
      await onReorder(
        availableItems.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity
        }))
      )
      setSuccess(true)
      setShowConfirm(false)
      setTimeout(() => setSuccess(false), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Button variant="outline" disabled className={className}>
        <Check className="w-4 h-4 mr-2" />
        Added to Cart
      </Button>
    )
  }

  if (variant === "icon") {
    return (
      <>
        <button
          onClick={() => hasUnavailable ? setShowConfirm(true) : handleReorder()}
          disabled={isLoading || availableItems.length === 0}
          className={`p-2 hover:bg-gray-100 rounded-full ${className}`}
          title="Reorder"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-cyan-500 rounded-full animate-spin" />
          ) : (
            <ArrowPath className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {showConfirm && (
          <ReorderConfirmModal
            items={items}
            onConfirm={handleReorder}
            onCancel={() => setShowConfirm(false)}
            isLoading={isLoading}
          />
        )}
      </>
    )
  }

  return (
    <>
      <Button
        onClick={() => hasUnavailable ? setShowConfirm(true) : handleReorder()}
        disabled={isLoading || availableItems.length === 0}
        variant={variant === "outline" ? "outline" : "default"}
        className={className}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Adding...
          </>
        ) : (
          <>
            <ArrowPath className="w-4 h-4 mr-2" />
            Reorder
          </>
        )}
      </Button>

      {showConfirm && (
        <ReorderConfirmModal
          items={items}
          onConfirm={handleReorder}
          onCancel={() => setShowConfirm(false)}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

interface ReorderConfirmModalProps {
  items: OrderItem[]
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}

function ReorderConfirmModal({
  items,
  onConfirm,
  onCancel,
  isLoading
}: ReorderConfirmModalProps) {
  const availableItems = items.filter(item => item.available)
  const unavailableItems = items.filter(item => !item.available)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reorder Items</h3>

        {unavailableItems.length > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 font-medium mb-2">
              Some items are no longer available:
            </p>
            <ul className="text-sm text-yellow-700 space-y-1">
              {unavailableItems.map(item => (
                <li key={item.productId}>- {item.title}</li>
              ))}
            </ul>
          </div>
        )}

        {availableItems.length > 0 ? (
          <>
            <p className="text-gray-600 mb-4">
              Add {availableItems.length} available item{availableItems.length > 1 ? "s" : ""} to your cart?
            </p>
            <ul className="mb-6 space-y-2">
              {availableItems.map(item => (
                <li key={item.productId} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{item.title}</span>
                  <span className="text-gray-500">x{item.quantity}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-gray-600 mb-4">
            Unfortunately, none of the items from this order are currently available.
          </p>
        )}

        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading || availableItems.length === 0}
            className="flex-1"
          >
            {isLoading ? "Adding..." : `Add ${availableItems.length} Items`}
          </Button>
        </div>
      </div>
    </div>
  )
}
