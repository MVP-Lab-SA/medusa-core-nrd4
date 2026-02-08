import { createFileRoute } from "@tanstack/react-router"
import { Plus } from "@medusajs/icons"
import { usePaymentMethods } from "../../../lib/hooks/use-payments"
import { PaymentMethodCard } from "../../../components/payments/PaymentMethodCard"

export const Route = createFileRoute("/$countryCode/account/payment-methods")({
  component: PaymentMethodsPage,
})

function PaymentMethodsPage() {
  const { data: methods, isLoading } = usePaymentMethods()

  const handleSetDefault = (id: string) => {
    console.log("Set default:", id)
  }

  const handleDelete = (id: string) => {
    console.log("Delete:", id)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : methods && methods.length > 0 ? (
          <div className="space-y-4">
            {methods.map((method, index) => (
              <PaymentMethodCard
                key={method.id}
                method={method}
                isDefault={index === 0}
                onSetDefault={handleSetDefault}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-4">No payment methods saved</p>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
              Add Payment Method
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
