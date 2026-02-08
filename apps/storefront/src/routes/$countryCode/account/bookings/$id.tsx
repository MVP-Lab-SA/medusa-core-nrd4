import { createFileRoute } from "@tanstack/react-router"
import { BookingConfirmation } from "~/components/bookings"
import { Calendar, Clock, MapPin, User, ArrowLeft, Phone, MessageSquare, X, RefreshCw } from "lucide-react"

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
    confirmed: { label: "Confirmed", color: "bg-green-100 text-green-700" },
    pending: { label: "Pending", color: "bg-amber-100 text-amber-700" },
    completed: { label: "Completed", color: "bg-blue-100 text-blue-700" },
    cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700" },
  }

  const status = statusConfig[booking.status]

  return (
    <div className="container mx-auto px-4 py-8">
      <a href="/account/bookings" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Bookings
      </a>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
              {status.label}
            </span>
            <span className="text-sm text-gray-500">#{booking.confirmationCode}</span>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{booking.service}</h1>
          
          <div className="flex flex-wrap gap-4 text-gray-600">
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
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Service Provider</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                {booking.provider.avatar}
              </div>
              <div>
                <p className="font-semibold">{booking.provider.name}</p>
                <p className="text-gray-600">{booking.provider.title}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 border rounded-lg hover:bg-gray-50" title="Call">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 border rounded-lg hover:bg-gray-50" title="Message">
                <MessageSquare className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Location</h2>
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium">{booking.location}</p>
              <p className="text-gray-600">{booking.address}</p>
            </div>
          </div>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Map View</span>
          </div>
          <button className="w-full mt-4 border py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            Get Directions
          </button>
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-blue-800">{booking.notes}</p>
          </div>
        )}

        {/* Payment */}
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">{booking.service}</span>
            <span>${booking.price}</span>
          </div>
          <div className="border-t pt-3 mt-3 flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold">${booking.price}</span>
          </div>
        </div>

        {/* Actions */}
        {booking.status === "confirmed" && (
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border rounded-lg hover:bg-gray-50">
              <RefreshCw className="w-5 h-5" />
              Reschedule
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50">
              <X className="w-5 h-5" />
              Cancel Booking
            </button>
          </div>
        )}

        {booking.status === "completed" && (
          <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Book Again
          </button>
        )}
      </div>
    </div>
  )
}
