import { createFileRoute } from "@tanstack/react-router"
import { useVenues } from "../../../lib/hooks/use-payloadcms"
import { VenueCard } from "../../../components/content/VenueCard"
import { Badge } from "@/components/ui/badge"
import { Buildings } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/venues/")({
  component: VenuesPage,
})

function VenuesPage() {
  const { countryCode } = Route.useParams()
  const { data: venues, isLoading } = useVenues()

  return (
    <div className="min-h-screen bg-city-dark">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden border-b border-city-steel/30">
        <div className="absolute inset-0 bg-gradient-to-b from-city-cyan/5 to-transparent" />
        <div className="content-container relative">
          <div className="max-w-3xl">
            <Badge variant="cyan" className="mb-4">Locations</Badge>
            <h1 className="text-4xl md:text-5xl font-black text-city-white mb-4">
              Experience Centers &
              <span className="text-city-cyan"> Showrooms</span>
            </h1>
            <p className="text-xl text-city-gray">
              Visit our showrooms and training facilities to experience smart home technology 
              firsthand. See live demonstrations and get hands-on with our products.
            </p>
          </div>
        </div>
      </section>

      <div className="content-container py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-city-navy rounded-lg animate-pulse border border-city-steel/30" />
            ))}
          </div>
        ) : venues && venues.length > 0 ? (
          <>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-city-cyan/20 border border-city-cyan/30 rounded flex items-center justify-center">
                <Buildings className="w-5 h-5 text-city-cyan" />
              </div>
              <h2 className="text-2xl font-bold text-city-white">Our Locations</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} countryCode={countryCode} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-6 bg-city-slate border border-city-steel/30 rounded-full flex items-center justify-center">
              <Buildings className="w-8 h-8 text-city-muted" />
            </div>
            <h3 className="text-xl font-bold text-city-white mb-2">No Venues Found</h3>
            <p className="text-city-gray">Check back soon for new locations near you.</p>
          </div>
        )}
      </div>
    </div>
  )
}
