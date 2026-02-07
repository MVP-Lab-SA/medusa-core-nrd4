import { useState } from "react"
import { Calculator } from "@medusajs/icons"

interface TaxBreakdown {
  label: string
  rate: string
  amount: string
}

interface TaxCalculatorProps {
  subtotal: number
  onCalculate: (zipCode: string, state: string) => Promise<{
    total: number
    breakdown: TaxBreakdown[]
  }>
  currency?: string
  className?: string
}

export function TaxCalculator({
  subtotal,
  onCalculate,
  currency = "USD",
  className = ""
}: TaxCalculatorProps) {
  const [zipCode, setZipCode] = useState("")
  const [state, setState] = useState("")
  const [taxInfo, setTaxInfo] = useState<{ total: number; breakdown: TaxBreakdown[] } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(amount)
  }

  const handleCalculate = async () => {
    if (!zipCode || !state) return

    setIsLoading(true)
    try {
      const result = await onCalculate(zipCode, state)
      setTaxInfo(result)
    } finally {
      setIsLoading(false)
    }
  }

  const states = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "IL", name: "Illinois" },
    { code: "NY", name: "New York" },
    { code: "TX", name: "Texas" },
    { code: "WA", name: "Washington" }
  ]

  return (
    <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-gray-600" />
        <h3 className="font-medium text-gray-900">Estimate Tax</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="">Select state</option>
            {states.map(s => (
              <option key={s.code} value={s.code}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">ZIP Code</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="12345"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!zipCode || !state || isLoading}
        className="w-full py-2 text-sm text-cyan-600 hover:text-cyan-700 font-medium disabled:opacity-50"
      >
        {isLoading ? "Calculating..." : "Calculate Tax"}
      </button>

      {taxInfo && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-2 mb-3">
            {taxInfo.breakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{item.label} ({item.rate})</span>
                <span className="text-gray-900">{item.amount}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between font-medium">
            <span className="text-gray-900">Estimated Tax</span>
            <span className="text-gray-900">{formatPrice(taxInfo.total)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            * Final tax will be calculated at checkout
          </p>
        </div>
      )}
    </div>
  )
}
