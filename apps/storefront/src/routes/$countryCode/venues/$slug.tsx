import { createFileRoute } from "@tanstack/react-router"
import { MapPin, Clock, Star, Heart, ArrowLeftMini, ArrowUpRightOnBox } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/venues/$slug")({
  component: VenueDetailPage,
})

function VenueDetailPage() {
  const { slug } = Route.useParams()

  // Mock venue data
  const venue = {
    name: "The Grand Hall",
    slug,
    category: "Event Space",
    rating: 4.8,
    reviewCount: 124,
    address: "456 Event Avenue, Downtown",
    phone: "+1 234 567 8900",
    website: "www.thegrandhall.com",
    hours: {
      monday: "9:00 AM - 10:00 PM",
      tuesday: "9:00 AM - 10:00 PM",
      wednesday: "9:00 AM - 10:00 PM",
      thursday: "9:00 AM - 10:00 PM",
      friday: "9:00 AM - 11:00 PM",
      saturday: "10:00 AM - 11:00 PM",
      sunday: "10:00 AM - 8:00 PM",
    },
    description: `
      The Grand Hall is a premier event venue located in the heart of downtown. 
      With its stunning architecture and versatile spaces, it's perfect for 
      weddings, corporate events, galas, and private celebrations.

      Our venue features:
      - 10,000 sq ft main ballroom
      - Rooftop terrace with city views
      - State-of-the-art AV equipment
      - On-site catering services
      - Ample parking
    `,
    amenities: ["WiFi", "Parking", "Catering", "AV Equipment", "Wheelchair Accessible", "Outdoor Space"],
    images: ["/venue1.jpg", "/venue2.jpg", "/venue3.jpg", "/venue4.jpg"],
    reviews: [
      { author: "John D.", rating: 5, date: "2024-01-10", text: "Amazing venue! The staff was incredibly helpful and the space was beautiful." },
      { author: "Sarah M.", rating: 5, date: "2024-01-05", text: "Perfect for our corporate event. Will definitely book again." },
      { author: "Mike R.", rating: 4, date: "2023-12-20", text: "Great location and facilities. Parking was easy to find." },
    ],
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <a href="/venues" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <ArrowLeftMini />
          Back to Venues
        </a>

        {/* Image Gallery */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="col-span-2 row-span-2 aspect-square bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <span className="text-black/50 text-lg">Main Image</span>
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-gray-800 rounded-xl flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image {i}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                  {venue.category}
                </span>
                <h1 className="text-3xl font-bold text-white mt-3">{venue.name}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="text-amber-400" />
                    <span className="font-semibold text-white">{venue.rating}</span>
                    <span className="text-gray-400">({venue.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800 text-gray-400">
                  <Heart />
                </button>
                <button className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800 text-gray-400">
                  <ArrowUpRightOnBox />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">About</h2>
              <div className="prose max-w-none whitespace-pre-line text-gray-400">
                {venue.description}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {venue.amenities.map((amenity) => (
                  <span key={amenity} className="px-3 py-2 bg-gray-800 rounded-lg text-sm text-gray-300">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Reviews</h2>
                <button className="text-cyan-400 text-sm hover:underline">Write a Review</button>
              </div>
              <div className="space-y-4">
                {venue.reviews.map((review, index) => (
                  <div key={index} className="pb-4 border-b border-gray-800 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-medium text-white">
                          {review.author[0]}
                        </div>
                        <div>
                          <p className="font-medium text-white">{review.author}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={i < review.rating ? "text-amber-400" : "text-gray-600"} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-4">
              {/* Contact */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="text-gray-500" />
                  <div>
                    <p className="font-medium text-white">Address</p>
                    <p className="text-gray-400">{venue.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-gray-500" />
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <p className="text-gray-400">{venue.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowUpRightOnBox className="text-gray-500" />
                  <div>
                    <p className="font-medium text-white">Website</p>
                    <a href="#" className="text-cyan-400 hover:underline">{venue.website}</a>
                  </div>
                </div>
              </div>

              <button className="w-full bg-cyan-500 text-black py-3 rounded-lg hover:bg-cyan-400 flex items-center justify-center gap-2 mb-3 font-medium">
                <MapPin />
                Get Directions
              </button>
              <button className="w-full border border-gray-700 text-white py-3 rounded-lg hover:bg-gray-800">
                Contact Venue
              </button>

              {/* Hours */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="text-gray-500" />
                  <p className="font-medium text-white">Opening Hours</p>
                </div>
                <div className="space-y-2 text-sm">
                  {Object.entries(venue.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{day}</span>
                      <span className="text-white">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
