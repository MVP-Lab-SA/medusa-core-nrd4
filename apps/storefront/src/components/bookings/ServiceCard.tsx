import { Link } from "@tanstack/react-router"
import { Clock, MapPin } from "@medusajs/icons"
import type { ServiceProduct } from "../../lib/mock/marketplace"

interface ServiceCardProps {
  service: ServiceProduct
  countryCode: string
}

export function ServiceCard({ service, countryCode }: ServiceCardProps) {
  return (
    <Link
      to={`/${countryCode}/services/${service.handle}`}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
        {service.thumbnail ? (
          <img
            src={service.thumbnail}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
          {service.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{service.description}</p>
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
          <span className="text-lg font-bold text-gray-900">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: service.currency,
            }).format(service.price)}
          </span>
          <span className="text-sm text-blue-600 font-medium group-hover:underline">
            Book Now
          </span>
        </div>
      </div>
    </Link>
  )
}
