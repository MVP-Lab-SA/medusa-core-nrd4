import { createFileRoute, Link } from "@tanstack/react-router"
import { useDeliveryTracking } from "@/lib/hooks/use-fleetbase"
import { DeliveryTracker } from "@/components/delivery/DeliveryTracker"
import { LiveMap } from "@/components/delivery/LiveMap"
import { DriverCard } from "@/components/delivery/DriverCard"
import { ProofOfDelivery } from "@/components/delivery/ProofOfDelivery"
import { ArrowLeft, Phone, ChatBubble, MapPin, Clock, CubeSolid, Check } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/account/deliveries/$id")({
  component: DeliveryDetailPage,
})

function DeliveryDetailPage() {
  const { countryCode, id } = Route.useParams()
  const { data: delivery, isLoading } = useDeliveryTracking(id)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-gray-800 rounded" />
          <div className="h-64 bg-gray-800 rounded-lg" />
          <div className="h-48 bg-gray-800 rounded-lg" />
        </div>
      </div>
    )
  }

  if (!delivery) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <CubeSolid className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white">Delivery not found</h1>
        <p className="mt-2 text-gray-400">The delivery you're looking for doesn't exist.</p>
        <Link 
          to="/$countryCode/account/deliveries" 
          params={{ countryCode }}
          className="inline-block mt-4 px-6 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
        >
          Back to Deliveries
        </Link>
      </div>
    )
  }

  const statusSteps = [
    { key: 'confirmed', label: 'Order Confirmed', icon: Check },
    { key: 'picked_up', label: 'Picked Up', icon: CubeSolid },
    { key: 'in_transit', label: 'In Transit', icon: MapPin },
    { key: 'delivered', label: 'Delivered', icon: Check },
  ]

  const currentStepIndex = statusSteps.findIndex(s => s.key === delivery.status)

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            to="/$countryCode/account/deliveries" 
            params={{ countryCode }}
            className="p-2 hover:bg-gray-800 rounded-lg text-gray-400"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Delivery #{id}</h1>
            <p className="text-gray-500">Order #{delivery.orderId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Map */}
            {delivery.status === 'in_transit' && (
              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                  <h2 className="font-semibold text-white">Live Tracking</h2>
                </div>
                <LiveMap 
                  driverLocation={delivery.driverLocation}
                  destinationLocation={delivery.destinationLocation}
                />
              </div>
            )}

            {/* Status Timeline */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <h2 className="font-semibold text-white mb-6">Delivery Status</h2>
              
              <div className="relative">
                {statusSteps.map((step, index) => {
                  const isCompleted = index <= currentStepIndex
                  const isCurrent = index === currentStepIndex
                  const Icon = step.icon
                  
                  return (
                    <div key={step.key} className="flex items-start gap-4 pb-8 last:pb-0">
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-gray-800 text-gray-500'
                        } ${isCurrent ? 'ring-4 ring-emerald-500/30' : ''}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {index < statusSteps.length - 1 && (
                          <div className={`absolute top-10 left-1/2 w-0.5 h-12 -translate-x-1/2 ${
                            isCompleted && index < currentStepIndex ? 'bg-emerald-500' : 'bg-gray-800'
                          }`} />
                        )}
                      </div>
                      <div className="pt-2">
                        <p className={`font-medium ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                          {step.label}
                        </p>
                        {isCurrent && delivery.estimatedArrival && (
                          <p className="text-sm text-emerald-400 mt-1">
                            Estimated arrival: {new Date(delivery.estimatedArrival).toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <h2 className="font-semibold text-white mb-4">Delivery Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Delivery Address</h3>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-white">{delivery.address?.line1}</p>
                      {delivery.address?.line2 && (
                        <p className="text-gray-400">{delivery.address.line2}</p>
                      )}
                      <p className="text-gray-400">
                        {delivery.address?.city}, {delivery.address?.state} {delivery.address?.postalCode}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Delivery Window</h3>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-white">{delivery.deliveryWindow || 'Standard Delivery'}</p>
                      <p className="text-gray-400">
                        {new Date(delivery.scheduledDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {delivery.instructions && (
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Delivery Instructions</h3>
                  <p className="text-gray-400">{delivery.instructions}</p>
                </div>
              )}
            </div>

            {/* Proof of Delivery */}
            {delivery.status === 'delivered' && delivery.proofOfDelivery && (
              <ProofOfDelivery proof={delivery.proofOfDelivery} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Driver Info */}
            {delivery.driver && delivery.status !== 'delivered' && (
              <DriverCard driver={delivery.driver} />
            )}

            {/* Contact Options */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <h2 className="font-semibold text-white mb-4">Need Help?</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800">
                  <Phone className="w-4 h-4" />
                  <span>Call Support</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800">
                  <ChatBubble className="w-4 h-4" />
                  <span>Chat with Us</span>
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <h2 className="font-semibold text-white mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Items</span>
                  <span className="text-white">{delivery.itemCount} items</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-white">${delivery.shippingCost?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="pt-3 border-t border-gray-800 flex justify-between font-medium">
                  <span className="text-white">Total</span>
                  <span className="text-white">${delivery.total?.toFixed(2)}</span>
                </div>
              </div>
              
              <Link 
                to="/$countryCode/orders/$orderId"
                params={{ countryCode, orderId: delivery.orderId }}
                className="block mt-4 text-center text-sm text-cyan-400 hover:text-cyan-300"
              >
                View Full Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
