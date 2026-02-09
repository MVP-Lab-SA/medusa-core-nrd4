import { createFileRoute, Link } from "@tanstack/react-router"
import { TruckFast, Clock, CheckCircle, XCircle } from "@medusajs/icons"
import { useDeliveries } from "../../../lib/hooks/use-fleetbase"
import { href } from "../../../lib/utils/link"
import { AccountLayout } from "../../../components/account/AccountSidebar"

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
    pending: "text-gray-400 bg-gray-800",
    processing: "text-yellow-400 bg-yellow-500/20",
    in_transit: "text-blue-400 bg-blue-500/20",
    out_for_delivery: "text-blue-400 bg-blue-500/20",
    delivered: "text-green-400 bg-green-500/20",
    failed: "text-red-400 bg-red-500/20",
  }

  const active = deliveries?.filter((d) => !["delivered", "failed"].includes(d.status)) || []
  const completed = deliveries?.filter((d) => ["delivered", "failed"].includes(d.status)) || []

  return (
    <AccountLayout currentPath={`/${countryCode}/account/deliveries`}>
      <h1 className="text-2xl font-bold text-white mb-8">My Deliveries</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {active.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Active Deliveries</h2>
              <div className="space-y-4">
                {active.map((delivery) => {
                  const Icon = statusIcons[delivery.status]
                  const colors = statusColors[delivery.status]
                  return (
                    <Link
                      key={delivery.id}
                      to={href(`/${countryCode}/track/${delivery.trackingNumber}`)}
                      className="block bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${colors}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              Order #{delivery.orderId.slice(-8)}
                            </p>
                            <p className="text-sm text-gray-500">
                              Tracking: {delivery.trackingNumber}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-white capitalize">
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
              <h2 className="text-lg font-semibold text-white mb-4">Past Deliveries</h2>
              <div className="space-y-4 opacity-70">
                {completed.slice(0, 5).map((delivery) => {
                  const Icon = statusIcons[delivery.status]
                  const colors = statusColors[delivery.status]
                  return (
                    <div
                      key={delivery.id}
                      className="bg-gray-900 border border-gray-800 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${colors}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-white">
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
            <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
              <TruckFast className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400">No deliveries yet</p>
            </div>
          )}
        </>
      )}
    </AccountLayout>
  )
}
