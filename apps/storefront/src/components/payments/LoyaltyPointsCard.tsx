import { Sparkles, Gift, ArrowRight } from "@medusajs/icons"

interface LoyaltyAccount {
  points: number
  tierName: string
  nextTierName?: string
  nextTierPoints?: number
  currency: string
  pointsValue: number
}

interface LoyaltyPointsCardProps {
  account: LoyaltyAccount
  onRedeem?: () => void
  onViewHistory?: () => void
}

export function LoyaltyPointsCard({ account, onRedeem, onViewHistory }: LoyaltyPointsCardProps) {
  const pointsToNextTier = account.nextTierPoints ? account.nextTierPoints - account.points : null

  return (
    <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-white/70 text-sm">{account.tierName} Member</p>
            <h2 className="text-3xl font-bold">{account.points.toLocaleString()}</h2>
            <p className="text-white/70 text-sm">Points</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white/70 text-sm">Worth</p>
          <p className="text-xl font-semibold">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: account.currency,
            }).format(account.pointsValue)}
          </p>
        </div>
      </div>

      {pointsToNextTier && account.nextTierName && (
        <div className="mb-4 p-3 bg-white/10 rounded-lg">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white/70">Progress to {account.nextTierName}</span>
            <span>{pointsToNextTier.toLocaleString()} points to go</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full"
              style={{
                width: `${Math.min((account.points / account.nextTierPoints!) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {onRedeem && (
          <button
            onClick={onRedeem}
            className="flex-1 py-3 px-4 bg-black text-amber-400 font-medium rounded-lg hover:bg-gray-900 flex items-center justify-center gap-2"
          >
            <Gift className="w-4 h-4" />
            Redeem Points
          </button>
        )}
        {onViewHistory && (
          <button
            onClick={onViewHistory}
            className="flex-1 py-3 px-4 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 flex items-center justify-center gap-2"
          >
            History
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
