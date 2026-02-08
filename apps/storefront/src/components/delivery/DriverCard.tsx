import { Phone, Star } from "@medusajs/icons"
import type { Driver } from "../../lib/mock/fleetbase"

interface DriverCardProps {
  driver: Driver
  onCall?: () => void
}

export function DriverCard({ driver, onCall }: DriverCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          {driver.avatar ? (
            <img src={driver.avatar} alt={driver.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-500">
              {driver.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{driver.name}</h4>
          <p className="text-sm text-gray-500">{driver.vehicleType} - {driver.vehiclePlate}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{driver.rating.toFixed(1)}</span>
            <span className="text-sm text-gray-500">({driver.totalDeliveries} deliveries)</span>
          </div>
        </div>
        {onCall && (
          <button
            onClick={onCall}
            className="p-3 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
          >
            <Phone className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
