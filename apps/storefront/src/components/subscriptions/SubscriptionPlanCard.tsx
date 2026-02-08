import { CheckCircle } from "@medusajs/icons"
import type { SubscriptionPlan } from "../../lib/mock/marketplace"

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan
  isPopular?: boolean
  onSelect?: (planId: string) => void
  isSelected?: boolean
}

export function SubscriptionPlanCard({ plan, isPopular, onSelect, isSelected }: SubscriptionPlanCardProps) {
  return (
    <div
      className={`relative bg-white border-2 rounded-xl p-6 ${
        isSelected ? "border-blue-500 ring-2 ring-blue-200" : isPopular ? "border-blue-500" : "border-gray-200"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-gray-600 text-sm">{plan.description}</p>
      </div>

      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-gray-900">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: plan.currency,
              maximumFractionDigits: 0,
            }).format(plan.price)}
          </span>
          <span className="text-gray-500">/{plan.interval}</span>
        </div>
        {plan.trialDays && plan.trialDays > 0 && (
          <p className="text-sm text-green-600 mt-2">{plan.trialDays}-day free trial</p>
        )}
      </div>

      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect?.(plan.id)}
        className={`w-full py-3 px-4 font-medium rounded-lg transition-colors ${
          isSelected
            ? "bg-blue-600 text-white"
            : isPopular
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
      >
        {isSelected ? "Selected" : "Choose Plan"}
      </button>
    </div>
  )
}
