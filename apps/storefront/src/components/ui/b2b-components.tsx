import { Buildings, DocumentText, Clock, Check, XMark, ExclamationCircle } from "@medusajs/icons"
import type { Company, Quote, PurchaseOrder, ApprovalRequest } from "@/lib/mock/marketplace"

// Company Card
interface CompanyCardProps {
  company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-400",
    approved: "bg-emerald-500/20 text-emerald-400",
    suspended: "bg-red-500/20 text-red-400",
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
          <Buildings className="w-6 h-6 text-gray-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{company.name}</h3>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                statusColors[company.status]
              }`}
            >
              {company.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Tax ID: {company.taxId}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
            <span>{company.industry}</span>
            <span className="capitalize">{company.size} company</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-800">
        <div>
          <span className="text-sm text-gray-500">Credit Limit</span>
          <p className="text-lg font-semibold text-white">
            ${company.creditLimit.toLocaleString()}
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Available Credit</span>
          <p className="text-lg font-semibold text-emerald-400">
            ${(company.creditLimit - company.currentCredit).toLocaleString()}
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Payment Terms</span>
          <p className="text-white">{company.paymentTerms.name}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Team Members</span>
          <p className="text-white">{company.users.length}</p>
        </div>
      </div>
    </div>
  )
}

// Quote Card
interface QuoteCardProps {
  quote: Quote
  onView?: () => void
  onAccept?: () => void
}

export function QuoteCard({ quote, onView, onAccept }: QuoteCardProps) {
  const statusColors = {
    draft: "bg-gray-500/20 text-gray-400",
    submitted: "bg-cyan-500/20 text-cyan-400",
    reviewing: "bg-yellow-500/20 text-yellow-400",
    quoted: "bg-purple-500/20 text-purple-400",
    accepted: "bg-emerald-500/20 text-emerald-400",
    rejected: "bg-red-500/20 text-red-400",
    expired: "bg-gray-500/20 text-gray-500",
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
            <DocumentText className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h4 className="font-medium text-white">Quote #{quote.id.slice(-8)}</h4>
            <p className="text-sm text-gray-500">
              {new Date(quote.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            statusColors[quote.status]
          }`}
        >
          {quote.status}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{quote.items.length} items</span>
          {quote.total > 0 && (
            <span className="font-semibold text-white">
              ${quote.total.toLocaleString()}
            </span>
          )}
        </div>
        {quote.validUntil && (
          <p className="text-xs text-gray-500 mt-1">
            Valid until {new Date(quote.validUntil).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onView}
          className="flex-1 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          View Details
        </button>
        {quote.status === "quoted" && (
          <button
            onClick={onAccept}
            className="flex-1 py-2 text-sm font-medium text-black bg-cyan-500 rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Accept Quote
          </button>
        )}
      </div>
    </div>
  )
}

// Purchase Order Card
interface PurchaseOrderCardProps {
  order: PurchaseOrder
  onView?: () => void
}

export function PurchaseOrderCard({ order, onView }: PurchaseOrderCardProps) {
  const statusColors = {
    draft: "bg-gray-500/20 text-gray-400",
    pending_approval: "bg-yellow-500/20 text-yellow-400",
    approved: "bg-cyan-500/20 text-cyan-400",
    submitted: "bg-purple-500/20 text-purple-400",
    processing: "bg-indigo-500/20 text-indigo-400",
    completed: "bg-emerald-500/20 text-emerald-400",
    cancelled: "bg-red-500/20 text-red-400",
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-white">PO #{order.id.slice(-8)}</h4>
          <p className="text-sm text-gray-500">
            Created {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            statusColors[order.status]
          }`}
        >
          {order.status.replace("_", " ")}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        {order.items.slice(0, 2).map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <span className="text-gray-400 truncate flex-1">
              {item.productTitle}
            </span>
            <span className="text-gray-500 ml-2">x{item.quantity}</span>
          </div>
        ))}
        {order.items.length > 2 && (
          <p className="text-sm text-gray-500">
            +{order.items.length - 2} more items
          </p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-500">Total</span>
          <p className="text-lg font-semibold text-white">
            ${order.total.toLocaleString()}
          </p>
        </div>
        <button
          onClick={onView}
          className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  )
}

// Approval Request Card
interface ApprovalRequestCardProps {
  request: ApprovalRequest
  onApprove?: () => void
  onReject?: () => void
}

export function ApprovalRequestCard({
  request,
  onApprove,
  onReject,
}: ApprovalRequestCardProps) {
  const statusIcons = {
    pending: <Clock className="w-5 h-5 text-yellow-400" />,
    approved: <Check className="w-5 h-5 text-emerald-400" />,
    rejected: <XMark className="w-5 h-5 text-red-400" />,
  }

  const typeLabels = {
    purchase_order: "Purchase Order",
    quote: "Quote Request",
    user_access: "User Access",
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
          <ExclamationCircle className="w-5 h-5 text-yellow-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-white">
              {typeLabels[request.type]}
            </h4>
            {statusIcons[request.status]}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Requested by {request.requestedBy}
          </p>
          {request.amount && (
            <p className="text-lg font-semibold text-white mt-2">
              ${request.amount.toLocaleString()}
            </p>
          )}
          {request.notes && (
            <p className="text-sm text-gray-400 mt-2">{request.notes}</p>
          )}
        </div>
      </div>

      {request.status === "pending" && (
        <div className="mt-4 pt-4 border-t border-gray-800 flex gap-2">
          <button
            onClick={onApprove}
            className="flex-1 py-2 text-sm font-medium text-black bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-colors"
          >
            Approve
          </button>
          <button
            onClick={onReject}
            className="flex-1 py-2 text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  )
}
