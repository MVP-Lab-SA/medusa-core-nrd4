import { useState } from "react"
import { Link } from "@tanstack/react-router"
import {
  useBookingService,
  useServiceProviders,
  useAvailableSlots,
  useCreateBooking,
} from "@/lib/hooks/use-marketplace"
import { BookingCalendar } from "@/components/ui/booking-calendar"
import { useCustomer } from "@/lib/context/customer-context"
import { Clock, Users, Star, Check, ArrowLeft } from "@medusajs/icons"

interface ServiceDetailPageProps {
  handle: string
  countryCode: string
}

export default function ServiceDetailPage({ handle, countryCode }: ServiceDetailPageProps) {
  const { customer } = useCustomer()
  const { data: service, isLoading } = useBookingService(handle)
  const { data: providers } = useServiceProviders(service?.id)
  const [selectedProvider, setSelectedProvider] = useState<string | undefined>()
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  )
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>()
  const [participants, setParticipants] = useState(1)
  const [notes, setNotes] = useState("")
  const [bookingComplete, setBookingComplete] = useState(false)

  const { data: slots } = useAvailableSlots(
    service?.id || "",
    selectedDate
  )

  const { createBooking, isLoading: isBooking } = useCreateBooking()

  const handleBook = async () => {
    if (!customer || !service || !selectedSlot) {
      if (!customer) {
        window.location.href = `/${countryCode}/account/login`
      }
      return
    }

    try {
      await createBooking({
        serviceId: service.id,
        serviceName: service.name,
        providerId: selectedProvider || '',
        providerName: '',
        date: new Date().toISOString(),
        startTime: selectedSlot || '',
        endTime: '',
        status: 'pending',
        price: service.price,
        currencyCode: 'usd',
      })
      setBookingComplete(true)
    } catch (error) {
      console.error("Failed to book:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 w-48 bg-gray-800 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Service Not Found</h1>
          <Link
            to="/$countryCode/services"
            params={{ countryCode }}
            className="text-cyan-400 hover:underline mt-2 block"
          >
            Back to Services
          </Link>
        </div>
      </div>
    )
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">Booking Confirmed!</h1>
          <p className="text-gray-400 mt-2">
            We've sent a confirmation email with all the details.
          </p>
          <Link
            to="/$countryCode/account"
            params={{ countryCode }}
            className="inline-block mt-6 px-6 py-2.5 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors"
          >
            View My Bookings
          </Link>
        </div>
      </div>
    )
  }

  const totalPrice = service.price * participants

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Back Link */}
        <Link
          to="/$countryCode/services"
          params={{ countryCode }}
          className="inline-flex items-center gap-1 text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Details */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="aspect-video">
                <img
                  src={service.images?.[0] || service.image}
                  alt={service.title || service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="px-2 py-0.5 bg-gray-800 text-gray-400 text-xs rounded">
                  {service.category}
                </span>
                <h1 className="text-2xl font-bold text-white mt-2">{service.title || service.name}</h1>
                <p className="text-gray-400 mt-4">{service.description}</p>

                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-800">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-5 h-5" />
                    <span>{service.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users className="w-5 h-5" />
                    <span>Up to {service.maxParticipants} participants</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Select Date & Time
              </h2>
              <BookingCalendar
                slots={slots || []}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
                providers={providers as any}
                selectedProvider={selectedProvider}
                onSelectProvider={setSelectedProvider}
              />
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-white">Booking Summary</h2>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-400">Service</span>
                  <span className="font-medium text-white">{service.title || service.name}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-400">Duration</span>
                  <span className="font-medium text-white">{service.duration} min</span>
                </div>

                <div className="py-3 border-b border-gray-800">
                  <label className="block text-gray-400 mb-2">Participants</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setParticipants(Math.max(1, participants - 1))}
                      className="w-8 h-8 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium text-white">{participants}</span>
                    <button
                      onClick={() =>
                        setParticipants(Math.min(service.maxParticipants || 10, participants + 1))
                      }
                      className="w-8 h-8 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="py-3 border-b border-gray-800">
                  <label className="block text-gray-400 mb-2">Special Requests</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests or notes..."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-400">Total</span>
                  <span className="text-2xl font-bold text-white">${totalPrice}</span>
                </div>
              </div>

              <button
                onClick={handleBook}
                disabled={!selectedSlot || isBooking}
                className="w-full mt-6 py-3 bg-cyan-500 text-black rounded-lg font-medium hover:bg-cyan-400 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
              >
                {isBooking ? "Booking..." : "Confirm Booking"}
              </button>

              {!selectedSlot && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  Please select a date and time slot
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
