import { Star, ThumbUp } from "@medusajs/icons"

interface Review {
  id: string
  rating: number
  title?: string
  content: string
  customerName: string
  customerAvatar?: string
  createdAt: string
  images?: string[]
  verified?: boolean
  helpfulCount?: number
}

interface ReviewCardProps {
  review: Review
  onHelpful?: (reviewId: string) => void
}

export function ReviewCard({ review, onHelpful }: ReviewCardProps) {
  return (
    <div className="border-b border-gray-200 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            {review.customerAvatar ? (
              <img src={review.customerAvatar} alt={review.customerName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
                {review.customerName.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-900">{review.customerName}</p>
            <p className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            />
          ))}
        </div>
      </div>

      {review.title && (
        <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
      )}
      
      <p className="text-gray-700 mb-3">{review.content}</p>

      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mb-3">
          {review.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Review image ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      {review.verified && (
        <p className="text-sm text-green-600 mb-3">Verified Purchase</p>
      )}

      {onHelpful && (
        <button
          onClick={() => onHelpful(review.id)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <ThumbUp className="w-4 h-4" />
          <span>Helpful ({review.helpfulCount || 0})</span>
        </button>
      )}
    </div>
  )
}
