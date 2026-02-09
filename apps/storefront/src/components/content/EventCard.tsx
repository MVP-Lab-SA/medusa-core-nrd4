import { Link } from "@tanstack/react-router"
import { MapPin, Clock } from "@medusajs/icons"

interface CityEvent {
  id: string
  slug: string
  title: string
  description: string
  date?: string
  startDate: string
  endDate?: string
  location: string | { name?: string; address?: string }
  featuredImage?: string
  category?: string
  isFree?: boolean
  price?: number
  ticketUrl?: string
}

interface EventCardProps {
  event: CityEvent
  countryCode: string
}

export function EventCard({ event, countryCode }: EventCardProps) {
  const eventDate = new Date(event.date || event.startDate)
  const isPast = eventDate < new Date()

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" })
  }

  const locationString = typeof event.location === "string" 
    ? event.location 
    : event.location?.name || event.location?.address || "TBA"

  return (
    <Link
      to={`/${countryCode}/events/${event.slug}` as any}
      className={`group block bg-city-navy border border-city-steel/30 rounded-lg overflow-hidden hover:border-city-cyan/50 transition-all ${
        isPast ? "opacity-60" : ""
      }`}
    >
      <div className="aspect-[16/9] bg-city-slate overflow-hidden relative">
        {event.featuredImage ? (
          <img
            src={event.featuredImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-city-cyan/20 to-city-slate" />
        )}
        {isPast && (
          <div className="absolute inset-0 bg-city-dark/70 flex items-center justify-center">
            <span className="px-4 py-2 bg-city-dark/90 text-city-muted font-medium rounded-lg border border-city-steel/30">
              Past Event
            </span>
          </div>
        )}
        {/* Date Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-city-dark/90 backdrop-blur-sm rounded-lg p-2 text-center border border-city-steel/30">
            <div className="text-xs font-bold text-city-cyan uppercase tracking-wider">
              {eventDate.toLocaleDateString("en", { month: "short" })}
            </div>
            <div className="text-2xl font-bold text-city-white">
              {eventDate.getDate()}
            </div>
          </div>
        </div>
        {/* Category Badge */}
        {event.category && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-city-cyan text-city-dark text-xs font-bold uppercase tracking-wider rounded">
              {event.category}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-city-white group-hover:text-city-cyan transition-colors mb-2 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-sm text-city-gray line-clamp-2 mb-4">
          {event.description}
        </p>
        <div className="space-y-2 text-sm text-city-muted">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-city-cyan" />
            <span>{formatTime(event.startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-city-cyan" />
            <span className="truncate">{locationString}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-city-steel/30 flex items-center justify-between">
          <span className={`font-bold ${event.isFree ? "text-green-400" : "text-city-white"}`}>
            {event.isFree ? "Free Event" : event.price ? `$${event.price}` : "TBA"}
          </span>
          {event.ticketUrl && !isPast && (
            <span className="text-city-cyan text-sm font-semibold group-hover:underline">
              Get Tickets
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
