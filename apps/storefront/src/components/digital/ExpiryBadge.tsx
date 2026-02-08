import { Clock, ExclamationCircle } from "@medusajs/icons"

interface ExpiryBadgeProps {
  expiresAt: string
  showCountdown?: boolean
}

export function ExpiryBadge({ expiresAt, showCountdown = true }: ExpiryBadgeProps) {
  const expiryDate = new Date(expiresAt)
  const now = new Date()
  const isExpired = expiryDate < now
  
  const timeDiff = expiryDate.getTime() - now.getTime()
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
  const hoursLeft = Math.ceil(timeDiff / (1000 * 60 * 60))

  const getTimeText = () => {
    if (isExpired) return 'Expired'
    if (daysLeft > 30) return `Expires ${expiryDate.toLocaleDateString()}`
    if (daysLeft > 1) return `${daysLeft} days left`
    if (hoursLeft > 1) return `${hoursLeft} hours left`
    return 'Expires soon'
  }

  const getColorClass = () => {
    if (isExpired) return 'bg-red-100 text-red-700 border-red-200'
    if (daysLeft <= 3) return 'bg-orange-100 text-orange-700 border-orange-200'
    if (daysLeft <= 7) return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    return 'bg-gray-100 text-gray-700 border-gray-200'
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${getColorClass()}`}>
      {isExpired ? (
        <ExclamationCircle className="w-3.5 h-3.5" />
      ) : (
        <Clock className="w-3.5 h-3.5" />
      )}
      {showCountdown ? getTimeText() : `Expires ${expiryDate.toLocaleDateString()}`}
    </span>
  )
}
