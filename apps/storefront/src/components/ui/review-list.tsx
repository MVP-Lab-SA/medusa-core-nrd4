import { useState } from "react"
import { clx } from "@medusajs/ui"
import { Star, ThumbUp, Check } from "@medusajs/icons"

interface Review {
  id: string
  rating: number
  title: string
  content: string
  author: string
  date: string
  verified?: boolean
  helpful?: number
  recommend?: boolean
}

interface ReviewListProps {
  reviews: Review[]
  totalReviews?: number
  averageRating?: number
  ratingDistribution?: { rating: number; count: number }[]
  onLoadMore?: () => void
  onHelpful?: (reviewId: string) => void
  hasMore?: boolean
  className?: string
}

export function ReviewList({
  reviews,
  totalReviews,
  averageRating,
  ratingDistribution,
  onLoadMore,
  onHelpful,
  hasMore = false,
  className,
}: ReviewListProps) {
  const [sortBy, setSortBy] = useState<"newest" | "highest" | "lowest" | "helpful">("newest")

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      case "helpful":
        return (b.helpful || 0) - (a.helpful || 0)
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
    const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5"
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={clx(
              sizeClass,
              star <= rating ? "text-amber-400" : "text-neutral-600"
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Summary */}
      {(averageRating !== undefined || totalReviews !== undefined) && (
        <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-neutral-800">
          {averageRating !== undefined && (
            <div className="text-center md:text-left">
              <div className="text-5xl font-bold text-white mb-2">
                {averageRating.toFixed(1)}
              </div>
              {renderStars(Math.round(averageRating), "md")}
              {totalReviews !== undefined && (
                <p className="text-sm text-neutral-500 mt-2">
                  Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          )}

          {ratingDistribution && (
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const item = ratingDistribution.find((d) => d.rating === rating)
                const count = item?.count || 0
                const total = ratingDistribution.reduce((acc, d) => acc + d.count, 0)
                const percentage = total > 0 ? (count / total) * 100 : 0

                return (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm text-neutral-400 w-8">{rating} star</span>
                    <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-neutral-500 w-8">{count}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Sort */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">
          {reviews.length} Review{reviews.length !== 1 ? "s" : ""}
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="newest">Newest</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {/* Reviews */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                {renderStars(review.rating)}
                <h4 className="text-white font-medium mt-2">{review.title}</h4>
              </div>
              {review.recommend && (
                <span className="flex items-center gap-1 text-xs text-emerald-400">
                  <Check className="w-3 h-3" />
                  Recommends
                </span>
              )}
            </div>

            <p className="text-neutral-300 text-sm mb-4">{review.content}</p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-neutral-500">
                <span className="font-medium text-neutral-400">{review.author}</span>
                {review.verified && (
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded">
                    Verified Purchase
                  </span>
                )}
                <span>-</span>
                <span>{new Date(review.date).toLocaleDateString()}</span>
              </div>

              {onHelpful && (
                <button
                  onClick={() => onHelpful(review.id)}
                  className="flex items-center gap-1.5 text-neutral-500 hover:text-white transition-colors"
                >
                  <ThumbUp className="w-4 h-4" />
                  Helpful {review.helpful ? `(${review.helpful})` : ""}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {hasMore && onLoadMore && (
        <div className="mt-8 text-center">
          <button
            onClick={onLoadMore}
            className="px-6 py-3 border border-neutral-700 text-white font-medium rounded-lg hover:border-neutral-500 transition-colors"
          >
            Load More Reviews
          </button>
        </div>
      )}

      {reviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-400">No reviews yet. Be the first to review!</p>
        </div>
      )}
    </div>
  )
}
