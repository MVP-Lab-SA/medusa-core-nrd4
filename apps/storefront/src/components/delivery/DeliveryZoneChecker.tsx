import { useState } from "react"
import { MapPin, Check, XMark } from "@medusajs/icons"

interface DeliveryZoneCheckerProps {
  onCheckZone: (postalCode: string) => Promise<{
    available: boolean
    deliveryFee?: number
    estimatedDays?: number
    message?: string
  }>
}

export function DeliveryZoneChecker({ onCheckZone }: DeliveryZoneCheckerProps) {
  const [postalCode, setPostalCode] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<{
    available: boolean
    deliveryFee?: number
    estimatedDays?: number
    message?: string
  } | null>(null)

  const handleCheck = async () => {
    if (!postalCode.trim()) return
    
    setIsChecking(true)
    try {
      const response = await onCheckZone(postalCode)
      setResult(response)
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-medium text-gray-900 mb-3">Check Delivery Availability</h3>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value)
              setResult(null)
            }}
            placeholder="Enter postal code"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <button
          onClick={handleCheck}
          disabled={isChecking || !postalCode.trim()}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50"
        >
          {isChecking ? 'Checking...' : 'Check'}
        </button>
      </div>

      {result && (
        <div className={`mt-4 p-3 rounded-lg ${
          result.available ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-start gap-2">
            {result.available ? (
              <Check className="w-5 h-5 text-green-500 mt-0.5" />
            ) : (
              <XMark className="w-5 h-5 text-red-500 mt-0.5" />
            )}
            <div>
              <p className={`font-medium ${result.available ? 'text-green-800' : 'text-red-800'}`}>
                {result.available ? 'Delivery Available!' : 'Delivery Not Available'}
              </p>
              {result.message && (
                <p className={`text-sm mt-1 ${result.available ? 'text-green-700' : 'text-red-700'}`}>
                  {result.message}
                </p>
              )}
              {result.available && (
                <div className="flex gap-4 mt-2 text-sm text-green-700">
                  {result.deliveryFee !== undefined && (
                    <span>Delivery Fee: ${result.deliveryFee.toFixed(2)}</span>
                  )}
                  {result.estimatedDays && (
                    <span>Est. {result.estimatedDays} business days</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
