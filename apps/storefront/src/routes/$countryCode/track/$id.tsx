import { createFileRoute } from "@tanstack/react-router"
import { DeliveryTracker, LiveMap, DriverCard } from "~/components/delivery"
import { Package, MapPin, Clock, Phone } from "lucide-react"

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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <h1 className="text-2xl font-bold">{delivery.orderId}</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Estimated Arrival</p>
            <p className="text-xl font-semibold text-green-600">{delivery.estimatedArrival}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-xl overflow-hidden">
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
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Delivery Timeline</h2>
            <div className="space-y-4">
              {delivery.timeline.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full mt-1.5 ${
                    step.completed ? "bg-green-500" : "bg-gray-300"
                  } ${step.current ? "ring-4 ring-green-100" : ""}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${step.completed ? "text-gray-900" : "text-gray-400"}`}>
                        {step.status}
                      </p>
                      <p className="text-sm text-gray-500">{step.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-2">
              {delivery.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-gray-600">x{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Driver */}
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
            <Phone className="w-5 h-5" />
            Contact Driver
          </button>
        </div>
      </div>
    </div>
  )
}
