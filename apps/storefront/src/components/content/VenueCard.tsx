import { Link } from "@tanstack/react-router"
import { Star, MapPin, Phone, ChevronRight } from "@medusajs/icons"
import { useState } from "react"

interface VenueProfile {
  id: string
  slug: string
  name: string
  type: string
  description?: string
  address: string
  phone?: string
  images?: string[]
  rating?: number
  reviewCount?: number
  priceRange?: string
  features?: string[]
}

interface VenueCardProps {
  venue: VenueProfile
  countryCode: string
}

export function VenueCard({ venue, countryCode }: VenueCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = venue.images || []
  const hasMultipleImages = images.length > 1

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <Link
      to={`/${countryCode}/venues/${venue.slug}` as any}
      className="group block bg-city-navy border border-city-steel/30 rounded-lg overflow-hidden hover:border-city-cyan/50 transition-all"
    >
      {/* Image Carousel */}
      <div className="aspect-[16/9] bg-city-slate overflow-hidden relative">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={venue.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Image navigation */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-city-dark/80 hover:bg-city-dark text-city-gray hover:text-city-cyan rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-city-dark/80 hover:bg-city-dark text-city-gray hover:text-city-cyan rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                {/* Dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        idx === currentImageIndex ? "bg-city-cyan w-4" : "bg-city-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-city-cyan/20 to-city-slate" />
        )}
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-city-cyan text-city-dark text-xs font-bold uppercase tracking-wider rounded">
            {venue.type}
          </span>
        </div>

        {/* Price Range */}
        {venue.priceRange && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-city-dark/80 text-city-white text-sm font-bold rounded">
              {venue.priceRange}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Rating */}
        {venue.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-city-white">{venue.rating.toFixed(1)}</span>
            </div>
            {venue.reviewCount && (
              <span className="text-city-muted text-sm">({venue.reviewCount} reviews)</span>
            )}
          </div>
        )}

        {/* Name */}
        <h3 className="font-bold text-city-white group-hover:text-city-cyan transition-colors mb-2 text-lg">
          {venue.name}
        </h3>

        {/* Description */}
        {venue.description && (
          <p className="text-sm text-city-gray line-clamp-2 mb-4">
            {venue.description}
          </p>
        )}

        {/* Location & Phone */}
        <div className="space-y-2 text-sm text-city-muted">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-city-cyan flex-shrink-0" />
            <span className="truncate">{venue.address}</span>
          </div>
          {venue.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-city-cyan flex-shrink-0" />
              <span>{venue.phone}</span>
            </div>
          )}
        </div>

        {/* Features */}
        {venue.features && venue.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-city-steel/30">
            {venue.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 bg-city-slate text-city-gray text-xs rounded"
              >
                {feature}
              </span>
            ))}
            {venue.features.length > 3 && (
              <span className="px-2 py-1 text-city-cyan text-xs">
                +{venue.features.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
