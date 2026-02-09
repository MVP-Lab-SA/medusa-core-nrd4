import { CreditCard, Trash, CheckCircle } from "@medusajs/icons"
import type { PaymentMethod } from "../../lib/mock/payments"

interface PaymentMethodCardProps {
  method: PaymentMethod
  isDefault?: boolean
  onSetDefault?: (id: string) => void
  onDelete?: (id: string) => void
}

export function PaymentMethodCard({ method, isDefault, onSetDefault, onDelete }: PaymentMethodCardProps) {
  const brandLogos: Record<string, string> = {
    visa: "V",
    mastercard: "M",
    amex: "A",
    discover: "D",
  }

  return (
    <div className={`bg-gray-900 border rounded-lg p-4 ${isDefault ? "border-cyan-500 ring-2 ring-cyan-500/20" : "border-gray-800"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center">
            {method.brand ? (
              <span className="text-lg font-bold text-gray-300">
                {brandLogos[method.brand.toLowerCase()] || method.brand.charAt(0)}
              </span>
            ) : (
              <CreditCard className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div>
            <p className="font-medium text-white">
              {method.brand || "Card"} **** {method.last4}
            </p>
            <p className="text-sm text-gray-400">
              Expires {method.expiryMonth}/{method.expiryYear}
            </p>
          </div>
          {isDefault && (
            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Default
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isDefault && onSetDefault && (
            <button
              onClick={() => onSetDefault(method.id)}
              className="text-sm text-cyan-400 hover:text-cyan-300"
            >
              Set Default
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(method.id)}
              className="p-2 text-gray-500 hover:text-red-400"
            >
              <Trash className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
