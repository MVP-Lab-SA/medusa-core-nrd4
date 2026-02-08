import { CheckCircle, XMark } from "@medusajs/icons"
import type { SubscriptionPlan } from "../../lib/mock/marketplace"

interface PlanComparisonProps {
  plans: SubscriptionPlan[]
  featureMatrix: {
    feature: string
    values: Record<string, boolean | string>
  }[]
}

export function PlanComparison({ plans, featureMatrix }: PlanComparisonProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-4 font-medium text-gray-700 min-w-[200px]">Features</th>
            {plans.map((plan) => (
              <th key={plan.id} className="text-center py-4 px-4 min-w-[150px]">
                <div className="font-bold text-gray-900">{plan.name}</div>
                <div className="text-sm text-gray-500">
                  {new Intl.NumberFormat("en", {
                    style: "currency",
                    currency: plan.currency,
                  }).format(plan.price)}
                  /{plan.interval}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureMatrix.map((row, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-3 px-4 text-gray-900">{row.feature}</td>
              {plans.map((plan) => {
                const value = row.values[plan.id]
                return (
                  <td key={plan.id} className="py-3 px-4 text-center">
                    {typeof value === "boolean" ? (
                      value ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <XMark className="w-5 h-5 text-gray-300 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-700">{value}</span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
