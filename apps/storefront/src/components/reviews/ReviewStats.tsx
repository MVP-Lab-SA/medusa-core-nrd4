import { Star } from "@medusajs/icons"

interface ReviewStatsProps {
  averageRating: number
  totalReviews: number
  distribution: { rating: number; count: number }[]
}

export function ReviewStats({ averageRating, totalReviews, distribution }: ReviewStatsProps) {
  const maxCount = Math.max(...distribution.map((d) => d.count), 1)

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center gap-6 mb-6">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
          <div className="flex items-center justify-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i <= Math.round(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">{totalReviews} reviews</div>
        </div>
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const item = distribution.find((d) => d.rating === rating)
            const count = item?.count || 0
            const percentage = (count / maxCount) * 100

            return (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-3">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">{count}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
