import { ArrowUp, ArrowDown, ReceiptPercent } from "@medusajs/icons"

interface TransactionCardProps {
  transaction: {
    id: string
    type: 'credit' | 'debit' | 'refund'
    amount: number
    description: string
    date: string
    status: 'completed' | 'pending' | 'failed'
    reference?: string
  }
  onClick?: () => void
}

export function TransactionCard({ transaction, onClick }: TransactionCardProps) {
  const getIcon = () => {
    switch (transaction.type) {
      case 'credit':
        return <ArrowDown className="w-5 h-5 text-green-500" />
      case 'debit':
        return <ArrowUp className="w-5 h-5 text-red-500" />
      case 'refund':
        return <ReceiptPercent className="w-5 h-5 text-blue-500" />
    }
  }

  const getAmountColor = () => {
    if (transaction.type === 'debit') return 'text-red-600'
    return 'text-green-600'
  }

  const getStatusBadge = () => {
    const colors = {
      completed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      failed: 'bg-red-100 text-red-700'
    }
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${colors[transaction.status]}`}>
        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
      </span>
    )
  }

  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
    >
      <div className="p-2 bg-gray-100 rounded-full">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{transaction.description}</p>
        <p className="text-sm text-gray-500">
          {new Date(transaction.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
          {transaction.reference && (
            <span className="ml-2 text-gray-400">Ref: {transaction.reference}</span>
          )}
        </p>
      </div>

      <div className="text-right">
        <p className={`font-semibold ${getAmountColor()}`}>
          {transaction.type === 'debit' ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
        </p>
        {getStatusBadge()}
      </div>
    </div>
  )
}
