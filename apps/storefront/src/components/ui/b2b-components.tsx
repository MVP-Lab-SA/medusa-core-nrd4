import { Buildings, DocumentText, Clock, Check, XMark, ExclamationCircle } from "@medusajs/icons"
import type { Company, Quote, PurchaseOrder, ApprovalRequest } from "@/lib/mock/marketplace"

// Company Card
interface CompanyCardProps {
  company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    suspended: "bg-red-100 text-red-700",
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <Buildings className="w-6 h-6 text-gray-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                statusColors[company.status]
              }`}
            >
              {company.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Tax ID: {company.taxId}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <span>{company.industry}</span>
            <span className="capitalize">{company.size} company</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
        <div>
          <span className="text-sm text-gray-500">Credit Limit</span>
          <p className="text-lg font-semibold text-gray-900">
            ${company.creditLimit.toLocaleString()}
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Available Credit</span>
          <p className="text-lg font-semibold text-green-600">
            ${(company.creditLimit - company.currentCredit).toLocaleString()}
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Payment Terms</span>
          <p className="text-gray-900">{company.paymentTerms.name}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Team Members</span>
          <p className="text-gray-900">{company.users.length}</p>
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
    draft: "bg-gray-100 text-gray-700",
    submitted: "bg-blue-100 text-blue-700",
    reviewing: "bg-yellow-100 text-yellow-700",
    quoted: "bg-purple-100 text-purple-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    expired: "bg-gray-100 text-gray-500",
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <DocumentText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Quote #{quote.id.slice(-8)}</h4>
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

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{quote.items.length} items</span>
          {quote.total > 0 && (
            <span className="font-semibold text-gray-900">
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
          className="flex-1 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          View Details
        </button>
        {quote.status === "quoted" && (
          <button
            onClick={onAccept}
            className="flex-1 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
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
    draft: "bg-gray-100 text-gray-700",
    pending_approval: "bg-yellow-100 text-yellow-700",
    approved: "bg-blue-100 text-blue-700",
    submitted: "bg-purple-100 text-purple-700",
    processing: "bg-indigo-100 text-indigo-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-gray-900">PO #{order.id.slice(-8)}</h4>
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
            <span className="text-gray-600 truncate flex-1">
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

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-500">Total</span>
          <p className="text-lg font-semibold text-gray-900">
            ${order.total.toLocaleString()}
          </p>
        </div>
        <button
          onClick={onView}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
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
    pending: <Clock className="w-5 h-5 text-yellow-500" />,
    approved: <Check className="w-5 h-5 text-green-500" />,
    rejected: <XMark className="w-5 h-5 text-red-500" />,
  }

  const typeLabels = {
    purchase_order: "Purchase Order",
    quote: "Quote Request",
    user_access: "User Access",
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
          <ExclamationCircle className="w-5 h-5 text-yellow-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">
              {typeLabels[request.type]}
            </h4>
            {statusIcons[request.status]}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Requested by {request.requestedBy}
          </p>
          {request.amount && (
            <p className="text-lg font-semibold text-gray-900 mt-2">
              ${request.amount.toLocaleString()}
            </p>
          )}
          {request.notes && (
            <p className="text-sm text-gray-600 mt-2">{request.notes}</p>
          )}
        </div>
      </div>

      {request.status === "pending" && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
          <button
            onClick={onApprove}
            className="flex-1 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
          >
            Approve
          </button>
          <button
            onClick={onReject}
            className="flex-1 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  )
}
