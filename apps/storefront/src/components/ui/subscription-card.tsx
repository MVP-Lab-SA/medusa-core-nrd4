import { Check, Clock, Pause, XMark } from "@medusajs/icons"

interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  interval: string
  features: string[]
  discount?: number
  trialDays?: number
}

interface Subscription {
  id: string
  planId?: string
  planName?: string
  plan?: { name: string }
  status: string
  currentPeriodStart?: string
  currentPeriodEnd?: string
  nextBillingDate?: string
  price?: number
  currencyCode?: string
  items?: { product: { name: string } }[]
  pausedUntil?: string
}

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan
  onSelect?: (planId: string) => void
  selected?: boolean
  popular?: boolean
}

export function SubscriptionPlanCard({
  plan,
  onSelect,
  selected,
  popular,
}: SubscriptionPlanCardProps) {
  return (
    <div
      className={`relative bg-white rounded-xl border-2 p-6 transition-all ${
        selected
          ? "border-blue-500 shadow-lg"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
      <p className="text-gray-500 mt-1 text-sm">{plan.description}</p>

      <div className="mt-4">
        <span className="text-3xl font-bold text-gray-900">
          ${plan.price.toFixed(2)}
        </span>
        <span className="text-gray-500">/{plan.interval}</span>
        {plan.discount && (
          <span className="ml-2 text-sm text-green-600 font-medium">
            Save {plan.discount}%
          </span>
        )}
      </div>

      {plan.trialDays && (
        <p className="mt-2 text-sm text-blue-600">
          {plan.trialDays}-day free trial
        </p>
      )}

      <ul className="mt-6 space-y-3">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect?.(plan.id)}
        className={`mt-6 w-full py-2.5 rounded-lg font-medium transition-colors ${
          selected
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
      >
        {selected ? "Selected" : "Select Plan"}
      </button>
    </div>
  )
}

interface SubscriptionStatusCardProps {
  subscription: Subscription
  onPause?: () => void
  onResume?: () => void
  onCancel?: () => void
}

export function SubscriptionStatusCard({
  subscription,
  onPause,
  onResume,
  onCancel,
}: SubscriptionStatusCardProps) {
  const statusColors = {
    active: "bg-green-100 text-green-700",
    paused: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
    expired: "bg-gray-100 text-gray-700",
  }

  const statusIcons = {
    active: <Check className="w-4 h-4" />,
    paused: <Pause className="w-4 h-4" />,
    cancelled: <XMark className="w-4 h-4" />,
    expired: <Clock className="w-4 h-4" />,
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {subscription.planName || subscription.plan?.name || 'Subscription'}
          </h3>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
              statusColors[subscription.status as keyof typeof statusColors] || statusColors.active
            }`}
          >
            {statusIcons[subscription.status as keyof typeof statusIcons] || statusIcons.active}
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            ${(subscription.price || 0).toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">/month</div>
        </div>
      </div>

      {/* Subscription Items */}
      {subscription.items && subscription.items.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Included Items</h4>
          <ul className="space-y-2">
            {subscription.items.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {item.product?.name || 'Item'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Billing Info */}
      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm">
        {subscription.currentPeriodStart && subscription.currentPeriodEnd && (
          <div>
            <span className="text-gray-500">Current Period</span>
            <p className="text-gray-900">
              {new Date(subscription.currentPeriodStart).toLocaleDateString()} -{" "}
              {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </p>
          </div>
        )}
        {subscription.nextBillingDate && (
          <div>
            <span className="text-gray-500">Next Billing</span>
            <p className="text-gray-900">
              {new Date(subscription.nextBillingDate).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      {subscription.status === "active" && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
          <button
            onClick={onPause}
            className="flex-1 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Pause Subscription
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {subscription.status === "paused" && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={onResume}
            className="w-full py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Resume Subscription
          </button>
          {subscription.pausedUntil && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Paused until {new Date(subscription.pausedUntil).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
