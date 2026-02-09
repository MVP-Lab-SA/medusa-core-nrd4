/**
 * POI (Points of Interest) Components
 * 
 * Components for displaying POI data from Payload CMS.
 */

import React from 'react';
import type { POI, POICategory } from '@/lib/payload/types';

// =============================================================================
// POI CARD
// =============================================================================

interface POICardProps {
  poi: POI;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export function POICard({ poi, variant = 'default', className = '' }: POICardProps) {
  const categoryLabels: Record<POICategory, string> = {
    attraction: 'Attraction',
    restaurant: 'Restaurant',
    hotel: 'Hotel',
    shopping: 'Shopping',
    transport: 'Transport',
    service: 'Service',
    event: 'Event',
    healthcare: 'Healthcare',
    education: 'Education',
    government: 'Government',
  };

  const categoryColors: Record<POICategory, string> = {
    attraction: 'bg-purple-100 text-purple-800',
    restaurant: 'bg-orange-100 text-orange-800',
    hotel: 'bg-blue-100 text-blue-800',
    shopping: 'bg-pink-100 text-pink-800',
    transport: 'bg-green-100 text-green-800',
    service: 'bg-gray-100 text-gray-800',
    event: 'bg-red-100 text-red-800',
    healthcare: 'bg-teal-100 text-teal-800',
    education: 'bg-indigo-100 text-indigo-800',
    government: 'bg-yellow-100 text-yellow-800',
  };

  if (variant === 'compact') {
    return (
      <a
        href={`/poi/${poi.slug}`}
        className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${className}`}
      >
        {poi.media?.featured && (
          <img
            src={poi.media.featured.url}
            alt={poi.name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{poi.name}</h3>
          <p className="text-sm text-gray-500 truncate">{poi.location?.address}</p>
        </div>
        {poi.rating && (
          <div className="text-sm font-medium text-yellow-600">
            {poi.rating.average.toFixed(1)}
          </div>
        )}
      </a>
    );
  }

  if (variant === 'featured') {
    return (
      <a
        href={`/poi/${poi.slug}`}
        className={`group block rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow ${className}`}
      >
        {poi.media?.featured && (
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={poi.media.featured.url}
              alt={poi.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6">
          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${categoryColors[poi.category]}`}>
            {categoryLabels[poi.category]}
          </span>
          <h3 className="text-xl font-semibold mt-3 group-hover:text-primary transition-colors">
            {poi.name}
          </h3>
          {poi.description && (
            <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
              {poi.description}
            </p>
          )}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <span className="text-sm text-gray-500">{poi.location?.address}</span>
            {poi.rating && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium">{poi.rating.average.toFixed(1)}</span>
                <span className="text-sm text-gray-400">({poi.rating.count})</span>
              </div>
            )}
          </div>
        </div>
      </a>
    );
  }

  // Default variant
  return (
    <a
      href={`/poi/${poi.slug}`}
      className={`group block rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow ${className}`}
    >
      {poi.media?.featured && (
        <div className="aspect-video overflow-hidden">
          <img
            src={poi.media.featured.url}
            alt={poi.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${categoryColors[poi.category]}`}>
          {categoryLabels[poi.category]}
        </span>
        <h3 className="text-lg font-semibold mt-2 group-hover:text-primary transition-colors">
          {poi.name}
        </h3>
        {poi.location?.address && (
          <p className="text-sm text-gray-500 mt-1 truncate">{poi.location.address}</p>
        )}
        {poi.rating && (
          <div className="flex items-center gap-1 mt-2">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm">{poi.rating.average.toFixed(1)}</span>
          </div>
        )}
      </div>
    </a>
  );
}

// =============================================================================
// POI GRID
// =============================================================================

interface POIGridProps {
  pois: POI[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export function POIGrid({ pois, columns = 3, variant = 'default', className = '' }: POIGridProps) {
  const columnClasses: Record<number, string> = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  if (pois.length === 0) {
    return (
      <div className={`text-center py-12 text-gray-500 ${className}`}>
        No points of interest found.
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${columnClasses[columns]} ${className}`}>
      {pois.map((poi) => (
        <POICard key={poi.id} poi={poi} variant={variant} />
      ))}
    </div>
  );
}

// =============================================================================
// POI LIST
// =============================================================================

interface POIListProps {
  pois: POI[];
  className?: string;
}

export function POIList({ pois, className = '' }: POIListProps) {
  if (pois.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-500 ${className}`}>
        No points of interest found.
      </div>
    );
  }

  return (
    <div className={`divide-y divide-gray-200 dark:divide-gray-700 ${className}`}>
      {pois.map((poi) => (
        <POICard key={poi.id} poi={poi} variant="compact" />
      ))}
    </div>
  );
}

// =============================================================================
// POI DETAIL
// =============================================================================

interface POIDetailProps {
  poi: POI;
  className?: string;
}

export function POIDetail({ poi, className = '' }: POIDetailProps) {
  const dayLabels: Record<string, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  };

  return (
    <article className={className}>
      {/* Hero Image */}
      {poi.media?.featured && (
        <div className="aspect-[21/9] overflow-hidden rounded-2xl mb-8">
          <img
            src={poi.media.featured.url}
            alt={poi.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{poi.name}</h1>
        {poi.description && (
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {poi.description}
          </p>
        )}
        {poi.rating && (
          <div className="flex items-center gap-2 mt-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${star <= Math.round(poi.rating!.average) ? 'text-yellow-500' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-medium">{poi.rating.average.toFixed(1)}</span>
            <span className="text-gray-500">({poi.rating.count} reviews)</span>
          </div>
        )}
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          {poi.media?.gallery && poi.media.gallery.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {poi.media.gallery.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.alt || `${poi.name} photo ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Amenities */}
          {poi.amenities && poi.amenities.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {poi.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Location Card */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Location</h3>
            <address className="not-italic text-gray-600 dark:text-gray-400">
              {poi.location?.address}
              {poi.location?.unit && <span>, Unit {poi.location.unit}</span>}
              {poi.location?.floor && <span>, Floor {poi.location.floor}</span>}
            </address>
            {poi.location?.coordinates && (
              <a
                href={`https://maps.google.com/?q=${poi.location.coordinates.lat},${poi.location.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-primary hover:underline text-sm"
              >
                Open in Maps
              </a>
            )}
          </div>

          {/* Contact Card */}
          {poi.contact && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                {poi.contact.phone && (
                  <li>
                    <a href={`tel:${poi.contact.phone}`} className="text-primary hover:underline">
                      {poi.contact.phone}
                    </a>
                  </li>
                )}
                {poi.contact.email && (
                  <li>
                    <a href={`mailto:${poi.contact.email}`} className="text-primary hover:underline">
                      {poi.contact.email}
                    </a>
                  </li>
                )}
                {poi.contact.website && (
                  <li>
                    <a
                      href={poi.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Website
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Hours Card */}
          {poi.hours && poi.hours.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Hours</h3>
              <ul className="space-y-2 text-sm">
                {poi.hours.map((hours, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {dayLabels[hours.day]}
                    </span>
                    <span>
                      {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}

// =============================================================================
// POI MAP (Placeholder)
// =============================================================================

interface POIMapProps {
  pois: POI[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  className?: string;
}

export function POIMap({ pois, center, zoom = 13, height = '400px', className = '' }: POIMapProps) {
  // This is a placeholder - actual map integration would use Mapbox, Google Maps, or Leaflet
  const mapCenter = center || (pois[0]?.location?.coordinates);

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center ${className}`}
      style={{ height }}
    >
      <div className="text-center text-gray-500">
        <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p>Map: {pois.length} locations</p>
        {mapCenter && (
          <p className="text-xs mt-1">
            Center: {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)}
          </p>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export type { POICardProps, POIGridProps, POIListProps, POIDetailProps, POIMapProps };
