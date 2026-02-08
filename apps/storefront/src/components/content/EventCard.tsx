import { Link } from "@tanstack/react-router"
import { MapPin, Clock } from "@medusajs/icons"
import type { CityEvent } from "../../lib/mock/payloadcms"

interface EventCardProps {
  event: CityEvent
  countryCode: string
}

export function EventCard({ event, countryCode }: EventCardProps) {
  const eventDate = new Date(event.date || event.startDate)
  const isPast = eventDate < new Date()

  // Format time from date
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" })
  }

  // Get location string from object or string
  const locationString = typeof event.location === "string" 
    ? event.location 
    : event.location?.name || event.location?.address || "TBA"

  return (
    <Link
      to={`/${countryCode}/events/${event.slug}`}
      className={`group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
        isPast ? "opacity-60" : ""
      }`}
    >
      <div className="aspect-[16/9] bg-gray-100 overflow-hidden relative">
        {event.featuredImage ? (
          <img
            src={event.featuredImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-100 to-blue-100" />
        )}
        {isPast && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-4 py-2 bg-black/70 text-white font-medium rounded-lg">
              Past Event
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <div className="bg-white rounded-lg p-2 text-center shadow-md">
            <div className="text-sm font-bold text-cyan-600">
              {eventDate.toLocaleDateString("en", { month: "short" })}
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {eventDate.getDate()}
            </div>
          </div>
        </div>
        {event.category && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-cyan-500 text-white text-xs font-medium rounded">
              {event.category}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 group-hover:text-cyan-600 transition-colors mb-2 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {event.description}
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{formatTime(event.startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{locationString}</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className={`font-semibold ${event.isFree ? "text-green-600" : "text-gray-900"}`}>
            {event.isFree ? "Free" : event.price ? `$${event.price}` : "TBA"}
          </span>
          {event.ticketUrl && !isPast && (
            <span className="text-cyan-600 text-sm font-medium">Get Tickets</span>
          )}
        </div>
      </div>
    </Link>
  )
}
