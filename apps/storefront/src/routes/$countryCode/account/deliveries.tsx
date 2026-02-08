import { createFileRoute, Link } from "@tanstack/react-router"
import { TruckFast, Clock, CheckCircle, XCircle } from "@medusajs/icons"
import { useDeliveries } from "../../../lib/hooks/use-fleetbase"

export const Route = createFileRoute("/$countryCode/account/deliveries")({
  component: DeliveriesPage,
})

function DeliveriesPage() {
  const { countryCode } = Route.useParams()
  const { data: deliveries, isLoading } = useDeliveries()

  const statusIcons = {
    pending: Clock,
    processing: Clock,
    in_transit: TruckFast,
    out_for_delivery: TruckFast,
    delivered: CheckCircle,
    failed: XCircle,
  }

  const statusColors = {
    pending: "text-gray-500 bg-gray-100",
    processing: "text-yellow-600 bg-yellow-100",
    in_transit: "text-blue-600 bg-blue-100",
    out_for_delivery: "text-blue-600 bg-blue-100",
    delivered: "text-green-600 bg-green-100",
    failed: "text-red-600 bg-red-100",
  }

  const active = deliveries?.filter((d) => !["delivered", "failed"].includes(d.status)) || []
  const completed = deliveries?.filter((d) => ["delivered", "failed"].includes(d.status)) || []

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Deliveries</h1>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {active.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Deliveries</h2>
                <div className="space-y-4">
                  {active.map((delivery) => {
                    const Icon = statusIcons[delivery.status]
                    const colors = statusColors[delivery.status]
                    return (
                      <Link
                        key={delivery.id}
                        to={`/${countryCode}/track/${delivery.trackingNumber}`}
                        className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${colors}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                Order #{delivery.orderId.slice(-8)}
                              </p>
                              <p className="text-sm text-gray-500">
                                Tracking: {delivery.trackingNumber}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 capitalize">
                              {delivery.status.replace("_", " ")}
                            </p>
                            {delivery.estimatedDelivery && (
                              <p className="text-xs text-gray-500">
                                ETA: {new Date(delivery.estimatedDelivery).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {completed.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Past Deliveries</h2>
                <div className="space-y-4 opacity-70">
                  {completed.slice(0, 5).map((delivery) => {
                    const Icon = statusIcons[delivery.status]
                    const colors = statusColors[delivery.status]
                    return (
                      <div
                        key={delivery.id}
                        className="bg-white border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${colors}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                Order #{delivery.orderId.slice(-8)}
                              </p>
                              <p className="text-sm text-gray-500">
                                {delivery.deliveredAt
                                  ? `Delivered ${new Date(delivery.deliveredAt).toLocaleDateString()}`
                                  : "Delivery failed"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {deliveries?.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500">No deliveries yet</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
