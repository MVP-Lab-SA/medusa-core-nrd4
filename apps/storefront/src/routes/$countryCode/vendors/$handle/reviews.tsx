import { createFileRoute } from "@tanstack/react-router"
import { useVendor, useVendorReviews } from "~/lib/hooks/use-marketplace"
import { VendorHeader } from "~/components/marketplace/VendorHeader"
import { ReviewCard } from "~/components/reviews/ReviewCard"
import { ReviewStats } from "~/components/reviews/ReviewStats"
import { Star } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/vendors/$handle/reviews")({
  component: VendorReviewsPage,
})

function VendorReviewsPage() {
  const { handle } = Route.useParams()
  const { data: vendor, isLoading: vendorLoading } = useVendor(handle)
  const { data: reviews, isLoading: reviewsLoading } = useVendorReviews(handle)

  if (vendorLoading || reviewsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-48 bg-gray-200 rounded-lg" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Vendor not found</h1>
        <p className="mt-2 text-gray-600">The vendor you're looking for doesn't exist.</p>
      </div>
    )
  }

  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews?.filter(r => Math.floor(r.rating) === rating).length || 0,
    percentage: reviews && reviews.length > 0
      ? (reviews.filter(r => Math.floor(r.rating) === rating).length / reviews.length) * 100
      : 0
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader vendor={vendor} activeTab="reviews" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Stats Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-5 h-5 ${star <= averageRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Based on {reviews?.length || 0} reviews
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-12">{rating} star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-8">{count}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Filter Reviews</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-600">With photos</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-600">Verified purchases</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                All Reviews ({reviews?.length || 0})
              </h2>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Most Recent</option>
                <option>Highest Rated</option>
                <option>Lowest Rated</option>
                <option>Most Helpful</option>
              </select>
            </div>

            {reviews && reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No reviews yet for this vendor.</p>
                <p className="text-sm text-gray-400 mt-2">Be the first to leave a review!</p>
              </div>
            )}

            {reviews && reviews.length > 10 && (
              <div className="mt-6 text-center">
                <button className="px-6 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
