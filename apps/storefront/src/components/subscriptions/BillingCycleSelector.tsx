interface BillingCycleSelectorProps {
  selected: "monthly" | "yearly"
  onChange: (cycle: "monthly" | "yearly") => void
  yearlyDiscount?: number
}

export function BillingCycleSelector({ selected, onChange, yearlyDiscount = 20 }: BillingCycleSelectorProps) {
  return (
    <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
      <button
        onClick={() => onChange("monthly")}
        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
          selected === "monthly"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange("yearly")}
        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
          selected === "yearly"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        Yearly
        {yearlyDiscount > 0 && (
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            Save {yearlyDiscount}%
          </span>
        )}
      </button>
    </div>
  )
}
