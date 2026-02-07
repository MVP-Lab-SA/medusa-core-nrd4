import { useState } from "react"
import { Truck, Clock, MapPin, Check } from "@medusajs/icons"
import { Button } from "./button"

interface ShippingOption {
  id: string
  name: string
  price: number
  estimatedDays: [number, number]
  description?: string
}

interface ShippingEstimateProps {
  options: ShippingOption[]
  currency?: string
  onCheckAvailability?: (zipCode: string) => Promise<boolean>
  className?: string
}

export function ShippingEstimate({
  options,
  currency = "USD",
  onCheckAvailability,
  className = ""
}: ShippingEstimateProps) {
  const [zipCode, setZipCode] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [showOptions, setShowOptions] = useState(false)

  const formatPrice = (amount: number) => {
    if (amount === 0) return "Free"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(amount)
  }

  const getDeliveryDate = (days: number) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  const handleCheck = async () => {
    if (!zipCode || zipCode.length < 5) return

    setIsChecking(true)
    try {
      if (onCheckAvailability) {
        const available = await onCheckAvailability(zipCode)
        setIsAvailable(available)
      } else {
        // Simulate check
        await new Promise(resolve => setTimeout(resolve, 500))
        setIsAvailable(true)
      }
      setShowOptions(true)
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className={`border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Truck className="w-5 h-5 text-gray-600" />
        <h3 className="font-medium text-gray-900">Shipping & Delivery</h3>
      </div>

      {/* ZIP Code Input */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))
              setShowOptions(false)
              setIsAvailable(null)
            }}
            placeholder="Enter ZIP code"
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <Button
          onClick={handleCheck}
          disabled={zipCode.length < 5 || isChecking}
          variant="outline"
        >
          {isChecking ? "Checking..." : "Check"}
        </Button>
      </div>

      {/* Availability Status */}
      {isAvailable !== null && (
        <div className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${
          isAvailable ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}>
          {isAvailable ? (
            <>
              <Check className="w-5 h-5" />
              <span className="text-sm font-medium">Delivery available to {zipCode}</span>
            </>
          ) : (
            <>
              <span className="text-sm font-medium">Sorry, we don't deliver to {zipCode} yet</span>
            </>
          )}
        </div>
      )}

      {/* Shipping Options */}
      {showOptions && isAvailable && (
        <div className="space-y-3">
          {options.map(option => (
            <div
              key={option.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">{option.name}</p>
                  <p className="text-sm text-gray-600">
                    Get it {getDeliveryDate(option.estimatedDays[0])}
                    {option.estimatedDays[0] !== option.estimatedDays[1] && 
                      ` - ${getDeliveryDate(option.estimatedDays[1])}`
                    }
                  </p>
                  {option.description && (
                    <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                  )}
                </div>
              </div>
              <span className={`font-semibold ${option.price === 0 ? "text-green-600" : "text-gray-900"}`}>
                {formatPrice(option.price)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Default message when no ZIP entered */}
      {!showOptions && !isChecking && (
        <p className="text-sm text-gray-500">
          Enter your ZIP code to see delivery options and estimated arrival dates
        </p>
      )}
    </div>
  )
}
