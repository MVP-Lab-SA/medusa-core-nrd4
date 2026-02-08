import { createFileRoute } from "@tanstack/react-router"
import { useEvents } from "../../../lib/hooks/use-payloadcms"
import { EventCard } from "../../../components/content/EventCard"

export const Route = createFileRoute("/$countryCode/events/")({
  component: EventsPage,
})

function EventsPage() {
  const { countryCode } = Route.useParams()
  const { data: events, isLoading } = useEvents()

  const upcomingEvents = events?.filter((e) => new Date(e.date) >= new Date()) || []
  const pastEvents = events?.filter((e) => new Date(e.date) < new Date()) || []

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">City Events</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover local events, festivals, and community gatherings
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {upcomingEvents.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} countryCode={countryCode} />
                  ))}
                </div>
              </div>
            )}

            {pastEvents.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Events</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastEvents.slice(0, 6).map((event) => (
                    <EventCard key={event.id} event={event} countryCode={countryCode} />
                  ))}
                </div>
              </div>
            )}

            {events?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No events found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
