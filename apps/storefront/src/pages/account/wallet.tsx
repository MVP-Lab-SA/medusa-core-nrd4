import { useWallet, usePaymentMethods, useTopUpWallet } from "@/lib/hooks/use-payments"
import { WalletCard, WalletTransactions, PaymentMethodCard } from "@/components/ui/wallet-card"
import { useCustomer } from "@/lib/context/customer-context"
import { Plus } from "@medusajs/icons"
import { useState } from "react"

interface AccountWalletPageProps {
  countryCode: string
}

export default function AccountWalletPage({ countryCode }: AccountWalletPageProps) {
  const { customer } = useCustomer()
  const { data: wallet, isLoading: walletLoading } = useWallet(customer?.id || "")
  const { data: paymentMethods } = usePaymentMethods(customer?.id || "")
  const topUpMutation = useTopUpWallet()

  const [showTopUp, setShowTopUp] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState(50)

  const handleTopUp = async () => {
    if (!customer || !paymentMethods?.[0]) return

    try {
      await topUpMutation.mutateAsync({
        customerId: customer.id,
        amount: topUpAmount,
        paymentMethodId: paymentMethods[0].id,
      })
      setShowTopUp(false)
    } catch (error) {
      console.error("Top up failed:", error)
    }
  }

  if (!customer) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Please log in to view your wallet.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wallet</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet Card */}
        <div className="lg:col-span-1">
          {walletLoading ? (
            <div className="h-40 bg-gray-200 rounded-xl animate-pulse" />
          ) : wallet ? (
            <WalletCard wallet={wallet} onTopUp={() => setShowTopUp(true)} />
          ) : null}

          {/* Quick Actions */}
          <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Transfer Balance
              </button>
              <button className="w-full py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                View Statement
              </button>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="lg:col-span-2">
          {wallet && <WalletTransactions transactions={wallet.transactions} />}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
          <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>
        <div className="space-y-3">
          {paymentMethods?.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              onRemove={() => {}}
              onSetDefault={() => {}}
            />
          ))}
        </div>
      </div>

      {/* Top Up Modal */}
      {showTopUp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-900">Top Up Wallet</h2>
            <p className="text-gray-500 mt-1">Add funds to your wallet balance</p>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <div className="flex gap-2">
                {[25, 50, 100, 200].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTopUpAmount(amount)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      topUpAmount === amount
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowTopUp(false)}
                className="flex-1 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleTopUp}
                disabled={topUpMutation.isPending}
                className="flex-1 py-2.5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
              >
                {topUpMutation.isPending ? "Processing..." : `Add $${topUpAmount}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
