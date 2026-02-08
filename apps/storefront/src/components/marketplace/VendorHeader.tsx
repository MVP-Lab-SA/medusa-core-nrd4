import { Star, CheckCircle, MapPin } from "@medusajs/icons"
import type { Vendor } from "../../lib/mock/marketplace"

interface VendorHeaderProps {
  vendor: Vendor
}

export function VendorHeader({ vendor }: VendorHeaderProps) {
  return (
    <div className="relative">
      <div className="h-48 md:h-64 bg-gray-200 overflow-hidden">
        {vendor.banner ? (
          <img src={vendor.banner} alt={vendor.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
        )}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 sm:-mt-20 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
              {vendor.logo ? (
                <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-600">
                  {vendor.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="mt-4 sm:mt-0 sm:pb-2 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{vendor.name}</h1>
                {vendor.verified && <CheckCircle className="w-6 h-6 text-blue-500" />}
              </div>
              <p className="text-gray-600 mb-2">{vendor.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{vendor.rating.toFixed(1)}</span>
                  <span className="text-gray-500">({vendor.reviewCount} reviews)</span>
                </div>
                <span className="text-gray-500">{vendor.productCount} products</span>
                {vendor.location && (
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {vendor.location}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
