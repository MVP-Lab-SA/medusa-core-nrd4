/**
 * POI (Points of Interest) Components
 * 
 * Components for displaying POI data from Payload CMS.
 */

import React from 'react'
import { Link } from '@tanstack/react-router'
import { StarSolid, MapPin, Phone, Globe, Clock } from '@medusajs/icons'
import type { POI } from '@/lib/payload/types'

// =============================================================================
// POI CARD
// =============================================================================

interface POICardProps {
  poi: POI
  countryCode: string
  variant?: 'default' | 'compact' | 'featured'
}

export function POICard({ poi, countryCode, variant = 'default' }: POICardProps) {
  const href = `/${countryCode}/poi/${poi.slug}`
  const imageUrl = poi.images?.[0] 
    ? (typeof poi.images[0] === 'string' ? poi.images[0] : poi.images[0].url)
    : null

  if (variant === 'compact') {
    return (
      <Link to={href as any} className="flex gap-3 p-3 hover:bg-city-slate rounded-lg transition-colors">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={poi.name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
        )}
        <div className="min-w-0">
          <h3 className="font-medium text-city-white truncate">{poi.name}</h3>
          {poi.primaryCategory && (
            <span className="text-xs text-city-gray capitalize">{poi.primaryCategory}</span>
          )}
          {poi.rating && (
            <div className="flex items-center gap-1 mt-1">
              <StarSolid className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-city-gray">{poi.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </Link>
    )
  }

  return (
    <Link to={href as any} className="group block">
      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-city-slate mb-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={poi.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-city-gray">
            <MapPin className="w-8 h-8" />
          </div>
        )}
      </div>
      <div>
        {poi.primaryCategory && (
          <span className="text-xs text-city-lime uppercase tracking-wider">
            {poi.primaryCategory}
          </span>
        )}
        <h3 className="font-medium text-city-white group-hover:text-city-lime transition-colors mt-1">
          {poi.name}
        </h3>
        {poi.shortAddress && (
          <p className="text-sm text-city-gray mt-1">{poi.shortAddress}</p>
        )}
        {poi.rating && (
          <div className="flex items-center gap-1 mt-2">
            <StarSolid className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-city-gray">
              {poi.rating.toFixed(1)}
              {poi.totalReviews && ` (${poi.totalReviews})`}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}

// =============================================================================
// POI GRID
// =============================================================================

interface POIGridProps {
  pois: POI[]
  countryCode: string
  columns?: 2 | 3 | 4
}

export function POIGrid({ pois, countryCode, columns = 3 }: POIGridProps) {
  if (!pois?.length) {
    return (
      <div className="text-center py-12 text-city-gray">
        No locations found.
      </div>
    )
  }

  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {pois.map((poi) => (
        <POICard key={poi.id} poi={poi} countryCode={countryCode} />
      ))}
    </div>
  )
}

// =============================================================================
// POI DETAIL
// =============================================================================

interface POIDetailProps {
  poi: POI
  countryCode: string
}

export function POIDetail({ poi }: POIDetailProps) {
  const mainImage = poi.images?.[0]
    ? (typeof poi.images[0] === 'string' ? poi.images[0] : poi.images[0].url)
    : null

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Image */}
      {mainImage && (
        <div className="aspect-video rounded-xl overflow-hidden mb-8">
          <img
            src={mainImage}
            alt={poi.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        {poi.primaryCategory && (
          <span className="inline-block px-3 py-1 text-xs font-medium text-city-lime bg-city-lime/10 rounded-full mb-3 uppercase tracking-wider">
            {poi.primaryCategory}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-city-white mb-4">
          {poi.name}
        </h1>
        {poi.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarSolid
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(poi.rating!) ? 'text-yellow-400' : 'text-city-steel'
                  }`}
                />
              ))}
            </div>
            <span className="text-city-gray">
              {poi.rating.toFixed(1)}
              {poi.totalReviews && ` (${poi.totalReviews} reviews)`}
            </span>
          </div>
        )}
        {poi.description && (
          <p className="text-city-gray text-lg">{poi.description}</p>
        )}
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-city-white">Contact</h2>
          {poi.formattedAddress && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-city-lime flex-shrink-0 mt-0.5" />
              <span className="text-city-gray">{poi.formattedAddress}</span>
            </div>
          )}
          {poi.phone && (
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-city-lime flex-shrink-0" />
              <a href={`tel:${poi.phone}`} className="text-city-gray hover:text-city-white">
                {poi.phone}
              </a>
            </div>
          )}
          {poi.website && (
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-city-lime flex-shrink-0" />
              <a
                href={poi.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-city-gray hover:text-city-white truncate"
              >
                {poi.website}
              </a>
            </div>
          )}
        </div>

        {/* Hours */}
        {poi.openingHours && (
          <div>
            <h2 className="text-lg font-semibold text-city-white mb-4">Hours</h2>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-city-lime flex-shrink-0 mt-0.5" />
              <div className="text-city-gray">
                {typeof poi.openingHours === 'object' && (
                  <pre className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(poi.openingHours, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Gallery */}
      {poi.images && poi.images.length > 1 && (
        <div>
          <h2 className="text-lg font-semibold text-city-white mb-4">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {poi.images.slice(1).map((image, index) => {
              const url = typeof image === 'string' ? image : image.url
              return (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// =============================================================================
// POI LIST
// =============================================================================

interface POIListProps {
  pois: POI[]
  countryCode: string
}

export function POIList({ pois, countryCode }: POIListProps) {
  if (!pois?.length) {
    return (
      <div className="text-center py-12 text-city-gray">
        No locations found.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {pois.map((poi) => (
        <POICard key={poi.id} poi={poi} countryCode={countryCode} variant="compact" />
      ))}
    </div>
  )
}
