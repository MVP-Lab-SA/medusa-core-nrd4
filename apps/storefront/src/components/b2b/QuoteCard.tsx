import { Link } from "@tanstack/react-router"
import { DocumentText } from "@medusajs/icons"

interface Quote {
  id: string
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'expired' | 'converted' | 'submitted' | 'reviewing' | 'quoted' | 'accepted'
  items: Array<{ id: string }>
  total: number
  currency: string
  createdAt: string
  expiresAt?: string
}

interface QuoteCardProps {
  quote: Quote
  countryCode: string
}

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  expired: "bg-gray-100 text-gray-500",
  converted: "bg-blue-100 text-blue-700",
  submitted: "bg-yellow-100 text-yellow-700",
  reviewing: "bg-blue-100 text-blue-700",
  quoted: "bg-purple-100 text-purple-700",
  accepted: "bg-green-100 text-green-700",
}

export function QuoteCard({ quote, countryCode }: QuoteCardProps) {
  return (
    <Link
      to={"/$countryCode/business/quotes/$quoteId" as any}
      params={{ countryCode, quoteId: quote.id } as any}
      className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <DocumentText className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Quote #{quote.id.slice(-8)}</h4>
            <p className="text-sm text-gray-500">
              {new Date(quote.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[quote.status] || 'bg-gray-100 text-gray-700'}`}>
          {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">{quote.items.length} items</span>
        <span className="font-semibold text-gray-900">
          {new Intl.NumberFormat("en", {
            style: "currency",
            currency: quote.currency,
          }).format(quote.total)}
        </span>
      </div>
      {quote.expiresAt && (
        <p className="text-xs text-gray-500 mt-2">
          Expires: {new Date(quote.expiresAt).toLocaleDateString()}
        </p>
      )}
    </Link>
  )
}
