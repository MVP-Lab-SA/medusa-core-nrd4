import { MapPin, TruckFast } from "@medusajs/icons"

interface LiveMapProps {
  driverLocation?: { lat: number; lng: number }
  destinationLocation: { lat: number; lng: number }
  estimatedArrival?: string
}

export function LiveMap({ driverLocation, destinationLocation, estimatedArrival }: LiveMapProps) {
  // This is a placeholder - in production you'd use a real map library like Mapbox or Google Maps
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden">
      <div className="aspect-video relative flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
        <div className="text-center">
          <TruckFast className="w-12 h-12 text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600 font-medium">Live Tracking Map</p>
          <p className="text-sm text-gray-500 mt-1">
            Integrate with Mapbox or Google Maps for real-time tracking
          </p>
        </div>

        {/* Mock driver position */}
        {driverLocation && (
          <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
              <TruckFast className="w-5 h-5 text-white" />
            </div>
          </div>
        )}

        {/* Mock destination */}
        <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {estimatedArrival && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Estimated Arrival</span>
            <span className="font-semibold text-gray-900">{estimatedArrival}</span>
          </div>
        </div>
      )}
    </div>
  )
}
