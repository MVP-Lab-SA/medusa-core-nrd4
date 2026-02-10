import { Star, Sparkles } from "@medusajs/icons"

interface PointsEarnedBannerProps {
  pointsEarned: number
  multiplier?: number
  message?: string
  variant?: 'success' | 'info' | 'promo'
}

export function PointsEarnedBanner({ 
  pointsEarned, 
  multiplier, 
  message,
  variant = 'success' 
}: PointsEarnedBannerProps) {
  const variants = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: 'text-green-500'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-500'
    },
    promo: {
      bg: 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200',
      text: 'text-purple-800',
      icon: 'text-purple-500'
    }
  }

  const style = variants[variant]

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${style.bg}`}>
      <div className={`p-2 rounded-full ${variant === 'promo' ? 'bg-purple-100' : variant === 'info' ? 'bg-blue-100' : 'bg-green-100'}`}>
        {variant === 'promo' ? (
          <Sparkles className={`w-5 h-5 ${style.icon}`} />
        ) : (
          <Star className={`w-5 h-5 ${style.icon}`} />
        )}
      </div>
      
      <div className="flex-1">
        <p className={`font-medium ${style.text}`}>
          {message || `You'll earn ${pointsEarned.toLocaleString()} points on this order!`}
        </p>
        {multiplier && multiplier > 1 && (
          <p className="text-sm text-gray-600 mt-0.5">
            Includes {multiplier}x bonus multiplier
          </p>
        )}
      </div>

      <div className="text-right">
        <p className={`text-2xl font-bold ${style.text}`}>+{pointsEarned.toLocaleString()}</p>
        <p className="text-xs text-gray-500">points</p>
      </div>
    </div>
  )
}
