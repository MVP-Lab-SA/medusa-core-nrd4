import { ArrowUpRightMini, ArrowDownMini, ReceiptPercent } from "@medusajs/icons"

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
        return <ArrowDownMini className="w-5 h-5 text-emerald-400" />
      case 'debit':
        return <ArrowUpRightMini className="w-5 h-5 text-red-400" />
      case 'refund':
        return <ReceiptPercent className="w-5 h-5 text-cyan-400" />
    }
  }

  const getAmountColor = () => {
    if (transaction.type === 'debit') return 'text-red-400'
    return 'text-emerald-400'
  }

  const getStatusBadge = () => {
    const colors = {
      completed: 'bg-emerald-500/20 text-emerald-400',
      pending: 'bg-yellow-500/20 text-yellow-400',
      failed: 'bg-red-500/20 text-red-400'
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
      className={`flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800 ${onClick ? 'cursor-pointer hover:bg-gray-800' : ''}`}
    >
      <div className="p-2 bg-gray-800 rounded-full">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-white truncate">{transaction.description}</p>
        <p className="text-sm text-gray-400">
          {new Date(transaction.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
          {transaction.reference && (
            <span className="ml-2 text-gray-500">Ref: {transaction.reference}</span>
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
