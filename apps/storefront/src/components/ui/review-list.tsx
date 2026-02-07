import * as React from "react"
import { Star, ThumbsUp, ThumbsDown, Check, ChevronDown } from "lucide-react"
import { clx } from "@medusajs/ui"

interface Review {
  id: string
  author: string
  rating: number
  title?: string
  content: string
  date: Date
  verified?: boolean
  helpful?: number
  notHelpful?: number
  images?: string[]
  recommend?: boolean
  response?: {
    author: string
    content: string
    date: Date
  }
}

interface ReviewListProps {
  reviews: Review[]
  averageRating?: number
  totalReviews?: number
  ratingDistribution?: Record<number, number>
  onHelpful?: (reviewId: string, helpful: boolean) => void
  onLoadMore?: () => void
  hasMore?: boolean
  className?: string
}

export function ReviewList({
  reviews,
  averageRating,
  totalReviews,
  ratingDistribution,
  onHelpful,
  onLoadMore,
  hasMore = false,
  className
}: ReviewListProps) {
  const [sortBy, setSortBy] = React.useState<"recent" | "helpful" | "rating">("recent")
  const [expandedImages, setExpandedImages] = React.useState<string[]>([])

  const sortedReviews = React.useMemo(() => {
    const sorted = [...reviews]
    switch (sortBy) {
      case "helpful":
        return sorted.sort((a, b) => (b.helpful || 0) - (a.helpful || 0))
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating)
      default:
        return sorted.sort((a, b) => b.date.getTime() - a.date.getTime())
    }
  }, [reviews, sortBy])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  return (
    <div className={clx("space-y-8", className)}>
      {/* Summary */}
      {(averageRating !== undefined || ratingDistribution) && (
        <div className="grid md:grid-cols-2 gap-8 p-6 rounded-xl bg-zinc-900 border border-zinc-800">
          {/* Average Rating */}
          {averageRating !== undefined && (
            <div className="text-center md:text-left">
              <div className="flex items-baseline gap-2 justify-center md:justify-start">
                <span className="text-5xl font-bold text-white">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-zinc-500">/ 5</span>
              </div>
              <div className="flex gap-1 justify-center md:justify-start my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={clx(
                      "w-5 h-5",
                      star <= Math.round(averageRating)
                        ? "text-yellow-500 fill-current"
                        : "text-zinc-600"
                    )}
                  />
                ))}
              </div>
              <p className="text-zinc-400 text-sm">
                Based on {totalReviews || reviews.length} reviews
              </p>
            </div>
          )}

          {/* Rating Distribution */}
          {ratingDistribution && (
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingDistribution[rating] || 0
                const total = Object.values(ratingDistribution).reduce((a, b) => a + b, 0)
                const percentage = total > 0 ? (count / total) * 100 : 0

                return (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-zinc-400 text-sm w-12">{rating} star</span>
                    <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-zinc-500 text-sm w-8">{count}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Sort */}
      <div className="flex items-center justify-between">
        <p className="text-zinc-400">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "recent" | "helpful" | "rating")}
          className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-cyan-500"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Reviews */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium">{review.author}</span>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-green-500 text-xs">
                      <Check className="w-3 h-3" />
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={clx(
                          "w-4 h-4",
                          star <= review.rating
                            ? "text-yellow-500 fill-current"
                            : "text-zinc-600"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-zinc-500 text-sm">{formatDate(review.date)}</span>
                </div>
              </div>
              {review.recommend !== undefined && (
                <span className={clx(
                  "text-xs px-2 py-1 rounded-full",
                  review.recommend
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                )}>
                  {review.recommend ? "Recommends" : "Does not recommend"}
                </span>
              )}
            </div>

            {/* Content */}
            {review.title && (
              <h4 className="text-white font-medium mb-2">{review.title}</h4>
            )}
            <p className="text-zinc-300 mb-4">{review.content}</p>

            {/* Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setExpandedImages([image])}
                    className="w-20 h-20 rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Response */}
            {review.response && (
              <div className="mt-4 p-4 rounded-lg bg-zinc-800/50 border-l-2 border-cyan-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-cyan-400 font-medium text-sm">
                    {review.response.author}
                  </span>
                  <span className="text-zinc-500 text-xs">
                    {formatDate(review.response.date)}
                  </span>
                </div>
                <p className="text-zinc-300 text-sm">{review.response.content}</p>
              </div>
            )}

            {/* Helpful */}
            {onHelpful && (
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800">
                <span className="text-zinc-500 text-sm">Was this helpful?</span>
                <button
                  onClick={() => onHelpful(review.id, true)}
                  className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{review.helpful || 0}</span>
                </button>
                <button
                  onClick={() => onHelpful(review.id, false)}
                  className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span className="text-sm">{review.notHelpful || 0}</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && onLoadMore && (
        <button
          onClick={onLoadMore}
          className="w-full py-3 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
        >
          Load More Reviews
          <ChevronDown className="w-4 h-4" />
        </button>
      )}

      {/* Image Modal */}
      {expandedImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setExpandedImages([])}
        >
          <img
            src={expandedImages[0]}
            alt=""
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  )
}
