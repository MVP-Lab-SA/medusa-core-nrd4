import { createFileRoute } from "@tanstack/react-router"
import { BookingConfirmation } from "@/components/bookings"
import { Calendar, Clock, MapPin, User, ArrowLeft, Phone, ChatBubble, XMark, ArrowPath } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/account/bookings/$id")({
  component: BookingDetailPage,
})

function BookingDetailPage() {
  const { id } = Route.useParams()

  // Mock booking data
  const booking = {
    id,
    service: "Haircut & Style",
    provider: {
      name: "Sarah Johnson",
      title: "Senior Stylist",
      phone: "+1 234 567 8900",
      avatar: "SJ",
    },
    date: "2024-02-15",
    time: "10:00 AM",
    duration: "45 min",
    location: "Downtown Studio",
    address: "123 Style Street, Suite 200",
    status: "confirmed",
    price: 65,
    notes: "Please arrive 5 minutes early. Consultation included.",
    confirmationCode: "BKG-2024-001234",
  }

  const statusConfig: Record<string, { label: string; color: string }> = {
    confirmed: { label: "Confirmed", color: "bg-emerald-500/20 text-emerald-400" },
    pending: { label: "Pending", color: "bg-amber-500/20 text-amber-400" },
    completed: { label: "Completed", color: "bg-cyan-500/20 text-cyan-400" },
    cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-400" },
  }

  const status = statusConfig[booking.status]

  return (
    <div className="container mx-auto px-4 py-8">
      <a href="/account/bookings" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Bookings
      </a>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
              {status.label}
            </span>
            <span className="text-sm text-gray-500">#{booking.confirmationCode}</span>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">{booking.service}</h1>
          
          <div className="flex flex-wrap gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {booking.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {booking.time} ({booking.duration})
            </div>
          </div>
        </div>

        {/* Provider */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Service Provider</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                {booking.provider.avatar}
              </div>
              <div>
                <p className="font-semibold text-white">{booking.provider.name}</p>
                <p className="text-gray-400">{booking.provider.title}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800" title="Call">
                <Phone className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800" title="Message">
                <MessageSquare className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Location</h2>
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium text-white">{booking.location}</p>
              <p className="text-gray-400">{booking.address}</p>
            </div>
          </div>
          <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Map View</span>
          </div>
          <button className="w-full mt-4 border border-gray-700 text-gray-300 py-2 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            Get Directions
          </button>
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6">
            <p className="text-cyan-300">{booking.notes}</p>
          </div>
        )}

        {/* Payment */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Payment Summary</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">{booking.service}</span>
            <span className="text-white">${booking.price}</span>
          </div>
          <div className="border-t border-gray-800 pt-3 mt-3 flex justify-between items-center">
            <span className="font-semibold text-white">Total</span>
            <span className="text-xl font-bold text-white">${booking.price}</span>
          </div>
        </div>

        {/* Actions */}
        {booking.status === "confirmed" && (
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800">
              <RefreshCw className="w-5 h-5" />
              Reschedule
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10">
              <X className="w-5 h-5" />
              Cancel Booking
            </button>
          </div>
        )}

        {booking.status === "completed" && (
          <button className="w-full py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400">
            Book Again
          </button>
        )}
      </div>
    </div>
  )
}
