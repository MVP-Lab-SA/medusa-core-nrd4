import { Lock, Check, Clock, ArrowRight } from "@medusajs/icons"

interface EscrowStatusProps {
  escrow: {
    id: string
    amount: number
    status: 'held' | 'released' | 'refunded' | 'disputed'
    createdAt: string
    releaseDate?: string
    releasedAt?: string
    seller: string
    buyer: string
  }
  role: 'buyer' | 'seller'
  onRelease?: () => void
  onDispute?: () => void
}

export function EscrowStatus({ escrow, role, onRelease, onDispute }: EscrowStatusProps) {
  const getStatusConfig = () => {
    switch (escrow.status) {
      case 'held':
        return { icon: Lock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Funds Held' }
      case 'released':
        return { icon: Check, color: 'text-green-600', bg: 'bg-green-100', label: 'Released' }
      case 'refunded':
        return { icon: ArrowRight, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Refunded' }
      case 'disputed':
        return { icon: Clock, color: 'text-red-600', bg: 'bg-red-100', label: 'Disputed' }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${config.bg}`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Escrow Protection</h3>
            <p className="text-sm text-gray-500">Transaction #{escrow.id}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Amount</span>
          <span className="text-xl font-bold text-gray-900">${escrow.amount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Status</span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.color}`}>
            {config.label}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">{role === 'buyer' ? 'Seller' : 'Buyer'}</span>
          <span className="text-gray-900">{role === 'buyer' ? escrow.seller : escrow.buyer}</span>
        </div>

        {escrow.releaseDate && escrow.status === 'held' && (
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Auto-release</span>
            <span className="text-gray-900">
              {new Date(escrow.releaseDate).toLocaleDateString()}
            </span>
          </div>
        )}

        {escrow.releasedAt && (
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Released</span>
            <span className="text-gray-900">
              {new Date(escrow.releasedAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {escrow.status === 'held' && (
        <div className="p-4 border-t border-gray-200">
          {role === 'buyer' && (
            <div className="flex gap-3">
              {onRelease && (
                <button
                  onClick={onRelease}
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                >
                  Release Funds
                </button>
              )}
              {onDispute && (
                <button
                  onClick={onDispute}
                  className="flex-1 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50"
                >
                  Open Dispute
                </button>
              )}
            </div>
          )}
          {role === 'seller' && (
            <p className="text-sm text-gray-500 text-center">
              Funds will be released after buyer confirmation or on {new Date(escrow.releaseDate!).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
