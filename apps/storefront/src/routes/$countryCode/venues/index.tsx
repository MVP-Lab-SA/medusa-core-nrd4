import { createFileRoute } from "@tanstack/react-router"
import { useVenues } from "../../../lib/hooks/use-payloadcms"
import { VenueCard } from "../../../components/content/VenueCard"

export const Route = createFileRoute("/$countryCode/venues/")({
  component: VenuesPage,
})

function VenuesPage() {
  const { countryCode } = Route.useParams()
  const { data: venues, isLoading } = useVenues()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Venues & Places</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover restaurants, cafes, entertainment venues, and more
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : venues && venues.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} countryCode={countryCode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No venues found</p>
          </div>
        )}
      </div>
    </div>
  )
}
