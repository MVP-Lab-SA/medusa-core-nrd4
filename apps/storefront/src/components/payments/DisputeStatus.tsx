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
        return { color: 'text-blue-600', bg: 'bg-blue-100', label: 'Open' }
      case 'under_review':
        return { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Under Review' }
      case 'resolved':
        return { color: 'text-green-600', bg: 'bg-green-100', label: 'Resolved' }
      case 'rejected':
        return { color: 'text-red-600', bg: 'bg-red-100', label: 'Rejected' }
    }
  }

  const statusConfig = getStatusConfig()

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">Dispute #{dispute.id}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig.bg} ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>
        <p className="text-sm text-gray-600">{dispute.reason}</p>
        <p className="text-lg font-bold text-gray-900 mt-2">${dispute.amount.toFixed(2)}</p>
      </div>

      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Timeline</h4>
        <div className="space-y-4">
          {dispute.timeline.map((event, index) => (
            <div key={index} className="flex gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  {event.status === 'resolved' ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : event.status === 'rejected' ? (
                    <XMark className="w-4 h-4 text-red-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                {index < dispute.timeline.length - 1 && (
                  <div className="absolute top-8 left-1/2 w-0.5 h-8 bg-gray-200 -translate-x-1/2" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm font-medium text-gray-900">{event.message}</p>
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
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Resolution</h4>
          <p className="text-sm text-gray-600">{dispute.resolution}</p>
        </div>
      )}

      {(dispute.status === 'open' || dispute.status === 'under_review') && (
        <div className="p-4 border-t border-gray-200 flex gap-3">
          {onAddEvidence && (
            <button
              onClick={onAddEvidence}
              className="flex-1 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
            >
              Add Evidence
            </button>
          )}
          {onContact && (
            <button
              onClick={onContact}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
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
