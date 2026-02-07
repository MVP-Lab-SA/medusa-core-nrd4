import { useState } from "react"
import { MapPin, Clock, Phone, Check, XMark } from "@medusajs/icons"
import { Button } from "./button"

interface Store {
  id: string
  name: string
  address: string
  city: string
  distance?: string
  phone?: string
  hours?: string
  inStock: boolean
  quantity?: number
}

interface StoreAvailabilityProps {
  productName: string
  stores: Store[]
  onSelectStore?: (storeId: string) => void
  className?: string
}

export function StoreAvailability({
  productName,
  stores,
  onSelectStore,
  className = ""
}: StoreAvailabilityProps) {
  const [zipCode, setZipCode] = useState("")
  const [searchedZip, setSearchedZip] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [selectedStore, setSelectedStore] = useState<string | null>(null)

  const handleSearch = () => {
    if (zipCode.length >= 5) {
      setSearchedZip(zipCode)
      setShowResults(true)
    }
  }

  const handleSelectStore = (storeId: string) => {
    setSelectedStore(storeId)
    onSelectStore?.(storeId)
  }

  const inStockCount = stores.filter(s => s.inStock).length

  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-medium text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Check Store Availability
        </h3>
      </div>

      <div className="p-4">
        {/* Search */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
            placeholder="Enter ZIP code"
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <Button onClick={handleSearch} disabled={zipCode.length < 5}>
            Find Stores
          </Button>
        </div>

        {showResults && (
          <>
            {/* Summary */}
            <div className="mb-4 p-3 bg-cyan-50 rounded-lg">
              <p className="text-sm text-cyan-800">
                <strong>{inStockCount}</strong> of {stores.length} stores near {searchedZip} have{" "}
                <strong>{productName}</strong> in stock
              </p>
            </div>

            {/* Store List */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {stores.map(store => (
                <div
                  key={store.id}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedStore === store.id
                      ? "border-cyan-500 bg-cyan-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900">{store.name}</p>
                        {store.distance && (
                          <span className="text-xs text-gray-500">{store.distance}</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{store.address}</p>
                      <p className="text-sm text-gray-600">{store.city}</p>
                      
                      {store.hours && (
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {store.hours}
                        </p>
                      )}
                      {store.phone && (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {store.phone}
                        </p>
                      )}
                    </div>

                    <div className="text-right flex-shrink-0">
                      {store.inStock ? (
                        <div className="flex items-center gap-1 text-green-600 mb-2">
                          <Check className="w-4 h-4" />
                          <span className="text-sm font-medium">In Stock</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-500 mb-2">
                          <XMark className="w-4 h-4" />
                          <span className="text-sm font-medium">Out of Stock</span>
                        </div>
                      )}
                      
                      {store.inStock && store.quantity !== undefined && (
                        <p className="text-xs text-gray-500 mb-2">
                          {store.quantity} available
                        </p>
                      )}

                      {store.inStock && (
                        <button
                          onClick={() => handleSelectStore(store.id)}
                          className={`text-sm font-medium ${
                            selectedStore === store.id
                              ? "text-cyan-600"
                              : "text-gray-600 hover:text-cyan-600"
                          }`}
                        >
                          {selectedStore === store.id ? "Selected" : "Select"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedStore && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button className="w-full">
                  Reserve for Pickup
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Usually ready within 2 hours
                </p>
              </div>
            )}
          </>
        )}

        {!showResults && (
          <p className="text-sm text-gray-500 text-center py-4">
            Check if this item is available at a store near you
          </p>
        )}
      </div>
    </div>
  )
}
