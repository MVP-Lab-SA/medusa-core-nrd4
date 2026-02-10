import { Tag, Sparkles } from "@medusajs/icons"

interface Saving {
  type: "discount" | "promotion" | "bundle" | "free_shipping"
  label: string
  amount: string
}

interface CartSavingsProps {
  savings: Saving[]
  totalSaved: string
  className?: string
}

export function CartSavings({ savings, totalSaved, className = "" }: CartSavingsProps) {
  if (savings.length === 0) return null

  const typeIcons = {
    discount: <Tag className="w-4 h-4" />,
    promotion: <Sparkles className="w-4 h-4" />,
    bundle: <Tag className="w-4 h-4" />,
    free_shipping: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    )
  }

  return (
    <div className={`bg-green-50 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-green-600" />
        <h3 className="font-medium text-green-800">Your Savings</h3>
      </div>

      <div className="space-y-2 mb-3">
        {savings.map((saving, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-green-700">
              {typeIcons[saving.type]}
              <span>{saving.label}</span>
            </div>
            <span className="font-medium text-green-700">-{saving.amount}</span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-green-200 flex items-center justify-between">
        <span className="font-semibold text-green-800">Total Saved</span>
        <span className="text-lg font-bold text-green-700">{totalSaved}</span>
      </div>
    </div>
  )
}
