import { Link } from "@tanstack/react-router"
import { Star, CheckCircle, Users } from "@medusajs/icons"
import type { Vendor } from "@/lib/mock/marketplace"

interface VendorCardProps {
  vendor: Vendor
  countryCode: string
}

export function VendorCard({ vendor, countryCode }: VendorCardProps) {
  return (
    <Link
      to="/$countryCode/vendors/$handle"
      params={{ countryCode, handle: vendor.handle }}
      className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Banner */}
      <div className="relative h-32 bg-gray-100">
        <img
          src={vendor.banner}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        {/* Logo overlay */}
        <div className="absolute -bottom-8 left-4">
          <img
            src={vendor.logo}
            alt={vendor.name}
            className="w-16 h-16 rounded-full border-4 border-white bg-white"
          />
        </div>
        {/* Verified badge */}
        {vendor.verified && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Verified
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-10 pb-4 px-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {vendor.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{vendor.description}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium">{vendor.rating}</span>
            <span className="text-gray-400">({vendor.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Users className="w-4 h-4" />
            <span>{vendor.followerCount.toLocaleString()} followers</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 mt-3">
          {vendor.categories.slice(0, 3).map((category) => (
            <span
              key={category}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
