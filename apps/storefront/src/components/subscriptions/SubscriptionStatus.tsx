interface Subscription {
  planName: string
  status: "active" | "paused" | "canceled" | "past_due" | "trialing"
  currentPeriodEnd?: string
  currency: string
  price: number
  interval: string
}

interface SubscriptionStatusProps {
  subscription: Subscription
  onPause?: () => void
  onResume?: () => void
  onCancel?: () => void
}

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  paused: "bg-yellow-100 text-yellow-700",
  canceled: "bg-red-100 text-red-700",
  past_due: "bg-red-100 text-red-700",
  trialing: "bg-blue-100 text-blue-700",
}

export function SubscriptionStatus({ subscription, onPause, onResume, onCancel }: SubscriptionStatusProps) {
  const nextBillingDate = subscription.currentPeriodEnd 
    ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
    : "N/A"

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{subscription.planName}</h3>
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[subscription.status]}`}>
          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1).replace("_", " ")}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Billing Cycle</p>
          <p className="font-medium text-gray-900">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: subscription.currency,
            }).format(subscription.price)}
            /{subscription.interval}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Next Billing</p>
          <p className="font-medium text-gray-900">{nextBillingDate}</p>
        </div>
      </div>

      {subscription.status === "active" && (
        <div className="flex gap-3">
          {onPause && (
            <button
              onClick={onPause}
              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
            >
              Pause Subscription
            </button>
          )}
          {onCancel && (
            <button
              onClick={onCancel}
              className="flex-1 py-2 px-4 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50"
            >
              Cancel
            </button>
          )}
        </div>
      )}

      {subscription.status === "paused" && onResume && (
        <button
          onClick={onResume}
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Resume Subscription
        </button>
      )}
    </div>
  )
}
