import { useState } from "react"
import { Truck, MapPin } from "@medusajs/icons"
import { Button } from "./button"

interface ShippingRate {
  id: string
  carrier: string
  service: string
  price: number
  estimatedDays: string
}

interface ShippingCalculatorProps {
  onCalculate: (zipCode: string, country: string) => Promise<ShippingRate[]>
  currency?: string
  className?: string
}

export function ShippingCalculator({
  onCalculate,
  currency = "USD",
  className = ""
}: ShippingCalculatorProps) {
  const [zipCode, setZipCode] = useState("")
  const [country, setCountry] = useState("US")
  const [rates, setRates] = useState<ShippingRate[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const formatPrice = (amount: number) => {
    if (amount === 0) return "Free"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(amount)
  }

  const handleCalculate = async () => {
    if (!zipCode) {
      setError("Please enter a ZIP code")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await onCalculate(zipCode, country)
      setRates(result)
    } catch (err) {
      setError("Unable to calculate shipping. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Truck className="w-5 h-5 text-gray-600" />
        <h3 className="font-medium text-gray-900">Estimate Shipping</h3>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">ZIP / Postal Code</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter ZIP code"
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 mb-3">{error}</p>
      )}

      <Button
        onClick={handleCalculate}
        disabled={isLoading}
        variant="outline"
        className="w-full mb-4"
      >
        {isLoading ? "Calculating..." : "Calculate Shipping"}
      </Button>

      {rates.length > 0 && (
        <div className="space-y-2 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Available shipping options:</p>
          {rates.map(rate => (
            <div
              key={rate.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{rate.carrier} - {rate.service}</p>
                <p className="text-sm text-gray-500">{rate.estimatedDays}</p>
              </div>
              <span className={`font-semibold ${rate.price === 0 ? "text-green-600" : "text-gray-900"}`}>
                {formatPrice(rate.price)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
