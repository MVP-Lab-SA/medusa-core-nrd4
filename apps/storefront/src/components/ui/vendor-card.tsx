import { Link } from "@tanstack/react-router"
import { Star, CheckCircle, Users, ShoppingBag } from "@medusajs/icons"
import type { Vendor } from "@/lib/hooks/use-marketplace"

interface VendorCardProps {
  vendor: Vendor
  countryCode: string
}

export function VendorCard({ vendor, countryCode }: VendorCardProps) {
  return (
    <Link
      to="/$countryCode/vendors/$handle"
      params={{ countryCode, handle: vendor.slug }}
      className="group block bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover:border-cyan-500/50 transition-all"
    >
      {/* Banner */}
      <div className="relative h-32 bg-gradient-to-br from-cyan-600/20 to-blue-600/20">
        {vendor.banner ? (
          <img
            src={vendor.banner}
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-600/30 to-blue-600/30" />
        )}
        {/* Logo overlay */}
        <div className="absolute -bottom-8 left-4">
          {vendor.logo ? (
            <img
              src={vendor.logo}
              alt={vendor.name}
              className="w-16 h-16 rounded-full border-4 border-gray-900 bg-gray-800"
            />
          ) : (
            <div className="w-16 h-16 rounded-full border-4 border-gray-900 bg-gray-800 flex items-center justify-center">
              <span className="text-2xl font-bold text-cyan-400">
                {vendor.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        {/* Verified badge */}
        {vendor.isVerified && (
          <div className="absolute top-2 right-2 bg-cyan-500 text-black px-2 py-1 rounded-full text-xs flex items-center gap-1 font-medium">
            <CheckCircle className="w-3 h-3" />
            Verified
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-10 pb-4 px-4">
        <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
          {vendor.name}
        </h3>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{vendor.description}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium text-white">{vendor.rating}</span>
            <span className="text-gray-500">({vendor.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <ShoppingBag className="w-4 h-4" />
            <span>{vendor.productCount} products</span>
          </div>
        </div>

        {/* Categories */}
        {vendor.categories && vendor.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {vendor.categories.slice(0, 3).map((category) => (
              <span
                key={category}
                className="px-2 py-0.5 bg-gray-800 text-gray-400 text-xs rounded"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Location */}
        {vendor.location && (
          <p className="text-xs text-gray-500 mt-2">{vendor.location}</p>
        )}
      </div>
    </Link>
  )
}
