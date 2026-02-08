import { createFileRoute } from "@tanstack/react-router"
import { useWallet } from "../../../lib/hooks/use-payments"
import { TransactionHistory } from "../../../components/payments/TransactionHistory"

export const Route = createFileRoute("/$countryCode/account/transactions")({
  component: TransactionsPage,
})

function TransactionsPage() {
  const { data: wallet, isLoading } = useWallet()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Transaction History</h1>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : wallet ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <TransactionHistory
              transactions={wallet.transactions}
              currency={wallet.currency}
            />
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  )
}
