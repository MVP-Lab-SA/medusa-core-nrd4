import { Link } from "@tanstack/react-router"
import { ArrowRight } from "@medusajs/icons"

interface CityService {
  id: string
  slug: string
  title: string
  description: string
  icon?: string
}

interface CityServiceCardProps {
  service: CityService
  countryCode: string
}

export function CityServiceCard({ service, countryCode }: CityServiceCardProps) {
  return (
    <Link
      to={`/${countryCode}/city-services/${service.slug}` as any}
      className="group block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all"
    >
      <div className="flex items-start gap-4">
        {service.icon && (
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">{service.icon}</span>
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{service.description}</p>
          <div className="flex items-center text-blue-600 text-sm font-medium group-hover:underline">
            Learn more
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}
