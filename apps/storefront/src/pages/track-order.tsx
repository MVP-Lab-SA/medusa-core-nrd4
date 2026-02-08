import { useState } from "react"
import { useDeliveryOrder } from "@/lib/hooks/use-fleetbase"
import { DeliveryTracker, TrackingTimeline } from "@/components/ui/delivery-tracker"
import { MagnifyingGlass, ShoppingBag } from "@medusajs/icons"

interface TrackOrderPageProps {
  countryCode: string
  initialOrderId?: string
}

export default function TrackOrderPage({ countryCode, initialOrderId }: TrackOrderPageProps) {
  const [orderId, setOrderId] = useState(initialOrderId || "")
  const [searchedId, setSearchedId] = useState(initialOrderId || "")

  const { data: delivery, isLoading, error } = useDeliveryOrder(searchedId)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchedId(orderId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h1 className="text-4xl font-bold">Track Your Order</h1>
          <p className="text-orange-100 mt-2 text-lg">
            Enter your order ID to see real-time delivery status
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mt-8">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter order ID or tracking number..."
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-white text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors"
              >
                Track
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {isLoading && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg h-64 animate-pulse" />
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mt-4">
              Order Not Found
            </h2>
            <p className="text-gray-500 mt-2">
              We couldn't find an order with that ID. Please check and try again.
            </p>
          </div>
        )}

        {delivery && (
          <div className="max-w-3xl mx-auto space-y-6">
            <DeliveryTracker delivery={delivery} />
            <TrackingTimeline events={delivery.trackingEvents} />

            {/* Live Map Placeholder */}
            {delivery.status === "in_transit" && delivery.driver && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Live Location
                </h3>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">
                    Live map tracking would be displayed here
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Driver location updates every 5 seconds
                </p>
              </div>
            )}
          </div>
        )}

        {!searchedId && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <MagnifyingGlass className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mt-4">
              Enter Your Order ID
            </h2>
            <p className="text-gray-500 mt-2">
              You can find your order ID in your confirmation email or order history.
            </p>
          </div>
        )}

        {/* Help Section */}
        <div className="max-w-3xl mx-auto mt-12 pt-12 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Need Help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Order Issues",
                description: "Problems with your order? Contact our support team.",
                action: "Get Help",
              },
              {
                title: "Missing Package",
                description: "Package marked delivered but not received?",
                action: "Report Issue",
              },
              {
                title: "Returns",
                description: "Need to return an item? Start the process here.",
                action: "Start Return",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                <button className="text-orange-600 font-medium mt-3 hover:underline">
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
