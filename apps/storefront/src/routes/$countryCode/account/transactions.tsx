import { createFileRoute } from "@tanstack/react-router"
import { useWallet } from "../../../lib/hooks/use-payments"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { CurrencyDollar, ArrowUpRightMini, ArrowDownTray, Clock } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/account/transactions")({
  component: TransactionsPage,
})

function TransactionsPage() {
  const { countryCode } = Route.useParams()
  const { data: wallet, isLoading } = useWallet()

  const transactions = wallet?.transactions || []

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "credit":
      case "refund":
        return <ArrowDownTray className="w-4 h-4 text-green-400" />
      case "debit":
      case "purchase":
        return <ArrowUpRightMini className="w-4 h-4 text-red-400" />
      default:
        return <CurrencyDollar className="w-4 h-4 text-gray-400" />
    }
  }

  const formatAmount = (amount: number, type: string) => {
    const isPositive = type === "credit" || type === "refund"
    const prefix = isPositive ? "+" : "-"
    return `${prefix}$${Math.abs(amount).toFixed(2)}`
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/transactions`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Transaction History</h1>
          <p className="text-gray-400 mt-1">View all your account transactions</p>
        </div>
      </div>

      {/* Summary Cards */}
      {wallet && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="text-2xl font-bold text-cyan-400">${wallet.balance?.toFixed(2) || "0.00"}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-500">Total Credits</p>
            <p className="text-2xl font-bold text-green-400">
              ${transactions.filter(t => t.type === "credit" || t.type === "refund").reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-500">Total Spent</p>
            <p className="text-2xl font-bold text-white">
              ${transactions.filter(t => t.type === "debit" || t.type === "purchase").reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : transactions.length > 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="divide-y divide-gray-800">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{transaction.description || transaction.type}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <span className={`font-semibold ${
                  transaction.type === "credit" || transaction.type === "refund"
                    ? "text-green-400"
                    : "text-white"
                }`}>
                  {formatAmount(transaction.amount, transaction.type)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800">
          <CurrencyDollar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No transactions found</p>
          <p className="text-sm text-gray-500 mt-2">
            Your transaction history will appear here
          </p>
        </div>
      )}
    </AccountLayout>
  )
}
