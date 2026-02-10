import { createFileRoute, Link } from "@tanstack/react-router"
import { useDeliveryTracking } from "@/lib/hooks/use-fleetbase"
import { ArrowLeft, MapPin, Clock, CubeSolid, Check } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/account/deliveries/$id")({
  component: DeliveryDetailPage,
})

function DeliveryDetailPage() {
  const { countryCode, id } = Route.useParams()
  const { data: trackingEvents, isLoading } = useDeliveryTracking(id)

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

  if (!trackingEvents || trackingEvents.length === 0) {
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

  // Get latest status from tracking events
  const latestEvent = trackingEvents[trackingEvents.length - 1]
  const currentStatus = latestEvent?.status || "unknown"

  const statusSteps = [
    { key: 'order_received', label: 'Order Confirmed', icon: Check },
    { key: 'picked_up', label: 'Picked Up', icon: CubeSolid },
    { key: 'in_transit', label: 'In Transit', icon: MapPin },
    { key: 'delivered', label: 'Delivered', icon: Check },
  ]

  const statusToStep: Record<string, number> = {
    'order_received': 0,
    'picked_up': 1,
    'in_transit': 2,
    'out_for_delivery': 2,
    'delivered': 3,
  }
  
  const currentStepIndex = statusToStep[currentStatus] ?? 0

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
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
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
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Tracking Events */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <h2 className="font-semibold text-white mb-4">Tracking History</h2>
              
              <div className="space-y-4">
                {trackingEvents.slice().reverse().map((event) => (
                  <div key={event.id} className="flex items-start gap-4 pb-4 border-b border-gray-800 last:border-0">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2" />
                    </div>
                    <div>
                      <p className="text-white capitalize">{event.status.replace(/_/g, ' ')}</p>
                      {event.location && (
                        <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Need Help */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <h2 className="font-semibold text-white mb-4">Need Help?</h2>
              <p className="text-gray-400 text-sm mb-4">
                If you have any questions about your delivery, please contact our support team.
              </p>
              <Link 
                to="/$countryCode/account/deliveries"
                params={{ countryCode }}
                className="block w-full text-center px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
              >
                Back to Deliveries
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
