import { useState } from "react"
import { Plus, Minus, Check, Trash } from "@medusajs/icons"
import { Button } from "./button"
import { Thumbnail } from "./thumbnail"

interface BundleProduct {
  id: string
  title: string
  thumbnail?: string
  price: number
  originalPrice?: number
  required?: boolean
  maxQuantity?: number
}

interface BundleBuilderProps {
  title?: string
  description?: string
  products: BundleProduct[]
  bundleDiscount?: number
  currency?: string
  onAddBundle: (items: Array<{ productId: string; quantity: number }>) => void
}

export function BundleBuilder({
  title = "Build Your Bundle",
  description = "Select products and save more when you buy together",
  products,
  bundleDiscount = 15,
  currency = "USD",
  onAddBundle
}: BundleBuilderProps) {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {}
    products.forEach(p => {
      if (p.required) initial[p.id] = 1
    })
    return initial
  })

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(amount)
  }

  const toggleProduct = (productId: string, required?: boolean) => {
    if (required) return
    setSelectedItems(prev => {
      if (prev[productId]) {
        const { [productId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [productId]: 1 }
    })
  }

  const updateQuantity = (productId: string, delta: number, maxQuantity?: number) => {
    setSelectedItems(prev => {
      const current = prev[productId] || 0
      const newQty = Math.max(1, current + delta)
      if (maxQuantity && newQty > maxQuantity) return prev
      return { ...prev, [productId]: newQty }
    })
  }

  const selectedProducts = products.filter(p => selectedItems[p.id])
  const subtotal = selectedProducts.reduce(
    (sum, p) => sum + p.price * (selectedItems[p.id] || 0),
    0
  )
  const discount = (subtotal * bundleDiscount) / 100
  const total = subtotal - discount
  const itemCount = Object.values(selectedItems).reduce((a, b) => a + b, 0)

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-1">{description}</p>
        <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          Save {bundleDiscount}% when you bundle
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {products.map(product => {
          const isSelected = !!selectedItems[product.id]
          const quantity = selectedItems[product.id] || 0

          return (
            <div
              key={product.id}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                isSelected ? "bg-white shadow-sm border border-cyan-200" : "bg-white/50 border border-transparent"
              }`}
            >
              <button
                onClick={() => toggleProduct(product.id, product.required)}
                disabled={product.required}
                className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected
                    ? "bg-cyan-500 border-cyan-500"
                    : "border-gray-300 hover:border-gray-400"
                } ${product.required ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </button>

              <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                <Thumbnail src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{product.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-cyan-600 font-semibold">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.required && (
                  <span className="text-xs text-gray-500">Required</span>
                )}
              </div>

              {isSelected && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(product.id, -1, product.maxQuantity)}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, 1, product.maxQuantity)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({itemCount} items)</span>
          <span className="text-gray-900">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-green-600">
          <span>Bundle discount ({bundleDiscount}%)</span>
          <span>-{formatPrice(discount)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
          <span>Total</span>
          <span className="text-cyan-600">{formatPrice(total)}</span>
        </div>
      </div>

      <Button
        onClick={() => {
          const items = Object.entries(selectedItems).map(([productId, quantity]) => ({
            productId,
            quantity
          }))
          onAddBundle(items)
        }}
        disabled={itemCount === 0}
        className="w-full mt-4"
      >
        Add Bundle to Cart
      </Button>
    </div>
  )
}
