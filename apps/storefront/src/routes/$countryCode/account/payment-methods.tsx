import { createFileRoute } from "@tanstack/react-router"
import { Plus, CreditCard, EllipsisHorizontal } from "@medusajs/icons"
import { useState } from "react"
import { AccountLayout } from "../../../components/account/AccountSidebar"

export const Route = createFileRoute("/$countryCode/account/payment-methods")({
  component: PaymentMethodsPage,
})

// Mock payment methods data
const mockPaymentMethods = [
  {
    id: "pm_1",
    type: "card",
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "card",
    brand: "mastercard",
    last4: "8888",
    expMonth: 6,
    expYear: 2026,
    isDefault: false,
  },
]

function PaymentMethodsPage() {
  const { countryCode } = Route.useParams()
  const [methods] = useState(mockPaymentMethods)
  const [showAddModal, setShowAddModal] = useState(false)

  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return (
          <div className="w-10 h-7 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold italic">VISA</span>
          </div>
        )
      case "mastercard":
        return (
          <div className="w-10 h-7 bg-gradient-to-r from-red-500 to-orange-500 rounded flex items-center justify-center">
            <div className="flex -space-x-1">
              <div className="w-3 h-3 bg-red-600 rounded-full opacity-80" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-80" />
            </div>
          </div>
        )
      case "amex":
        return (
          <div className="w-10 h-7 bg-gradient-to-r from-blue-500 to-blue-700 rounded flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">AMEX</span>
          </div>
        )
      default:
        return (
          <div className="w-10 h-7 bg-gray-600 rounded flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-gray-300" />
          </div>
        )
    }
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/payment-methods`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Payment Methods</h1>
            <p className="text-gray-400 mt-1">Manage your saved payment methods</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>

        {/* Payment Methods List */}
        {methods.length > 0 ? (
          <div className="space-y-4">
            {methods.map((method) => (
              <div
                key={method.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getCardIcon(method.brand)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium capitalize">
                          {method.brand}
                        </span>
                        <span className="text-gray-400">ending in {method.last4}</span>
                        {method.isDefault && (
                          <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        Expires {method.expMonth.toString().padStart(2, "0")}/{method.expYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <button className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors">
                        Set as default
                      </button>
                    )}
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <EllipsisHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
            <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No payment methods</h3>
            <p className="text-gray-400 mb-6">
              Add a payment method to make checkout faster
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Add Payment Method
            </button>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-medium">Your payment information is secure</h4>
              <p className="text-sm text-gray-400 mt-1">
                We use industry-standard encryption to protect your payment details. Your full card number is never stored on our servers.
              </p>
            </div>
          </div>
        </div>

        {/* Add Payment Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-white mb-6">Add Payment Method</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">CVC</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name on Card</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500" />
                  <span className="text-sm text-gray-400">Set as default payment method</span>
                </label>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-3 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors">
                  Add Card
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  )
}
