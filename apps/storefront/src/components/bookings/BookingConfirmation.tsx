import { CheckCircle, Calendar, Clock, MapPin, User } from "@medusajs/icons"

interface Booking {
  id: string
  serviceName: string
  providerName?: string
  date: string
  time: string
  duration: number
  location?: string
  total: number
  currency: string
}

interface BookingConfirmationProps {
  booking: Booking
  onAddToCalendar?: () => void
  onViewDetails?: () => void
}

export function BookingConfirmation({ booking, onAddToCalendar, onViewDetails }: BookingConfirmationProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
      <p className="text-gray-600 mb-6">
        Your booking reference is <span className="font-mono font-bold">{booking.id.slice(-8).toUpperCase()}</span>
      </p>

      <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">{booking.serviceName}</h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">
              {new Date(booking.date).toLocaleDateString("en", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">
              {booking.time} ({booking.duration} minutes)
            </span>
          </div>

          {booking.providerName && (
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{booking.providerName}</span>
            </div>
          )}

          {booking.location && (
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{booking.location}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <span className="text-gray-600">Total Paid</span>
          <span className="text-xl font-bold text-gray-900">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: booking.currency,
            }).format(booking.total)}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        {onAddToCalendar && (
          <button
            onClick={onAddToCalendar}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
          >
            Add to Calendar
          </button>
        )}
        {onViewDetails && (
          <button
            onClick={onViewDetails}
            className="flex-1 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  )
}
