import { createFileRoute, Link } from "@tanstack/react-router"
import { Calendar, Clock, MapPin, User, Plus } from "@medusajs/icons"
import { useBookings } from "../../../lib/hooks/use-marketplace"
import { AccountLayout } from "../../../components/account/AccountSidebar"

export const Route = createFileRoute("/$countryCode/account/bookings")({
  component: BookingsPage,
})

function BookingsPage() {
  const { countryCode } = Route.useParams()
  const { data: bookings, isLoading } = useBookings()

  const upcoming = bookings?.filter((b) => new Date(b.date) >= new Date() && b.status !== "canceled") || []
  const past = bookings?.filter((b) => new Date(b.date) < new Date() || b.status === "canceled") || []

  const statusColors = {
    confirmed: "bg-green-500/20 text-green-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    canceled: "bg-red-500/20 text-red-400",
    completed: "bg-cyan-500/20 text-cyan-400",
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/bookings`}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">My Bookings</h1>
        <Link
          to={`/${countryCode}/services`}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400"
        >
          <Plus className="w-4 h-4" />
          Book a Service
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {upcoming.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Upcoming</h2>
              <div className="space-y-4">
                {upcoming.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-white">{booking.serviceName}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[booking.status]}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {booking.time}
                      </div>
                      {booking.providerName && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {booking.providerName}
                        </div>
                      )}
                      {booking.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {booking.location}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {past.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Past Bookings</h2>
              <div className="space-y-4 opacity-70">
                {past.slice(0, 5).map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white">{booking.serviceName}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[booking.status]}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {bookings?.length === 0 && (
            <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
              <p className="text-gray-400 mb-4">No bookings yet</p>
              <Link
                to={`/${countryCode}/services`}
                className="px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400"
              >
                Browse Services
              </Link>
            </div>
          )}
        </>
      )}
    </AccountLayout>
  )
}
