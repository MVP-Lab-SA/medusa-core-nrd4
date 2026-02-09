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
  draft: "bg-gray-700 text-gray-300",
  pending: "bg-amber-500/20 text-amber-400",
  approved: "bg-emerald-500/20 text-emerald-400",
  rejected: "bg-red-500/20 text-red-400",
  expired: "bg-gray-700 text-gray-500",
  converted: "bg-cyan-500/20 text-cyan-400",
  submitted: "bg-amber-500/20 text-amber-400",
  reviewing: "bg-cyan-500/20 text-cyan-400",
  quoted: "bg-purple-500/20 text-purple-400",
  accepted: "bg-emerald-500/20 text-emerald-400",
}

export function QuoteCard({ quote, countryCode }: QuoteCardProps) {
  return (
    <Link
      to={"/$countryCode/business/quotes/$quoteId" as any}
      params={{ countryCode, quoteId: quote.id } as any}
      className="block bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-800 rounded-lg">
            <DocumentText className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h4 className="font-medium text-white">Quote #{quote.id.slice(-8)}</h4>
            <p className="text-sm text-gray-500">
              {new Date(quote.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[quote.status] || 'bg-gray-700 text-gray-300'}`}>
          {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">{quote.items.length} items</span>
        <span className="font-semibold text-white">
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
