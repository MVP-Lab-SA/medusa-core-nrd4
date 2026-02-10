import { CheckCircle, XCircle, Clock } from "@medusajs/icons"

interface ApprovalRequest {
  id: string
  type: 'purchase_order' | 'quote' | 'return' | 'credit' | 'user_access'
  title: string
  description: string
  status: 'pending' | 'approved' | 'rejected'
  requestedBy: string
  createdAt: string
  amount?: number
  currency?: string
}

interface ApprovalCardProps {
  request: ApprovalRequest
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
  canAction?: boolean
}

const typeLabels: Record<string, string> = {
  purchase_order: "Purchase Order",
  quote: "Quote Request",
  return: "Return Request",
  credit: "Credit Request",
  user_access: "User Access",
}

export function ApprovalCard({ request, onApprove, onReject, canAction = true }: ApprovalCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-medium text-gray-500 uppercase">
            {typeLabels[request.type] || request.type}
          </span>
          <h4 className="font-medium text-white">{request.title}</h4>
        </div>
        {request.status === "pending" ? (
          <Clock className="w-5 h-5 text-amber-400" />
        ) : request.status === "approved" ? (
          <CheckCircle className="w-5 h-5 text-emerald-400" />
        ) : (
          <XCircle className="w-5 h-5 text-red-400" />
        )}
      </div>
      
      <p className="text-sm text-gray-400 mb-3">{request.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Requested by {request.requestedBy}</span>
        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
      </div>

      {request.amount && (
        <div className="mb-4 p-3 bg-gray-800 rounded-lg">
          <span className="text-sm text-gray-500">Amount</span>
          <p className="text-lg font-semibold text-white">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: request.currency || "USD",
            }).format(request.amount)}
          </p>
        </div>
      )}

      {request.status === "pending" && canAction && (
        <div className="flex gap-3">
          <button
            onClick={() => onApprove?.(request.id)}
            className="flex-1 py-2 px-4 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700"
          >
            Approve
          </button>
          <button
            onClick={() => onReject?.(request.id)}
            className="flex-1 py-2 px-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  )
}
