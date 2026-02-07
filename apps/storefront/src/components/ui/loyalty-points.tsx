import { Star, GiftSolid, ArrowTrendingUp } from "@medusajs/icons"
import { Button } from "./button"

interface LoyaltyPointsProps {
  points: number
  pointsValue?: number
  tier?: string
  nextTier?: string
  pointsToNextTier?: number
  expiringPoints?: { amount: number; date: string }
  currency?: string
  className?: string
}

export function LoyaltyPoints({
  points,
  pointsValue,
  tier = "Silver",
  nextTier = "Gold",
  pointsToNextTier = 500,
  expiringPoints,
  currency = "USD",
  className = ""
}: LoyaltyPointsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(amount)
  }

  const progress = pointsToNextTier > 0 
    ? Math.min(((points % (points + pointsToNextTier)) / (points + pointsToNextTier)) * 100, 100)
    : 100

  return (
    <div className={`bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6" />
          <span className="font-medium">{tier} Member</span>
        </div>
        <span className="text-sm opacity-80">Rewards Program</span>
      </div>

      <div className="mb-6">
        <p className="text-4xl font-bold">{points.toLocaleString()}</p>
        <p className="text-sm opacity-80">Available points</p>
        {pointsValue && (
          <p className="text-sm mt-1">
            Worth {formatCurrency(pointsValue)} in rewards
          </p>
        )}
      </div>

      {/* Progress to next tier */}
      {pointsToNextTier > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Progress to {nextTier}</span>
            <span>{pointsToNextTier} points needed</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Expiring Points Warning */}
      {expiringPoints && expiringPoints.amount > 0 && (
        <div className="bg-white/20 rounded-lg p-3 mb-4">
          <p className="text-sm">
            <strong>{expiringPoints.amount.toLocaleString()} points</strong> expiring on {expiringPoints.date}
          </p>
        </div>
      )}

      <Button variant="outline" className="w-full bg-white/20 border-white/40 text-white hover:bg-white/30">
        <GiftSolid className="w-4 h-4 mr-2" />
        Redeem Points
      </Button>
    </div>
  )
}

interface PointsHistoryItem {
  id: string
  description: string
  points: number
  type: "earned" | "redeemed" | "expired"
  date: string
}

interface PointsHistoryProps {
  items: PointsHistoryItem[]
  className?: string
}

export function PointsHistory({ items, className = "" }: PointsHistoryProps) {
  return (
    <div className={className}>
      <h3 className="font-medium text-gray-900 mb-4">Points History</h3>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">{item.description}</p>
              <p className="text-xs text-gray-500">{item.date}</p>
            </div>
            <span className={`font-semibold ${
              item.type === "earned" ? "text-green-600" : 
              item.type === "redeemed" ? "text-blue-600" : "text-red-500"
            }`}>
              {item.type === "earned" ? "+" : "-"}{item.points.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
