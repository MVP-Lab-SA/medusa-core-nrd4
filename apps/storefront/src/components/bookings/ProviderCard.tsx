import { Link } from "@tanstack/react-router"
import { Star, CheckCircle } from "@medusajs/icons"

interface ServiceProvider {
  id: string
  name: string
  avatar?: string
  rating: number
  reviewCount: number
  verified?: boolean
  specialty?: string
  bio?: string
}

interface ProviderCardProps {
  provider: ServiceProvider
  countryCode: string
}

export function ProviderCard({ provider, countryCode }: ProviderCardProps) {
  return (
    <Link
      to={"/$countryCode/providers/$providerId" as any}
      params={{ countryCode, providerId: provider.id } as any}
      className="group block bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-800 overflow-hidden flex-shrink-0">
          {provider.avatar ? (
            <img src={provider.avatar} alt={provider.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-500">
              {provider.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-white truncate group-hover:text-cyan-400">
              {provider.name}
            </h4>
            {provider.verified && <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
          </div>
          {provider.specialty && (
            <p className="text-sm text-gray-500 mb-2">{provider.specialty}</p>
          )}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-white">{provider.rating.toFixed(1)}</span>
            <span className="text-sm text-gray-500">({provider.reviewCount} reviews)</span>
          </div>
        </div>
      </div>
      {provider.bio && (
        <p className="mt-3 text-sm text-gray-400 line-clamp-2">{provider.bio}</p>
      )}
    </Link>
  )
}
