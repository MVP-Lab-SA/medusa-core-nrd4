import { createFileRoute } from "@tanstack/react-router"
import { useProviders } from "../../../lib/hooks/use-marketplace"
import { ProviderCard } from "../../../components/bookings/ProviderCard"

export const Route = createFileRoute("/$countryCode/providers/")({
  component: ProvidersPage,
})

function ProvidersPage() {
  const { countryCode } = Route.useParams()
  const { data: providers, isLoading } = useProviders()

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Service Providers</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find and book appointments with our verified service providers
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-gray-800 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : providers && providers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} countryCode={countryCode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No service providers found</p>
          </div>
        )}
      </div>
    </div>
  )
}
