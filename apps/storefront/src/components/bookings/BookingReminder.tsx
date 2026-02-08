import { Calendar, Clock, MapPin, Bell } from "@medusajs/icons"

interface BookingReminderProps {
  booking: {
    id: string
    serviceName: string
    providerName: string
    date: string
    time: string
    location?: string
    duration: number
  }
  onAddToCalendar?: () => void
  onReschedule?: () => void
  onCancel?: () => void
}

export function BookingReminder({ booking, onAddToCalendar, onReschedule, onCancel }: BookingReminderProps) {
  const bookingDate = new Date(booking.date)
  const now = new Date()
  const hoursUntil = Math.round((bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60))
  const daysUntil = Math.round(hoursUntil / 24)

  const getTimeUntilText = () => {
    if (hoursUntil < 0) return 'Past'
    if (hoursUntil < 1) return 'Less than 1 hour'
    if (hoursUntil < 24) return `${hoursUntil} hours`
    if (daysUntil === 1) return 'Tomorrow'
    return `${daysUntil} days`
  }

  const isUpcoming = hoursUntil > 0 && hoursUntil <= 48

  return (
    <div className={`border rounded-lg overflow-hidden ${
      isUpcoming ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'
    }`}>
      {isUpcoming && (
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 text-sm">
          <Bell className="w-4 h-4" />
          <span>Coming up in {getTimeUntilText()}</span>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{booking.serviceName}</h3>
        <p className="text-sm text-gray-500">with {booking.providerName}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">
              {bookingDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">
              {booking.time} ({booking.duration} min)
            </span>
          </div>
          
          {booking.location && (
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{booking.location}</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
          {onAddToCalendar && (
            <button
              onClick={onAddToCalendar}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Add to Calendar
            </button>
          )}
          {onReschedule && hoursUntil > 24 && (
            <button
              onClick={onReschedule}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Reschedule
            </button>
          )}
          {onCancel && hoursUntil > 24 && (
            <button
              onClick={onCancel}
              className="px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
