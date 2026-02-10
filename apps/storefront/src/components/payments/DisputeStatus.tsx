import { Clock, Check, XMark, ChatBubble } from "@medusajs/icons"

interface DisputeStatusProps {
  dispute: {
    id: string
    status: 'open' | 'under_review' | 'resolved' | 'rejected'
    reason: string
    amount: number
    createdAt: string
    updatedAt: string
    resolution?: string
    timeline: {
      status: string
      date: string
      message: string
    }[]
  }
  onAddEvidence?: () => void
  onContact?: () => void
}

export function DisputeStatus({ dispute, onAddEvidence, onContact }: DisputeStatusProps) {
  const getStatusConfig = () => {
    switch (dispute.status) {
      case 'open':
        return { color: 'text-cyan-400', bg: 'bg-cyan-500/20', label: 'Open' }
      case 'under_review':
        return { color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Under Review' }
      case 'resolved':
        return { color: 'text-emerald-400', bg: 'bg-emerald-500/20', label: 'Resolved' }
      case 'rejected':
        return { color: 'text-red-400', bg: 'bg-red-500/20', label: 'Rejected' }
    }
  }

  const statusConfig = getStatusConfig()

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-white">Dispute #{dispute.id}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig.bg} ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>
        <p className="text-sm text-gray-400">{dispute.reason}</p>
        <p className="text-lg font-bold text-white mt-2">${dispute.amount.toFixed(2)}</p>
      </div>

      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Timeline</h4>
        <div className="space-y-4">
          {dispute.timeline.map((event, index) => (
            <div key={index} className="flex gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  {event.status === 'resolved' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : event.status === 'rejected' ? (
                    <XMark className="w-4 h-4 text-red-400" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                {index < dispute.timeline.length - 1 && (
                  <div className="absolute top-8 left-1/2 w-0.5 h-8 bg-gray-700 -translate-x-1/2" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm font-medium text-white">{event.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {dispute.resolution && (
        <div className="p-4 bg-gray-800/50 border-t border-gray-800">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Resolution</h4>
          <p className="text-sm text-gray-400">{dispute.resolution}</p>
        </div>
      )}

      {(dispute.status === 'open' || dispute.status === 'under_review') && (
        <div className="p-4 border-t border-gray-800 flex gap-3">
          {onAddEvidence && (
            <button
              onClick={onAddEvidence}
              className="flex-1 py-2 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-800"
            >
              Add Evidence
            </button>
          )}
          {onContact && (
            <button
              onClick={onContact}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-cyan-500 text-black font-medium rounded-lg text-sm hover:bg-cyan-400"
            >
              <ChatBubble className="w-4 h-4" />
              Contact Support
            </button>
          )}
        </div>
      )}
    </div>
  )
}
