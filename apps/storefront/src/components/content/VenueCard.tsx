import { Link } from "@tanstack/react-router"
import { Star, MapPin, Phone } from "@medusajs/icons"
import type { VenueProfile } from "../../lib/mock/payloadcms"

interface VenueCardProps {
  venue: VenueProfile
  countryCode: string
}

export function VenueCard({ venue, countryCode }: VenueCardProps) {
  return (
    <Link
      to={`/${countryCode}/venues/${venue.slug}`}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
        {venue.images?.[0] ? (
          <img
            src={venue.images[0]}
            alt={venue.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100" />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">
            {venue.type}
          </span>
          {venue.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium text-gray-600">{venue.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
          {venue.name}
        </h3>
        <div className="space-y-1 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{venue.address}</span>
          </div>
          {venue.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{venue.phone}</span>
            </div>
          )}
        </div>
        {venue.priceRange && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-gray-600">{venue.priceRange}</span>
          </div>
        )}
      </div>
    </Link>
  )
}
