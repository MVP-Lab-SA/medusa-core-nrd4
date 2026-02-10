import { createFileRoute } from "@tanstack/react-router"
import { useWallet, usePaymentMethods, useTopUpWallet } from "../../../lib/hooks/use-payments"
import { useCustomer } from "../../../lib/context/customer-context"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { Plus, CurrencyDollar, CreditCard, ArrowUpTray, ArrowDownTray } from "@medusajs/icons"
import { useState } from "react"

export const Route = createFileRoute("/$countryCode/account/wallet")({
  head: () => ({
    meta: [{ title: "My Wallet | Account | Store" }],
  }),
  component: WalletPage,
})

function WalletPage() {
  const { countryCode } = Route.useParams()
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
      <AccountLayout currentPath={`/${countryCode}/account/wallet`}>
        <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
          <p className="text-gray-400">Please log in to view your wallet.</p>
        </div>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/wallet`}>
      <h1 className="text-2xl font-bold text-white mb-8">My Wallet</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet Card */}
        <div className="lg:col-span-1">
          {walletLoading ? (
            <div className="h-40 bg-gray-800 rounded-xl animate-pulse" />
          ) : wallet ? (
            <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <CurrencyDollar className="w-6 h-6" />
                <span className="font-medium">Wallet Balance</span>
              </div>
              <p className="text-4xl font-bold mb-4">${wallet.balance.toFixed(2)}</p>
              <button
                onClick={() => setShowTopUp(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Top Up
              </button>
            </div>
          ) : null}

          {/* Quick Actions */}
          <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="font-semibold text-white mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full py-2 text-sm text-gray-400 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                Transfer Balance
              </button>
              <button className="w-full py-2 text-sm text-gray-400 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                View Statement
              </button>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Transactions</h2>
            {wallet?.transactions && wallet.transactions.length > 0 ? (
              <div className="space-y-3">
                {wallet.transactions.map((tx, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        tx.type === "credit" ? "bg-green-500/20" : "bg-red-500/20"
                      }`}>
                        {tx.type === "credit" ? (
                          <ArrowDownTray className="w-5 h-5 text-green-400" />
                        ) : (
                          <ArrowUpTray className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{tx.description}</p>
                        <p className="text-sm text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${tx.type === "credit" ? "text-green-400" : "text-red-400"}`}>
                      {tx.type === "credit" ? "+" : "-"}${tx.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No transactions yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Payment Methods</h2>
          <button className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300">
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>
        <div className="space-y-3">
          {paymentMethods?.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-gray-400" />
                <div>
                  <p className="font-medium text-white">{method.brand} ending in {method.last4}</p>
                  <p className="text-sm text-gray-500">Expires {method.expiryMonth}/{method.expiryYear}</p>
                </div>
              </div>
              {method.isDefault && (
                <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded">Default</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Top Up Modal */}
      {showTopUp && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-sm w-full mx-4">
            <h2 className="text-xl font-semibold text-white">Top Up Wallet</h2>
            <p className="text-gray-400 mt-1">Add funds to your wallet balance</p>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Amount
              </label>
              <div className="flex gap-2">
                {[25, 50, 100, 200].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTopUpAmount(amount)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      topUpAmount === amount
                        ? "bg-cyan-500 text-black"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
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
                className="flex-1 py-2.5 text-gray-400 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleTopUp}
                disabled={topUpMutation.isPending}
                className="flex-1 py-2.5 text-black bg-cyan-500 rounded-lg hover:bg-cyan-400 disabled:bg-gray-600 transition-colors"
              >
                {topUpMutation.isPending ? "Processing..." : `Add $${topUpAmount}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  )
}
