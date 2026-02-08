import { CheckCircle, XCircle, Clock } from "@medusajs/icons"
import type { ApprovalRequest } from "../../lib/mock/marketplace"

interface ApprovalCardProps {
  request: ApprovalRequest
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
  canAction?: boolean
}

const typeLabels = {
  purchase_order: "Purchase Order",
  quote: "Quote Request",
  return: "Return Request",
  credit: "Credit Request",
}

export function ApprovalCard({ request, onApprove, onReject, canAction = true }: ApprovalCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-medium text-gray-500 uppercase">
            {typeLabels[request.type]}
          </span>
          <h4 className="font-medium text-gray-900">{request.title}</h4>
        </div>
        {request.status === "pending" ? (
          <Clock className="w-5 h-5 text-yellow-500" />
        ) : request.status === "approved" ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500" />
        )}
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{request.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Requested by {request.requestedBy}</span>
        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
      </div>

      {request.amount && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-500">Amount</span>
          <p className="text-lg font-semibold">
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
            className="flex-1 py-2 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
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
