import { Calendar } from "@medusajs/icons"

interface NextBillingCardProps {
  date: string
  amount: number
  currency: string
  items?: { name: string; price: number }[]
}

export function NextBillingCard({ date, amount, currency, items }: NextBillingCardProps) {
  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  })

  const daysUntil = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Calendar className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Next Billing</h4>
          <p className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString()} ({daysUntil} days)
          </p>
        </div>
      </div>

      {items && items.length > 0 && (
        <div className="space-y-2 mb-4 py-4 border-t border-b border-gray-100">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.name}</span>
              <span className="text-gray-900">{formatter.format(item.price)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-900">Total</span>
        <span className="text-xl font-bold text-gray-900">{formatter.format(amount)}</span>
      </div>
    </div>
  )
}
