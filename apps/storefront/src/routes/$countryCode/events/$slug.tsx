import { createFileRoute } from "@tanstack/react-router"
import { Calendar, MapPin, Clock, Users, ArrowUpRightOnBox, Heart, ArrowLeftMini, Tag } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/events/$slug")({
  component: EventDetailPage,
})

function EventDetailPage() {
  const { slug, countryCode } = Route.useParams()

  // Mock event data
  const event = {
    title: "City Night Market Festival",
    slug,
    date: "2024-02-15",
    startTime: "18:00",
    endTime: "23:00",
    location: "City Central Plaza",
    address: "123 Main Street, Downtown",
    category: "Festival",
    description: `
      Join us for the biggest night market of the year! Experience local vendors, 
      live music, food stalls, and entertainment for the whole family.

      The City Night Market Festival brings together over 100 local vendors, 
      food trucks, and artisans for one unforgettable evening. From handmade 
      crafts to delicious street food, there's something for everyone.

      What to expect:
      - 100+ local vendors and artisans
      - Live music performances
      - Food trucks and street food
      - Kids' entertainment zone
      - Art installations
      - Free parking available
    `,
    image: "/event-hero.jpg",
    organizer: "City Commerce Association",
    attendees: 1250,
    capacity: 2000,
    price: "Free Entry",
    relatedEvents: [
      { title: "Sunday Farmers Market", slug: "farmers-market", date: "Every Sunday" },
      { title: "Art Walk Weekend", slug: "art-walk", date: "March 1-2" },
      { title: "Food Festival 2024", slug: "food-festival", date: "March 15" },
    ],
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <a href={`/${countryCode}/events`} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeftMini className="w-4 h-4" />
          Back to Events
        </a>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white/50 text-lg">Event Image</span>
            </div>

            {/* Header */}
            <div className="mb-6">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                {event.category}
              </span>
              <h1 className="text-3xl font-bold text-white mt-3 mb-4">{event.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {event.startTime} - {event.endTime}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {event.attendees.toLocaleString()} attending
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">About This Event</h2>
              <div className="prose max-w-none whitespace-pre-line text-gray-400">
                {event.description}
              </div>
            </div>

            {/* Location */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Location</h2>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 mt-0.5 text-gray-500" />
                <div>
                  <p className="font-medium text-white">{event.location}</p>
                  <p className="text-gray-400">{event.address}</p>
                </div>
              </div>
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Map View</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-4">
              {/* Price & Register */}
              <div className="mb-6">
                <p className="text-sm text-gray-500">Entry</p>
                <p className="text-3xl font-bold text-emerald-400">{event.price}</p>
              </div>

              <button className="w-full bg-cyan-500 text-black font-medium py-3 rounded-lg hover:bg-cyan-400 flex items-center justify-center gap-2 mb-3 transition-colors">
                <Tag className="w-5 h-5" />
                Register for Event
              </button>

              <div className="flex gap-2 mb-6">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors">
                  <Heart className="w-4 h-4" />
                  Save
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors">
                  <ArrowUpRightOnBox className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Capacity */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Spots filled</span>
                  <span className="font-medium text-white">{event.attendees} / {event.capacity}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-cyan-500 h-2 rounded-full" 
                    style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                  />
                </div>
              </div>

              {/* Organizer */}
              <div className="pt-6 border-t border-gray-800">
                <p className="text-sm text-gray-500 mb-2">Organized by</p>
                <p className="font-medium text-white">{event.organizer}</p>
              </div>
            </div>

            {/* Related Events */}
            <div className="mt-6">
              <h3 className="font-semibold text-white mb-4">More Events</h3>
              <div className="space-y-3">
                {event.relatedEvents.map((related) => (
                  <a 
                    key={related.slug}
                    href={`/${countryCode}/events/${related.slug}`}
                    className="block p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-colors"
                  >
                    <p className="font-medium text-white">{related.title}</p>
                    <p className="text-sm text-gray-500">{related.date}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
