import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { GiftSolid, Plus, Check, Trash, Share } from "@medusajs/icons"
import { Button } from "./button"
import { Thumbnail } from "./thumbnail"

interface RegistryItem {
  id: string
  product: {
    id: string
    title: string
    handle: string
    thumbnail?: string
    price: string
  }
  quantity: number
  purchased: number
  priority?: "high" | "medium" | "low"
}

interface GiftRegistry {
  id: string
  name: string
  type: "wedding" | "baby" | "birthday" | "other"
  eventDate?: string
  items: RegistryItem[]
  isPublic: boolean
}

interface GiftRegistryProps {
  registry: GiftRegistry
  isOwner: boolean
  onAddItem?: (productId: string, quantity: number) => void
  onRemoveItem?: (itemId: string) => void
  onPurchase?: (itemId: string, quantity: number) => void
  onShare?: () => void
  className?: string
}

export function GiftRegistry({
  registry,
  isOwner,
  onAddItem,
  onRemoveItem,
  onPurchase,
  onShare,
  className = ""
}: GiftRegistryProps) {
  const [purchaseQuantities, setPurchaseQuantities] = useState<Record<string, number>>({})

  const typeLabels = {
    wedding: "Wedding Registry",
    baby: "Baby Registry",
    birthday: "Birthday Wishlist",
    other: "Gift Registry"
  }

  const priorityColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700"
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GiftSolid className="w-6 h-6 text-pink-500" />
            <h2 className="text-xl font-semibold text-gray-900">{registry.name}</h2>
          </div>
          <p className="text-gray-500">{typeLabels[registry.type]}</p>
          {registry.eventDate && (
            <p className="text-sm text-gray-400">Event date: {registry.eventDate}</p>
          )}
        </div>
        {onShare && (
          <Button variant="outline" onClick={onShare}>
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        )}
      </div>

      {/* Progress */}
      <div className="mb-6 p-4 bg-pink-50 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Registry completion</span>
          <span className="text-sm font-medium text-gray-900">
            {registry.items.reduce((sum, item) => sum + item.purchased, 0)} of{" "}
            {registry.items.reduce((sum, item) => sum + item.quantity, 0)} items purchased
          </span>
        </div>
        <div className="w-full bg-pink-100 rounded-full h-2">
          <div
            className="bg-pink-500 h-2 rounded-full"
            style={{
              width: `${(registry.items.reduce((sum, item) => sum + item.purchased, 0) /
                registry.items.reduce((sum, item) => sum + item.quantity, 0)) *
                100}%`
            }}
          />
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {registry.items.map(item => {
          const remaining = item.quantity - item.purchased
          const isFullyPurchased = remaining <= 0

          return (
            <div
              key={item.id}
              className={`flex items-center gap-4 p-4 border rounded-xl ${
                isFullyPurchased ? "bg-green-50 border-green-200" : "border-gray-200"
              }`}
            >
              <Link
                to={`/us/products/${item.product.handle}`}
                className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
              >
                <Thumbnail
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/us/products/${item.product.handle}`}
                    className="font-medium text-gray-900 hover:text-cyan-600"
                  >
                    {item.product.title}
                  </Link>
                  {item.priority && (
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${priorityColors[item.priority]}`}>
                      {item.priority}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{item.product.price}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {isFullyPurchased ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Fully purchased!
                    </span>
                  ) : (
                    `${item.purchased} of ${item.quantity} purchased - ${remaining} still needed`
                  )}
                </p>
              </div>

              {!isOwner && !isFullyPurchased && onPurchase && (
                <div className="flex items-center gap-2">
                  <select
                    value={purchaseQuantities[item.id] || 1}
                    onChange={(e) =>
                      setPurchaseQuantities(prev => ({
                        ...prev,
                        [item.id]: parseInt(e.target.value)
                      }))
                    }
                    className="px-2 py-1 border border-gray-200 rounded"
                  >
                    {[...Array(remaining)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <Button
                    size="sm"
                    onClick={() =>
                      onPurchase(item.id, purchaseQuantities[item.id] || 1)
                    }
                  >
                    Purchase
                  </Button>
                </div>
              )}

              {isOwner && onRemoveItem && (
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <Trash className="w-5 h-5" />
                </button>
              )}
            </div>
          )
        })}
      </div>

      {registry.items.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <GiftSolid className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No items in this registry yet</p>
        </div>
      )}
    </div>
  )
}
