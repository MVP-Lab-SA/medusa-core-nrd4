import { ArrowUpRightOnBox, ArrowDownTray, ReceiptPercent } from "@medusajs/icons"

interface CreditTransaction {
  id: string
  type: 'earned' | 'used' | 'expired' | 'refund'
  amount: number
  description: string
  date: string
  orderId?: string
  balance: number
}

interface CreditHistoryProps {
  transactions: CreditTransaction[]
  onViewOrder?: (orderId: string) => void
}

export function CreditHistory({ transactions, onViewOrder }: CreditHistoryProps) {
  const getIcon = (type: CreditTransaction['type']) => {
    switch (type) {
      case 'earned':
      case 'refund':
        return <ArrowDownTray className="w-4 h-4 text-green-500" />
      case 'used':
        return <ArrowUpRightOnBox className="w-4 h-4 text-red-500" />
      case 'expired':
        return <ReceiptPercent className="w-4 h-4 text-gray-400" />
    }
  }

  const getAmountColor = (type: CreditTransaction['type']) => {
    switch (type) {
      case 'earned':
      case 'refund':
        return 'text-green-600'
      case 'used':
      case 'expired':
        return 'text-red-600'
    }
  }

  const getAmountPrefix = (type: CreditTransaction['type']) => {
    switch (type) {
      case 'earned':
      case 'refund':
        return '+'
      case 'used':
      case 'expired':
        return '-'
    }
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No credit history yet</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Credit History</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {transactions.map((tx) => (
          <div key={tx.id} className="p-4 flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-full">
              {getIcon(tx.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{tx.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{new Date(tx.date).toLocaleDateString()}</span>
                {tx.orderId && onViewOrder && (
                  <button 
                    onClick={() => onViewOrder(tx.orderId!)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    View Order
                  </button>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <p className={`font-semibold ${getAmountColor(tx.type)}`}>
                {getAmountPrefix(tx.type)}${Math.abs(tx.amount).toFixed(2)}
              </p>
              <p className="text-xs text-gray-400">Balance: ${tx.balance.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
