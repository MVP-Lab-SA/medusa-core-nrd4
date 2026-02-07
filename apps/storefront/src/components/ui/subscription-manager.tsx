import { useState } from "react"
import { ArrowPath, Calendar, XMark, Check, PauseSolid, TriangleRightMini } from "@medusajs/icons"
import { Button } from "./button"
import { Thumbnail } from "./thumbnail"

interface Subscription {
  id: string
  product: {
    title: string
    thumbnail?: string
  }
  quantity: number
  frequency: string
  nextDelivery: string
  price: string
  status: "active" | "paused" | "cancelled"
}

interface SubscriptionManagerProps {
  subscriptions: Subscription[]
  onPause: (id: string) => void
  onResume: (id: string) => void
  onCancel: (id: string) => void
  onUpdateFrequency: (id: string, frequency: string) => void
  onSkipNext: (id: string) => void
  className?: string
}

export function SubscriptionManager({
  subscriptions,
  onPause,
  onResume,
  onCancel,
  onUpdateFrequency,
  onSkipNext,
  className = ""
}: SubscriptionManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null)

  const frequencies = [
    { value: "1_week", label: "Every week" },
    { value: "2_weeks", label: "Every 2 weeks" },
    { value: "1_month", label: "Every month" },
    { value: "2_months", label: "Every 2 months" },
    { value: "3_months", label: "Every 3 months" }
  ]

  if (subscriptions.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <ArrowPath className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No active subscriptions</h3>
        <p className="text-gray-500">Subscribe to products for automatic deliveries and save up to 15%</p>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {subscriptions.map(sub => (
        <div
          key={sub.id}
          className={`border rounded-xl overflow-hidden ${
            sub.status === "paused" ? "border-yellow-200 bg-yellow-50" :
            sub.status === "cancelled" ? "border-gray-200 bg-gray-50 opacity-60" :
            "border-gray-200"
          }`}
        >
          <div className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Thumbnail
                  src={sub.product.thumbnail}
                  alt={sub.product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{sub.product.title}</h4>
                    <p className="text-sm text-gray-500">Qty: {sub.quantity}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    sub.status === "active" ? "bg-green-100 text-green-700" :
                    sub.status === "paused" ? "bg-yellow-100 text-yellow-700" :
                    "bg-gray-100 text-gray-500"
                  }`}>
                    {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <ArrowPath className="w-4 h-4" />
                    {editingId === sub.id ? (
                      <select
                        value={sub.frequency}
                        onChange={(e) => {
                          onUpdateFrequency(sub.id, e.target.value)
                          setEditingId(null)
                        }}
                        className="border border-gray-200 rounded px-2 py-1 text-sm"
                        autoFocus
                        onBlur={() => setEditingId(null)}
                      >
                        {frequencies.map(f => (
                          <option key={f.value} value={f.value}>{f.label}</option>
                        ))}
                      </select>
                    ) : (
                      <button
                        onClick={() => setEditingId(sub.id)}
                        className="hover:text-cyan-600"
                      >
                        {frequencies.find(f => f.value === sub.frequency)?.label || sub.frequency}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Next: {sub.nextDelivery}
                  </div>
                  <div className="font-medium text-gray-900">
                    {sub.price}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          {sub.status !== "cancelled" && (
            <div className="flex border-t border-gray-200 divide-x divide-gray-200">
              {sub.status === "active" ? (
                <>
                  <button
                    onClick={() => onSkipNext(sub.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    Skip Next Delivery
                  </button>
                  <button
                    onClick={() => onPause(sub.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-sm text-yellow-600 hover:bg-yellow-50"
                  >
                    <PauseSolid className="w-4 h-4" />
                    Pause
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onResume(sub.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-sm text-green-600 hover:bg-green-50"
                >
                  <TriangleRightMini className="w-4 h-4" />
                  Resume
                </button>
              )}
              <button
                onClick={() => onCancel(sub.id)}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm text-red-600 hover:bg-red-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
