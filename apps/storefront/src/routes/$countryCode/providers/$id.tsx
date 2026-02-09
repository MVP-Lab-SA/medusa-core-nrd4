import { createFileRoute } from "@tanstack/react-router"
import { Star, MapPin, Clock, CheckCircleSolid, ArrowLeftMini, ChevronLeft, ChevronRight } from "@medusajs/icons"
import { useState } from "react"

export const Route = createFileRoute("/$countryCode/providers/$id")({
  component: ProviderDetailPage,
})

// Simple inline calendar component
function SimpleCalendar({ 
  selectedDate, 
  onDateSelect 
}: { 
  selectedDate: string | null
  onDateSelect: (date: string) => void 
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const padding = Array.from({ length: firstDayOfMonth }, () => null)

  const getDateString = (day: number) => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      .toISOString()
      .split("T")[0]
  }

  const isPast = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="p-2 hover:bg-gray-700 rounded-lg text-gray-400"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-semibold text-white">
          {currentMonth.toLocaleDateString("en", { month: "long", year: "numeric" })}
        </h3>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="p-2 hover:bg-gray-700 rounded-lg text-gray-400"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {padding.map((_, i) => (
          <div key={`pad-${i}`} className="aspect-square" />
        ))}
        {days.map((day) => {
          const dateStr = getDateString(day)
          const past = isPast(day)
          const selected = dateStr === selectedDate

          return (
            <button
              key={day}
              onClick={() => !past && onDateSelect(dateStr)}
              disabled={past}
              className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${
                selected
                  ? "bg-cyan-500 text-black"
                  : !past
                  ? "hover:bg-gray-700 text-white"
                  : "text-gray-600 cursor-not-allowed"
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Simple time slot picker
function SimpleTimeSlots({
  selectedTime,
  onTimeSelect,
  slots
}: {
  selectedTime: string | null
  onTimeSelect: (time: string) => void
  slots: string[]
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot) => (
        <button
          key={slot}
          onClick={() => onTimeSelect(slot)}
          className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
            selectedTime === slot
              ? "bg-cyan-500 text-black border-cyan-500"
              : "border-gray-700 text-gray-300 hover:border-cyan-500"
          }`}
        >
          {slot}
        </button>
      ))}
    </div>
  )
}

function ProviderDetailPage() {
  const { id, countryCode } = Route.useParams()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Mock provider data
  const provider = {
    id,
    name: "Sarah Johnson",
    title: "Senior Stylist",
    category: "Hair Salon",
    rating: 4.9,
    reviewCount: 156,
    location: "Downtown Studio",
    experience: "8 years",
    bio: "Passionate about creating looks that make you feel confident and beautiful. Specializing in color, cuts, and styling for all hair types.",
    specialties: ["Color Correction", "Balayage", "Precision Cuts", "Bridal Styling"],
    certifications: ["L'Oreal Color Specialist", "Vidal Sassoon Certified"],
    services: [
      { name: "Haircut & Style", duration: "45 min", price: 65 },
      { name: "Color & Highlights", duration: "2 hrs", price: 150 },
      { name: "Balayage", duration: "3 hrs", price: 200 },
      { name: "Bridal Styling", duration: "2 hrs", price: 175 },
    ],
    reviews: [
      { author: "Emily R.", rating: 5, date: "2024-01-15", text: "Sarah is amazing! Best haircut I've ever had." },
      { author: "Michelle K.", rating: 5, date: "2024-01-10", text: "Love my new balayage! So natural looking." },
      { author: "Jessica T.", rating: 4, date: "2024-01-05", text: "Great experience, very professional." },
    ],
  }

  const availableSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <a href={`/${countryCode}/providers`} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <ArrowLeftMini className="w-4 h-4" />
          Back to Providers
        </a>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center text-black text-2xl font-bold">
                  {provider.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white">{provider.name}</h1>
                  <p className="text-gray-400">{provider.title}</p>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-amber-400" />
                      <span className="font-semibold text-white">{provider.rating}</span>
                      <span className="text-gray-400">({provider.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {provider.location}
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-4 h-4" />
                      {provider.experience}
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-400">{provider.bio}</p>
            </div>

            {/* Specialties */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {provider.specialties.map((specialty) => (
                  <span key={specialty} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                Certifications
              </h2>
              <div className="space-y-2">
                {provider.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2 text-gray-300">
                    <CheckCircleSolid className="w-4 h-4 text-emerald-400" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Services</h2>
              <div className="space-y-3">
                {provider.services.map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-white">{service.name}</p>
                      <p className="text-sm text-gray-400">{service.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">${service.price}</p>
                      <button className="text-sm text-cyan-400 hover:underline">Book</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Reviews</h2>
              <div className="space-y-4">
                {provider.reviews.map((review, index) => (
                  <div key={index} className="pb-4 border-b border-gray-800 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium text-white">
                          {review.author[0]}
                        </div>
                        <span className="font-medium text-white">{review.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-amber-400" : "text-gray-600"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400">{review.text}</p>
                    <p className="text-sm text-gray-500 mt-1">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Book Appointment
              </h2>
              
              <SimpleCalendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />

              {selectedDate && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Available Times</h3>
                  <SimpleTimeSlots
                    selectedTime={selectedTime}
                    onTimeSelect={setSelectedTime}
                    slots={availableSlots}
                  />
                </div>
              )}

              <button 
                className="w-full mt-4 bg-cyan-500 text-black py-3 rounded-lg hover:bg-cyan-400 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors font-medium"
                disabled={!selectedDate || !selectedTime}
              >
                Book Appointment
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Free cancellation up to 24 hours before
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
