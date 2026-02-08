interface VolumeTier {
  minQuantity: number
  maxQuantity?: number
  price: number
  discount?: number
}

interface VolumePricingTableProps {
  tiers: VolumeTier[]
  currency: string
  currentQuantity?: number
}

export function VolumePricingTable({ tiers, currency, currentQuantity }: VolumePricingTableProps) {
  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  })

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h4 className="font-medium text-gray-900">Volume Pricing</h4>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 text-sm">
            <th className="text-left py-2 px-4 font-medium text-gray-600">Quantity</th>
            <th className="text-right py-2 px-4 font-medium text-gray-600">Unit Price</th>
            <th className="text-right py-2 px-4 font-medium text-gray-600">Discount</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier, index) => {
            const isActive = currentQuantity !== undefined && 
              currentQuantity >= tier.minQuantity && 
              (!tier.maxQuantity || currentQuantity <= tier.maxQuantity)
            
            return (
              <tr 
                key={index} 
                className={`border-b border-gray-100 last:border-0 ${isActive ? "bg-blue-50" : ""}`}
              >
                <td className="py-2 px-4 text-gray-900">
                  {tier.maxQuantity 
                    ? `${tier.minQuantity} - ${tier.maxQuantity}`
                    : `${tier.minQuantity}+`
                  }
                  {isActive && (
                    <span className="ml-2 text-xs text-blue-600 font-medium">Current</span>
                  )}
                </td>
                <td className="py-2 px-4 text-right font-medium text-gray-900">
                  {formatter.format(tier.price)}
                </td>
                <td className="py-2 px-4 text-right">
                  {tier.discount ? (
                    <span className="text-green-600 font-medium">-{tier.discount}%</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
