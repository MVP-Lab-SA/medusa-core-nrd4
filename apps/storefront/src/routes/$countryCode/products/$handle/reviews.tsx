import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star, ThumbsUp, Camera, Funnel, ChevronDownMini } from "@medusajs/icons";

export const Route = createFileRoute("/$countryCode/products/$handle/reviews")({
  component: ProductReviewsPage,
});

// Mock reviews data
const mockReviews = [
  {
    id: "rev_1",
    author: "Sarah M.",
    avatar: null,
    rating: 5,
    title: "Absolutely love it!",
    content: "This product exceeded my expectations. The quality is outstanding and it arrived quickly. Would definitely recommend to anyone looking for this type of product.",
    date: "2024-01-15",
    verified: true,
    helpful: 24,
    images: ["/placeholder-review-1.jpg", "/placeholder-review-2.jpg"],
    variant: "Blue / Large",
  },
  {
    id: "rev_2",
    author: "Michael R.",
    avatar: null,
    rating: 4,
    title: "Great product, minor issues",
    content: "Overall a solid purchase. The product works well but the packaging could be better. Would buy again.",
    date: "2024-01-10",
    verified: true,
    helpful: 12,
    images: [],
    variant: "Black / Medium",
  },
  {
    id: "rev_3",
    author: "Emily L.",
    avatar: null,
    rating: 5,
    title: "Perfect fit!",
    content: "Exactly what I was looking for. True to size and great quality materials.",
    date: "2024-01-05",
    verified: false,
    helpful: 8,
    images: ["/placeholder-review-3.jpg"],
    variant: "White / Small",
  },
  {
    id: "rev_4",
    author: "James K.",
    avatar: null,
    rating: 3,
    title: "Good but not great",
    content: "The product is decent for the price but I expected better quality. Shipping was fast though.",
    date: "2024-01-02",
    verified: true,
    helpful: 5,
    images: [],
    variant: "Gray / Large",
  },
  {
    id: "rev_5",
    author: "Amanda T.",
    avatar: null,
    rating: 5,
    title: "Best purchase this year!",
    content: "I've bought many similar products and this one is by far the best. The attention to detail is remarkable.",
    date: "2023-12-28",
    verified: true,
    helpful: 31,
    images: ["/placeholder-review-4.jpg", "/placeholder-review-5.jpg"],
    variant: "Navy / Medium",
  },
];

const ratingBreakdown = {
  5: 68,
  4: 20,
  3: 8,
  2: 3,
  1: 1,
};

