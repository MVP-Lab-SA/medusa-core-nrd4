import { createFileRoute } from "@tanstack/react-router"
import { LiveMap, DriverCard } from "~/components/ui/delivery-tracker"
import { ShoppingBag, MapPin, Clock, Phone } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/track/$id")({
  component: TrackOrderDetail,
})

function TrackOrderDetail() {
  const { id } = Route.useParams()

  // Mock delivery data
  const delivery = {
    orderId: id,
    status: "in_transit",
    estimatedArrival: "2024-01-20 14:00",
    currentLocation: { lat: 24.7136, lng: 46.6753 },
    destination: { lat: 24.7742, lng: 46.7386 },
    driver: {
      name: "Mohammed Ali",
      phone: "+966 50 123 4567",
      photo: "/driver.jpg",
      rating: 4.9,
      vehicle: "White Toyota Hilux",
      licensePlate: "ABC 1234",
    },
    timeline: [
      { time: "09:00", status: "Order Confirmed", completed: true },
      { time: "10:30", status: "Picked Up", completed: true },
      { time: "11:00", status: "In Transit", completed: true, current: true },
      { time: "14:00", status: "Delivered", completed: false },
    ],
    items: [
      { name: "Product A", quantity: 2 },
      { name: "Product B", quantity: 1 },
    ],
  }

  return (
    <div className="min-h-screen bg-city-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-city-navy border border-city-steel rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-city-muted">Order ID</p>
              <h1 className="text-2xl font-bold text-city-white">{delivery.orderId}</h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-city-muted">Estimated Arrival</p>
              <p className="text-xl font-semibold text-emerald-400">{delivery.estimatedArrival}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-city-navy border border-city-steel rounded-xl overflow-hidden">
              <div className="h-[400px]">
                <LiveMap
                  driverLocation={delivery.currentLocation}
                  destinationLocation={delivery.destination}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Driver Card */}
            <DriverCard driver={delivery.driver} />

            {/* Timeline */}
            <div className="bg-city-navy border border-city-steel rounded-xl p-6">
              <h2 className="text-lg font-semibold text-city-white mb-4">Delivery Timeline</h2>
              <div className="space-y-4">
                {delivery.timeline.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${
                      step.completed ? "bg-emerald-400" : "bg-city-steel"
                    } ${step.current ? "ring-4 ring-emerald-400/20" : ""}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${step.completed ? "text-city-white" : "text-city-muted"}`}>
                          {step.status}
                        </p>
                        <p className="text-sm text-city-muted">{step.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-city-navy border border-city-steel rounded-xl p-6">
              <h2 className="text-lg font-semibold text-city-white mb-4">Order Items</h2>
              <div className="space-y-2">
                {delivery.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-city-steel/50 last:border-0">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-city-muted" />
                      <span className="text-city-white">{item.name}</span>
                    </div>
                    <span className="text-city-gray">x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Driver */}
            <button className="w-full flex items-center justify-center gap-2 bg-city-cyan text-city-dark py-3 rounded-xl hover:bg-city-cyan-light transition-colors font-medium">
              <Phone className="w-5 h-5" />
              Contact Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
