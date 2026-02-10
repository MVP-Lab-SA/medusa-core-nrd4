import { ArrowUpTray, ArrowDownTray, ArrowPath } from "@medusajs/icons"

interface WalletTransaction {
  id: string
  type: "credit" | "debit" | "transfer"
  amount: number
  description: string
  createdAt: string
  status: "completed" | "pending" | "failed"
}

interface TransactionHistoryProps {
  transactions: WalletTransaction[]
  currency: string
}

const typeIcons = {
  credit: ArrowDownTray,
  debit: ArrowUpTray,
  transfer: ArrowPath,
}

const typeColors = {
  credit: "text-green-600 bg-green-100",
  debit: "text-red-600 bg-red-100",
  transfer: "text-blue-600 bg-blue-100",
}

export function TransactionHistory({ transactions, currency }: TransactionHistoryProps) {
  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  })

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No transactions yet
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-100">
      {transactions.map((tx) => {
        const Icon = typeIcons[tx.type]
        const colorClass = typeColors[tx.type]

        return (
          <div key={tx.id} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${colorClass}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{tx.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(tx.createdAt).toLocaleDateString("en", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${tx.type === "credit" ? "text-green-600" : "text-gray-900"}`}>
                {tx.type === "credit" ? "+" : "-"}{formatter.format(tx.amount)}
              </p>
              <p className="text-xs text-gray-500 capitalize">{tx.status}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
