import { Link } from "@tanstack/react-router"
import { Clock, MapPin } from "@medusajs/icons"

interface ServiceProduct {
  id: string
  title: string
  handle: string
  description: string
  duration: number
  price: number
  currency: string
  images?: string[]
  location?: string
}

interface ServiceCardProps {
  service: ServiceProduct
  countryCode: string
}

export function ServiceCard({ service, countryCode }: ServiceCardProps) {
  const thumbnail = service.images?.[0]
  
  return (
    <Link
      to={"/$countryCode/services/$handle" as any}
      params={{ countryCode, handle: service.handle } as any}
      className="group block bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all"
    >
      <div className="aspect-[16/9] bg-gray-800 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-900/50 to-blue-900/50" />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 mb-3">{service.description}</p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{service.duration} min</span>
          </div>
          {service.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{service.location}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: service.currency,
            }).format(service.price)}
          </span>
          <span className="text-sm text-cyan-400 font-medium group-hover:underline">
            Book Now
          </span>
        </div>
      </div>
    </Link>
  )
}
