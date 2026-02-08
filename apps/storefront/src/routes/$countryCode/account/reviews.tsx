import { createFileRoute } from "@tanstack/react-router"
import { ReviewCard, StarRating } from "~/components/reviews"
import { Star, Edit, Trash2, Package, AlertCircle } from "lucide-react"
import { useState } from "react"

export const Route = createFileRoute("/$countryCode/account/reviews")({
  component: MyReviewsPage,
})

function MyReviewsPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "published">("all")

  const reviews = [
    {
      id: "rev-1",
      productName: "Premium T-Shirt",
      productImage: "/product1.jpg",
      rating: 5,
      title: "Excellent quality!",
      content: "The fabric is super soft and the fit is perfect. Will definitely buy more colors.",
      date: "2024-01-15",
      status: "published",
      helpful: 12,
    },
    {
      id: "rev-2",
      productName: "Running Shoes",
      productImage: "/product2.jpg",
      rating: 4,
      title: "Great for daily runs",
      content: "Very comfortable and lightweight. Only minor issue is the sizing runs a bit small.",
      date: "2024-01-10",
      status: "published",
      helpful: 8,
    },
    {
      id: "rev-3",
      productName: "Wireless Earbuds",
      productImage: "/product3.jpg",
      rating: null,
      title: null,
      content: null,
      date: null,
      status: "pending",
      orderedDate: "2024-01-20",
    },
  ]

  const pendingReviews = reviews.filter(r => r.status === "pending")
  const publishedReviews = reviews.filter(r => r.status === "published")
  const filteredReviews = filter === "all" ? reviews : filter === "pending" ? pendingReviews : publishedReviews

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Reviews</h1>
          <p className="text-gray-600">Manage your product reviews</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">{publishedReviews.length}</p>
          <p className="text-gray-500 text-sm">Published Reviews</p>
        </div>
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-amber-600">{pendingReviews.length}</p>
          <p className="text-gray-500 text-sm">Awaiting Review</p>
        </div>
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-green-600">
            {publishedReviews.reduce((sum, r) => sum + (r.helpful || 0), 0)}
          </p>
          <p className="text-gray-500 text-sm">Helpful Votes</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "all", label: "All" },
          { key: "pending", label: `Pending (${pendingReviews.length})` },
          { key: "published", label: "Published" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === key
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Pending Reviews Alert */}
      {pendingReviews.length > 0 && filter !== "published" && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">You have {pendingReviews.length} product(s) waiting for your review</p>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{review.productName}</h3>
                    {review.status === "pending" ? (
                      <p className="text-sm text-amber-600">Purchased on {review.orderedDate}</p>
                    ) : (
                      <p className="text-sm text-gray-500">Reviewed on {review.date}</p>
                    )}
                  </div>
                  {review.status === "published" && (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < (review.rating || 0) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                  )}
                </div>

                {review.status === "published" ? (
                  <>
                    <p className="font-medium mt-2">{review.title}</p>
                    <p className="text-gray-600 mt-1">{review.content}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500">{review.helpful} people found this helpful</span>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1 border rounded-lg hover:bg-gray-50 text-sm">
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                      Write Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No reviews in this category</p>
        </div>
      )}
    </div>
  )
}
