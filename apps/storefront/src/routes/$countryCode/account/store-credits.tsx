import { createFileRoute } from "@tanstack/react-router"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { CurrencyDollar, Plus, Clock, ArrowDownTray, ArrowUpRightMini } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/account/store-credits")({
  component: StoreCreditsPage,
})

function StoreCreditsPage() {
  const { countryCode } = Route.useParams()

  // Mock data - would come from a hook in production
  const storeCredits = {
    balance: 125.50,
    currency: "USD",
    history: [
      { id: "1", type: "credit", amount: 50, description: "Return refund - Order #1234", date: "2024-01-15" },
      { id: "2", type: "credit", amount: 100, description: "Gift card redemption", date: "2024-01-10" },
      { id: "3", type: "debit", amount: 24.50, description: "Applied to Order #1256", date: "2024-01-18" },
    ]
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/store-credits`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Store Credits</h1>
          <p className="text-gray-400 mt-1">Manage your store credit balance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400">
          <Plus className="w-4 h-4" />
          Add Gift Card
        </button>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-cyan-300 text-sm font-medium mb-1">Available Balance</p>
            <p className="text-4xl font-bold text-white">${storeCredits.balance.toFixed(2)}</p>
            <p className="text-gray-400 text-sm mt-2">Use at checkout for instant savings</p>
          </div>
          <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center">
            <CurrencyDollar className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Redeem Gift Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Redeem Gift Card</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter gift card code"
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button className="px-6 py-3 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors">
            Redeem
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Credit History</h2>
        </div>
        
        {storeCredits.history.length > 0 ? (
          <div className="divide-y divide-gray-800">
            {storeCredits.history.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === "credit" ? "bg-green-500/20" : "bg-gray-700"
                  }`}>
                    {transaction.type === "credit" 
                      ? <ArrowDownTray className="w-4 h-4 text-green-400" />
                      : <ArrowUpRightMini className="w-4 h-4 text-gray-400" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-white">{transaction.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <span className={`font-semibold ${
                  transaction.type === "credit" ? "text-green-400" : "text-white"
                }`}>
                  {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No credit history yet</p>
          </div>
        )}
      </div>
    </AccountLayout>
  )
}