function ProductReviewsPage() {
  const { handle } = Route.useParams();
  const [sortBy, setSortBy] = useState("most_recent");
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showPhotosOnly, setShowPhotosOnly] = useState(false);

  const totalReviews = Object.values(ratingBreakdown).reduce((a, b) => a + b, 0);
  const averageRating = (
    Object.entries(ratingBreakdown).reduce(
      (acc, [rating, count]) => acc + parseInt(rating) * count,
      0
    ) / totalReviews
  ).toFixed(1);

  const filteredReviews = mockReviews.filter((review) => {
    if (filterRating && review.rating !== filterRating) return false;
    if (showPhotosOnly && review.images.length === 0) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-city-dark">
      {/* Header */}
      <div className="bg-city-navy border-b border-city-steel">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="text-sm text-city-muted mb-4">
            <a href={`/products/${handle}`} className="hover:text-city-white transition-colors">
              Product
            </a>
            <span className="mx-2">/</span>
            <span className="text-city-white">Reviews</span>
          </nav>
          <h1 className="text-3xl font-bold text-city-white">Customer Reviews</h1>
          <p className="text-city-gray mt-2">
            Read what our customers have to say about this product
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Rating Summary */}
          <div className="lg:col-span-1">
            <div className="bg-city-navy border border-city-steel rounded-xl p-6 sticky top-4">
              {/* Overall Rating */}
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-city-white">{averageRating}</div>
                <div className="flex justify-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(parseFloat(averageRating))
                          ? "text-amber-400"
                          : "text-city-steel"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-city-muted">{totalReviews} reviews</p>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2 mb-6">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingBreakdown[rating as keyof typeof ratingBreakdown];
                  const percentage = (count / totalReviews) * 100;
                  return (
                    <button
                      key={rating}
                      onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                      className={`w-full flex items-center gap-2 text-sm hover:bg-city-slate p-1 rounded transition-colors ${
                        filterRating === rating ? "bg-city-slate" : ""
                      }`}
                    >
                      <span className="w-3 text-city-white">{rating}</span>
                      <Star className="w-4 h-4 text-amber-400" />
                      <div className="flex-1 h-2 bg-city-steel rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-city-muted">{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Filters */}
              <div className="border-t border-city-steel pt-4">
                <h3 className="font-medium text-city-white mb-3">Filters</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPhotosOnly}
                    onChange={(e) => setShowPhotosOnly(e.target.checked)}
                    className="rounded border-city-steel bg-city-slate text-city-cyan focus:ring-city-cyan"
                  />
                  <Camera className="w-4 h-4 text-city-muted" />
                  <span className="text-sm text-city-gray">With photos only</span>
                </label>
              </div>

              {/* Clear Filters */}
              {(filterRating || showPhotosOnly) && (
                <button
                  onClick={() => {
                    setFilterRating(null);
                    setShowPhotosOnly(false);
                  }}
                  className="w-full mt-4 text-sm text-city-cyan hover:text-city-cyan-light transition-colors"
                >
                  Clear all filters
                </button>
              )}

              {/* Write Review CTA */}
              <button className="w-full mt-6 bg-city-cyan text-city-dark py-3 rounded-lg font-medium hover:bg-city-cyan-light transition-colors">
                Write a Review
              </button>
            </div>
          </div>

          {/* Main Content - Reviews List */}
          <div className="lg:col-span-3">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-city-gray">
                Showing {filteredReviews.length} of {mockReviews.length} reviews
              </p>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-city-navy border border-city-steel rounded-lg px-4 py-2 pr-10 text-sm text-city-white focus:outline-none focus:border-city-cyan transition-colors"
                >
                  <option value="most_recent">Most Recent</option>
                  <option value="highest_rated">Highest Rated</option>
                  <option value="lowest_rated">Lowest Rated</option>
                  <option value="most_helpful">Most Helpful</option>
                </select>
                <ChevronDownMini className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-city-muted pointer-events-none" />
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="bg-city-navy border border-city-steel rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-city-slate rounded-full flex items-center justify-center">
                        <span className="text-city-gray font-medium">
                          {review.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-city-white">{review.author}</span>
                          {review.verified && (
                            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-city-muted">{review.variant}</p>
                      </div>
                    </div>
                    <time className="text-sm text-city-muted">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? "text-amber-400"
                              : "text-city-steel"
                          }`}
                        />
                      ))}
                    </div>
                    <h3 className="font-medium text-city-white">{review.title}</h3>
                  </div>

                  <p className="text-city-gray mb-4">{review.content}</p>

                  {review.images.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.images.map((image, idx) => (
                        <div
                          key={idx}
                          className="w-20 h-20 bg-city-slate rounded-lg overflow-hidden"
                        >
                          <div className="w-full h-full flex items-center justify-center text-city-muted">
                            <Camera className="w-6 h-6" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-4 border-t border-city-steel/50">
                    <button className="flex items-center gap-1 text-sm text-city-muted hover:text-city-white transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="text-sm text-city-muted hover:text-city-white transition-colors">
                      Report
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <div className="bg-city-navy border border-city-steel rounded-xl p-12 text-center">
                <Funnel className="w-12 h-12 text-city-steel mx-auto mb-4" />
                <h3 className="text-lg font-medium text-city-white mb-2">No reviews found</h3>
                <p className="text-city-gray">
                  Try adjusting your filters to see more reviews.
                </p>
              </div>
            )}

            {/* Load More */}
            {filteredReviews.length > 0 && (
              <div className="text-center mt-8">
                <button className="px-8 py-3 border border-city-steel rounded-lg text-city-white hover:bg-city-slate transition-colors">
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
