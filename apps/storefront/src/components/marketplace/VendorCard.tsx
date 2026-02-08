import { Link } from "@tanstack/react-router"
import { Star, CheckCircle } from "@medusajs/icons"
import type { Vendor } from "../../lib/mock/marketplace"

interface VendorCardProps {
  vendor: Vendor
  countryCode: string
}

export function VendorCard({ vendor, countryCode }: VendorCardProps) {
  return (
    <Link
      to={`/${countryCode}/vendors/${vendor.handle}`}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[16/9] relative overflow-hidden bg-gray-100">
        {vendor.banner ? (
          <img
            src={vendor.banner}
            alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
        )}
        <div className="absolute bottom-4 left-4">
          <div className="w-16 h-16 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
            {vendor.logo ? (
              <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-600">
                {vendor.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {vendor.name}
          </h3>
          {vendor.verified && (
            <CheckCircle className="w-4 h-4 text-blue-500" />
          )}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{vendor.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{vendor.rating.toFixed(1)}</span>
            <span className="text-sm text-gray-500">({vendor.reviewCount})</span>
          </div>
          <span className="text-sm text-gray-500">{vendor.productCount} products</span>
        </div>
      </div>
    </Link>
  )
}
