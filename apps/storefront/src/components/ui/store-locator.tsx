import { useState } from "react"
import { MapPin, Phone, Clock, ArrowRightMini } from "@medusajs/icons"
import { Button } from "./button"

interface Store {
  id: string
  name: string
  address: string
  city: string
  state: string
  postalCode: string
  phone: string
  hours: string
  distance?: string
  lat: number
  lng: number
  services?: string[]
}

interface StoreLocatorProps {
  stores: Store[]
  onSearch: (query: string) => void
  className?: string
}

export function StoreLocator({ stores, onSearch, className = "" }: StoreLocatorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  return (
    <div className={`flex flex-col lg:flex-row gap-6 ${className}`}>
      {/* List */}
      <div className="lg:w-1/2 space-y-4">
        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter city, state, or ZIP code"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {/* Results */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {stores.map(store => (
            <button
              key={store.id}
              onClick={() => setSelectedStore(store)}
              className={`w-full text-left p-4 border rounded-xl transition-all ${
                selectedStore?.id === store.id
                  ? "border-cyan-500 bg-cyan-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">{store.name}</h3>
                  <p className="text-sm text-gray-600">{store.address}</p>
                  <p className="text-sm text-gray-600">{store.city}, {store.state} {store.postalCode}</p>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Phone className="w-4 h-4" />
                      {store.phone}
                    </span>
                    {store.distance && (
                      <span className="text-cyan-600 font-medium">{store.distance}</span>
                    )}
                  </div>
                </div>
              </div>

              {store.services && store.services.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {store.services.map((service, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      {service}
                    </span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="lg:w-1/2">
        <div className="h-[400px] lg:h-full min-h-[400px] bg-gray-100 rounded-xl overflow-hidden relative">
          {/* Placeholder for map */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p>Map integration</p>
              <p className="text-sm">Google Maps or Mapbox</p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Store Details */}
      {selectedStore && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <h3 className="font-medium text-gray-900">{selectedStore.name}</h3>
          <p className="text-sm text-gray-600">{selectedStore.address}</p>
          <div className="flex gap-2 mt-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => window.open(`tel:${selectedStore.phone}`)}
            >
              <Phone className="w-4 h-4 mr-1" />
              Call
            </Button>
            <Button
              className="flex-1"
              onClick={() => window.open(`https://maps.google.com/?q=${selectedStore.lat},${selectedStore.lng}`)}
            >
              <ArrowRightMini className="w-4 h-4 mr-1" />
              Directions
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
