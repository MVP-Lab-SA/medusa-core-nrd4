import { Check, Clock, ArrowRightOnRectangle, MapPin, ShoppingBag, XMark } from "@medusajs/icons"
import type { DeliveryOrder, TrackingEvent } from "@/lib/mock/fleetbase"

interface DeliveryTrackerProps {
  delivery: DeliveryOrder
}

export function DeliveryTracker({ delivery }: DeliveryTrackerProps) {
  const steps = [
    { key: "pending", label: "Order Placed", icon: ShoppingBag },
    { key: "assigned", label: "Driver Assigned", icon: Clock },
    { key: "picked_up", label: "Picked Up", icon: Check },
    { key: "in_transit", label: "In Transit", icon: ArrowRightOnRectangle },
    { key: "delivered", label: "Delivered", icon: MapPin },
  ]

  const currentStepIndex = steps.findIndex((s) => s.key === delivery.status)
  const isFailed = delivery.status === "failed"

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Delivery Status</h3>
          <p className="text-sm text-gray-500">Order #{delivery.orderId}</p>
        </div>
        {delivery.estimatedDelivery && delivery.status !== "delivered" && (
          <div className="text-right">
            <span className="text-sm text-gray-500">Estimated Delivery</span>
            <p className="font-medium text-gray-900">
              {new Date(delivery.estimatedDelivery).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        )}
      </div>

      {/* Progress Steps */}
      <div className="relative">
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200">
          <div
            className={`h-full transition-all duration-500 ${
              isFailed ? "bg-red-500" : "bg-green-500"
            }`}
            style={{
              width: isFailed ? "100%" : `${(currentStepIndex / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex
            const isCurrent = index === currentStepIndex
            const Icon = step.icon

            return (
              <div key={step.key} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors ${
                    isFailed && isCurrent
                      ? "bg-red-500 text-white"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isFailed && isCurrent ? (
                    <XMark className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`text-xs mt-2 text-center ${
                    isCompleted ? "text-gray-900 font-medium" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Driver Info */}
      {delivery.driver && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Your Driver</h4>
          <div className="flex items-center gap-3">
            <img
              src={delivery.driver.photo}
              alt={delivery.driver.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{delivery.driver.name}</p>
              <p className="text-sm text-gray-500">
                {delivery.driver.vehicleType} - {delivery.driver.vehiclePlate}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">&#9733;</span>
                <span className="font-medium">{delivery.driver.rating}</span>
              </div>
              <a
                href={`tel:${delivery.driver.phone}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Call Driver
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Package Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Package Details</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Weight</span>
            <p className="text-gray-900">{delivery.package.weight} kg</p>
          </div>
          <div>
            <span className="text-gray-500">Dimensions</span>
            <p className="text-gray-900">
              {delivery.package.dimensions.length}x{delivery.package.dimensions.width}x
              {delivery.package.dimensions.height} cm
            </p>
          </div>
          <div>
            <span className="text-gray-500">Items</span>
            <p className="text-gray-900">{delivery.package.items}</p>
          </div>
        </div>
      </div>

      {/* Proof of Delivery */}
      {delivery.proofOfDelivery && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Proof of Delivery</h4>
          <div className="flex items-start gap-4">
            {delivery.proofOfDelivery.photo && (
              <img
                src={delivery.proofOfDelivery.photo}
                alt="Proof of delivery"
                className="w-24 h-24 rounded-lg object-cover"
              />
            )}
            <div>
              <p className="text-sm text-gray-600">
                Received by: {delivery.proofOfDelivery.receivedBy}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(delivery.proofOfDelivery.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Tracking Timeline
interface TrackingTimelineProps {
  events: TrackingEvent[]
}

export function TrackingTimeline({ events }: TrackingTimelineProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking History</h3>
      <div className="space-y-4">
        {events
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .map((event, index) => (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    index === 0 ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                {index < events.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 mt-1" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className="font-medium text-gray-900">{event.status}</p>
                <p className="text-sm text-gray-600 mt-0.5">{event.description}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <span>{event.location}</span>
                  <span>-</span>
                  <span>
                    {new Date(event.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
