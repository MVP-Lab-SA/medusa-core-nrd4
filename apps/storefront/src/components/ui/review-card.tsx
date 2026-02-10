import { Star, ThumbUp, CheckCircle } from "@medusajs/icons"
import type { ProductReview } from "@/lib/mock/marketplace"

interface ReviewCardProps {
  review: ProductReview
  onHelpful?: (reviewId: string) => void
}

export function ReviewCard({ review, onHelpful }: ReviewCardProps) {
  return (
    <div className="border-b border-gray-200 pb-6 last:border-0">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{review.customerName}</span>
            {review.verified && (
              <span className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle className="w-3 h-3" />
                Verified Purchase
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= review.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Title & Content */}
      <h4 className="font-medium text-gray-900 mt-3">{review.title}</h4>
      <p className="text-gray-600 mt-1">{review.content}</p>

      {/* Pros & Cons */}
      {(review.pros?.length || review.cons?.length) && (
        <div className="flex gap-6 mt-3">
          {review.pros && review.pros.length > 0 && (
            <div>
              <span className="text-sm font-medium text-green-600">Pros:</span>
              <ul className="mt-1 space-y-0.5">
                {review.pros.map((pro, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {review.cons && review.cons.length > 0 && (
            <div>
              <span className="text-sm font-medium text-red-600">Cons:</span>
              <ul className="mt-1 space-y-0.5">
                {review.cons.map((con, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mt-3">
          {review.images.map((image, i) => (
            <img
              key={i}
              src={image}
              alt={`Review image ${i + 1}`}
              className="w-16 h-16 rounded object-cover"
            />
          ))}
        </div>
      )}

      {/* Seller Response */}
      {review.response && (
        <div className="mt-3 bg-gray-50 p-3 rounded-lg">
          <span className="text-sm font-medium text-gray-900">Seller Response:</span>
          <p className="text-sm text-gray-600 mt-1">{review.response.content}</p>
          <span className="text-xs text-gray-400 mt-1 block">
            {new Date(review.response.createdAt).toLocaleDateString()}
          </span>
        </div>
      )}

      {/* Helpful */}
      <div className="mt-3 flex items-center gap-4">
        <button
          onClick={() => onHelpful?.(review.id)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ThumbUp className="w-4 h-4" />
          Helpful ({review.helpful})
        </button>
      </div>
    </div>
  )
}

interface ReviewStatsProps {
  stats: {
    averageRating: number
    totalReviews: number
    ratingDistribution: { 1: number; 2: number; 3: number; 4: number; 5: number }
    recommendationRate: number
  }
}

export function ReviewStats({ stats }: ReviewStatsProps) {
  const maxCount = Math.max(...Object.values(stats.ratingDistribution))

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{stats.averageRating}</div>
          <div className="flex items-center gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(stats.averageRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 mt-1">{stats.totalReviews} reviews</div>
        </div>

        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]
            const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0

            return (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-3">{rating}</span>
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-600">
          {stats.recommendationRate}% of customers recommend this product
        </span>
      </div>
    </div>
  )
}
