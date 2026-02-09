import { createFileRoute } from "@tanstack/react-router"
import { useEvents } from "../../../lib/hooks/use-payloadcms"
import { EventCard } from "../../../components/content/EventCard"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/events/")({
  component: EventsPage,
})

function EventsPage() {
  const { countryCode } = Route.useParams()
  const { data: events, isLoading } = useEvents()

  const upcomingEvents = events?.filter((e) => new Date(e.date) >= new Date()) || []
  const pastEvents = events?.filter((e) => new Date(e.date) < new Date()) || []

  return (
    <div className="min-h-screen bg-city-dark">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden border-b border-city-steel/30">
        <div className="absolute inset-0 bg-gradient-to-b from-city-cyan/5 to-transparent" />
        <div className="content-container relative">
          <div className="max-w-3xl">
            <Badge variant="cyan" className="mb-4">Events</Badge>
            <h1 className="text-4xl md:text-5xl font-black text-city-white mb-4">
              Smart Home 
              <span className="text-city-cyan"> Events</span>
            </h1>
            <p className="text-xl text-city-gray">
              Join us for workshops, product launches, and industry conferences. 
              Learn from experts and experience the latest in smart home technology.
            </p>
          </div>
        </div>
      </section>

      <div className="content-container py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-city-navy rounded-lg animate-pulse border border-city-steel/30" />
            ))}
          </div>
        ) : (
          <>
            {upcomingEvents.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-city-cyan/20 border border-city-cyan/30 rounded flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-city-cyan" />
                  </div>
                  <h2 className="text-2xl font-bold text-city-white">Upcoming Events</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} countryCode={countryCode} />
                  ))}
                </div>
              </div>
            )}

            {pastEvents.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-city-slate border border-city-steel/30 rounded flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-city-muted" />
                  </div>
                  <h2 className="text-2xl font-bold text-city-muted">Past Events</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.slice(0, 6).map((event) => (
                    <EventCard key={event.id} event={event} countryCode={countryCode} />
                  ))}
                </div>
              </div>
            )}

            {events?.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-6 bg-city-slate border border-city-steel/30 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-city-muted" />
                </div>
                <h3 className="text-xl font-bold text-city-white mb-2">No Events Scheduled</h3>
                <p className="text-city-gray">Check back soon for upcoming workshops and product launches.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
