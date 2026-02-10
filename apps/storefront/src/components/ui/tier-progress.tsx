import { Star, Check, LockClosedSolid } from "@medusajs/icons"

interface Tier {
  id: string
  name: string
  minPoints: number
  benefits: string[]
  color: string
}

interface TierProgressProps {
  tiers: Tier[]
  currentPoints: number
  currentTier: string
  className?: string
}

export function TierProgress({
  tiers,
  currentPoints,
  currentTier,
  className = ""
}: TierProgressProps) {
  const currentTierIndex = tiers.findIndex(t => t.id === currentTier)
  const maxPoints = tiers[tiers.length - 1]?.minPoints || 10000

  return (
    <div className={className}>
      <h3 className="font-medium text-gray-900 mb-6">Your VIP Status</h3>

      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
            style={{ width: `${Math.min((currentPoints / maxPoints) * 100, 100)}%` }}
          />
        </div>

        {/* Tier Markers */}
        <div className="flex justify-between mt-1">
          {tiers.map((tier, idx) => {
            const position = (tier.minPoints / maxPoints) * 100
            const isUnlocked = currentPoints >= tier.minPoints
            const isCurrent = tier.id === currentTier

            return (
              <div
                key={tier.id}
                className="flex flex-col items-center"
                style={{ 
                  position: 'absolute',
                  left: `${position}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isUnlocked 
                    ? `bg-gradient-to-r ${tier.color} text-white` 
                    : "bg-gray-200 text-gray-400"
                } ${isCurrent ? "ring-2 ring-offset-2 ring-purple-500" : ""}`}>
                  {isUnlocked ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <LockClosedSolid className="w-4 h-4" />
                  )}
                </div>
                <span className={`text-xs mt-1 whitespace-nowrap ${
                  isCurrent ? "font-semibold text-purple-600" : "text-gray-500"
                }`}>
                  {tier.name}
                </span>
                <span className="text-xs text-gray-400">
                  {tier.minPoints.toLocaleString()} pts
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Current Tier Benefits */}
      <div className="mt-16 p-4 bg-purple-50 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-5 h-5 text-purple-600" />
          <h4 className="font-medium text-gray-900">
            Your {tiers[currentTierIndex]?.name || "Member"} Benefits
          </h4>
        </div>
        <ul className="space-y-2">
          {tiers[currentTierIndex]?.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
              <Check className="w-4 h-4 text-purple-500" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Next Tier Preview */}
      {currentTierIndex < tiers.length - 1 && (
        <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <LockClosedSolid className="w-5 h-5 text-gray-400" />
            <h4 className="font-medium text-gray-900">
              Unlock {tiers[currentTierIndex + 1].name}
            </h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Earn {(tiers[currentTierIndex + 1].minPoints - currentPoints).toLocaleString()} more points to unlock:
          </p>
          <ul className="space-y-2">
            {tiers[currentTierIndex + 1].benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-4 h-4 rounded-full border border-gray-300" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
