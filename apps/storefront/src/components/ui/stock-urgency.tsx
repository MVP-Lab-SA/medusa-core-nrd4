import { ExclamationCircle, Fire, Clock } from "@medusajs/icons"

interface StockUrgencyProps {
  quantity: number
  threshold?: number
  showExact?: boolean
  recentPurchases?: number
  className?: string
}

export function StockUrgency({
  quantity,
  threshold = 10,
  showExact = false,
  recentPurchases,
  className = ""
}: StockUrgencyProps) {
  if (quantity <= 0) {
    return (
      <div className={`flex items-center gap-2 text-red-600 ${className}`}>
        <ExclamationCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Out of stock</span>
      </div>
    )
  }

  if (quantity <= threshold) {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center gap-2 text-orange-600">
          <Fire className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-medium">
            {showExact 
              ? `Only ${quantity} left in stock!`
              : quantity <= 3 
                ? `Only ${quantity} left - order soon!`
                : "Low stock - order soon!"
            }
          </span>
        </div>
        
        {recentPurchases && recentPurchases > 0 && (
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-xs">
              {recentPurchases} people bought this in the last 24 hours
            </span>
          </div>
        )}

        {/* Urgency bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-red-500 to-orange-500 h-1.5 rounded-full transition-all"
            style={{ width: `${(quantity / threshold) * 100}%` }}
          />
        </div>
      </div>
    )
  }

  return null
}

interface ViewingNowProps {
  count: number
  className?: string
}

export function ViewingNow({ count, className = "" }: ViewingNowProps) {
  if (count <= 0) return null

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <span className="text-sm text-gray-600">
        <strong>{count}</strong> {count === 1 ? "person is" : "people are"} viewing this right now
      </span>
    </div>
  )
}

interface RecentPurchaseProps {
  buyerName: string
  location: string
  timeAgo: string
  productTitle?: string
  className?: string
}

export function RecentPurchase({
  buyerName,
  location,
  timeAgo,
  productTitle,
  className = ""
}: RecentPurchaseProps) {
  return (
    <div className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg ${className}`}>
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">
          <strong>{buyerName}</strong> from {location}
        </p>
        <p className="text-xs text-gray-500">
          {productTitle ? `Purchased ${productTitle}` : "Made a purchase"} {timeAgo}
        </p>
      </div>
    </div>
  )
}
