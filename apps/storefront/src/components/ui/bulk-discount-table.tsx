import { Check } from "@medusajs/icons"

interface DiscountTier {
  minQuantity: number
  maxQuantity?: number
  discount: number
  pricePerUnit?: number
}

interface BulkDiscountTableProps {
  tiers: DiscountTier[]
  currentQuantity: number
  basePrice: number
  currency?: string
  className?: string
}

export function BulkDiscountTable({
  tiers,
  currentQuantity,
  basePrice,
  currency = "USD",
  className = ""
}: BulkDiscountTableProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(amount)
  }

  const getCurrentTier = () => {
    return tiers.find(tier => 
      currentQuantity >= tier.minQuantity && 
      (!tier.maxQuantity || currentQuantity <= tier.maxQuantity)
    )
  }

  const currentTier = getCurrentTier()

  return (
    <div className={`border border-gray-200 rounded-xl overflow-hidden ${className}`}>
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Bulk Pricing</h3>
        <p className="text-sm text-gray-500">Buy more, save more</p>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 text-left">
            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Quantity</th>
            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Discount</th>
            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Price/Unit</th>
            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase"></th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier, idx) => {
            const isActive = tier === currentTier
            const pricePerUnit = tier.pricePerUnit || basePrice * (1 - tier.discount / 100)

            return (
              <tr
                key={idx}
                className={`border-b border-gray-100 last:border-0 ${
                  isActive ? "bg-cyan-50" : ""
                }`}
              >
                <td className="px-4 py-3">
                  <span className={`text-sm ${isActive ? "font-semibold text-cyan-700" : "text-gray-700"}`}>
                    {tier.minQuantity}
                    {tier.maxQuantity ? ` - ${tier.maxQuantity}` : "+"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded text-sm font-medium ${
                    isActive ? "bg-cyan-100 text-cyan-700" : "bg-green-100 text-green-700"
                  }`}>
                    {tier.discount}% OFF
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-sm ${isActive ? "font-semibold text-cyan-700" : "text-gray-700"}`}>
                    {formatPrice(pricePerUnit)}
                  </span>
                  {tier.discount > 0 && (
                    <span className="text-xs text-gray-400 line-through ml-2">
                      {formatPrice(basePrice)}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {isActive && (
                    <span className="inline-flex items-center gap-1 text-sm text-cyan-600 font-medium">
                      <Check className="w-4 h-4" />
                      Applied
                    </span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {currentTier && currentTier.discount > 0 && (
        <div className="p-4 bg-green-50 border-t border-green-200">
          <p className="text-sm text-green-800">
            <strong>You're saving {currentTier.discount}%</strong> with bulk pricing!
          </p>
        </div>
      )}
    </div>
  )
}
