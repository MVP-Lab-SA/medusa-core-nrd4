import { createFileRoute } from "@tanstack/react-router"
import { ProviderCard, AvailabilityCalendar, TimeSlotPicker } from "~/components/bookings"
import { Star, MapPin, Clock, Award, Calendar, ArrowLeft, CheckCircle } from "lucide-react"
import { useState } from "react"

export const Route = createFileRoute("/$countryCode/providers/$id")({
  component: ProviderDetailPage,
})

function ProviderDetailPage() {
  const { id } = Route.useParams()
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
    availability: {
      monday: ["9:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      tuesday: ["9:00", "10:00", "11:00", "14:00", "15:00"],
      wednesday: ["10:00", "11:00", "14:00", "15:00", "16:00"],
      thursday: ["9:00", "10:00", "14:00", "15:00", "16:00"],
      friday: ["9:00", "10:00", "11:00", "14:00"],
      saturday: ["10:00", "11:00", "12:00"],
      sunday: [],
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <a href="/providers" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Providers
      </a>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white border rounded-xl p-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                {provider.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{provider.name}</h1>
                <p className="text-gray-600">{provider.title}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{provider.rating}</span>
                    <span className="text-gray-500">({provider.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {provider.location}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    {provider.experience}
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">{provider.bio}</p>
          </div>

          {/* Specialties */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {provider.specialties.map((specialty) => (
                <span key={specialty} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Certifications
            </h2>
            <div className="space-y-2">
              {provider.certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Services</h2>
            <div className="space-y-3">
              {provider.services.map((service) => (
                <div key={service.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-gray-500">{service.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${service.price}</p>
                    <button className="text-sm text-purple-600 hover:underline">Book</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Reviews</h2>
            <div className="space-y-4">
              {provider.reviews.map((review, index) => (
                <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                        {review.author[0]}
                      </div>
                      <span className="font-medium">{review.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.text}</p>
                  <p className="text-sm text-gray-400 mt-1">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-xl p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Book Appointment
            </h2>
            
            <AvailabilityCalendar
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />

            {selectedDate && (
              <div className="mt-4">
                <TimeSlotPicker
                  selectedTime={selectedTime}
                  onTimeChange={setSelectedTime}
                  availableSlots={["9:00", "10:00", "11:00", "14:00", "15:00"]}
                />
              </div>
            )}

            <button 
              className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
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
  )
}
