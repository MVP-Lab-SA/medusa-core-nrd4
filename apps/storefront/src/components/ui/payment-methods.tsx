import { useState } from "react"
import { CreditCard, Plus, Trash, Check, Star } from "@medusajs/icons"
import { Button } from "./button"

interface PaymentMethod {
  id: string
  type: "card" | "paypal" | "bank"
  brand?: string
  last4?: string
  expiryMonth?: number
  expiryYear?: number
  email?: string
  bankName?: string
  isDefault: boolean
}

interface PaymentMethodsProps {
  methods: PaymentMethod[]
  onAdd: () => void
  onDelete: (id: string) => void
  onSetDefault: (id: string) => void
  selectable?: boolean
  selectedId?: string
  onSelect?: (id: string) => void
  className?: string
}

export function PaymentMethods({
  methods,
  onAdd,
  onDelete,
  onSetDefault,
  selectable = false,
  selectedId,
  onSelect,
  className = ""
}: PaymentMethodsProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const getCardIcon = (brand?: string) => {
    switch (brand?.toLowerCase()) {
      case "visa":
        return (
          <svg className="w-8 h-6" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="#1A1F71"/>
            <path d="M19.5 21H17L18.8 11H21.3L19.5 21Z" fill="white"/>
          </svg>
        )
      case "mastercard":
        return (
          <svg className="w-8 h-6" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="#F5F5F5"/>
            <circle cx="19" cy="16" r="8" fill="#EB001B"/>
            <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
          </svg>
        )
      default:
        return <CreditCard className="w-8 h-6 text-gray-400" />
    }
  }

  if (methods.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No saved payment methods</h3>
        <p className="text-gray-500 mb-6">Add a payment method for faster checkout</p>
        <Button onClick={onAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Payment Method
        </Button>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">Saved Payment Methods</h3>
        <Button variant="outline" size="sm" onClick={onAdd}>
          <Plus className="w-4 h-4 mr-1" />
          Add New
        </Button>
      </div>

      <div className="space-y-3">
        {methods.map(method => {
          const isSelected = selectable && selectedId === method.id

          return (
            <div
              key={method.id}
              onClick={() => selectable && onSelect?.(method.id)}
              className={`relative flex items-center gap-4 p-4 border rounded-xl ${
                isSelected
                  ? "border-cyan-500 bg-cyan-50"
                  : "border-gray-200 hover:border-gray-300"
              } ${selectable ? "cursor-pointer" : ""}`}
            >
              {/* Selection Indicator */}
              {selectable && (
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected ? "bg-cyan-500 border-cyan-500" : "border-gray-300"
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
              )}

              {/* Card Icon */}
              {method.type === "card" && getCardIcon(method.brand)}
              {method.type === "paypal" && (
                <svg className="w-8 h-6" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#F5F5F5"/>
                  <path d="M18.5 8H23C25.8 8 27.5 9.5 27 12C26.5 15.5 24.5 17 21.5 17H20L19 22H16L18.5 8Z" fill="#253B80"/>
                </svg>
              )}

              {/* Details */}
              <div className="flex-1">
                {method.type === "card" && (
                  <>
                    <p className="font-medium text-gray-900">
                      {method.brand} ending in {method.last4}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {method.expiryMonth?.toString().padStart(2, "0")}/{method.expiryYear}
                    </p>
                  </>
                )}
                {method.type === "paypal" && (
                  <>
                    <p className="font-medium text-gray-900">PayPal</p>
                    <p className="text-sm text-gray-500">{method.email}</p>
                  </>
                )}
                {method.type === "bank" && (
                  <>
                    <p className="font-medium text-gray-900">{method.bankName}</p>
                    <p className="text-sm text-gray-500">Account ending in {method.last4}</p>
                  </>
                )}
              </div>

              {/* Default Badge */}
              {method.isDefault && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-cyan-100 text-cyan-700 text-xs font-medium rounded">
                  <Star className="w-3 h-3" />
                  Default
                </span>
              )}

              {/* Actions */}
              {!selectable && (
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onSetDefault(method.id)
                      }}
                      className="p-2 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded"
                      title="Set as default"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  )}
                  {deleteConfirm === method.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete(method.id)
                          setDeleteConfirm(null)
                        }}
                        className="px-2 py-1 text-xs text-red-600 font-medium"
                      >
                        Delete
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setDeleteConfirm(null)
                        }}
                        className="px-2 py-1 text-xs text-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeleteConfirm(method.id)
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
