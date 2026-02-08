import { CheckCircle, Clock, TruckFast, ShoppingBag } from "@medusajs/icons"
import type { DeliveryOrder } from "../../lib/mock/fleetbase"

interface DeliveryTrackerProps {
  delivery: DeliveryOrder
}

const steps = [
  { key: "pending", label: "Order Placed", icon: ShoppingBag },
  { key: "processing", label: "Processing", icon: Clock },
  { key: "in_transit", label: "In Transit", icon: TruckFast },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
]

const statusIndex: Record<string, number> = {
  pending: 0,
  processing: 1,
  assigned: 1,
  picked_up: 2,
  in_transit: 2,
  out_for_delivery: 2,
  delivered: 3,
  failed: -1,
}

export function DeliveryTracker({ delivery }: DeliveryTrackerProps) {
  const currentStep = statusIndex[delivery.status] ?? 0

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">Delivery Status</h3>
        <span className="text-sm text-gray-500">
          Order #{delivery.orderId.slice(-8)}
        </span>
      </div>

      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>

        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isCompleted = index <= currentStep
            const isCurrent = index === currentStep

            return (
              <div key={step.key} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  } ${isCurrent ? "ring-4 ring-green-100" : ""}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`mt-2 text-sm ${
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

      {delivery.estimatedDelivery && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Estimated Delivery:{" "}
            <span className="font-medium text-gray-900">
              {new Date(delivery.estimatedDelivery).toLocaleDateString("en", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
