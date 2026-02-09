import { createFileRoute } from "@tanstack/react-router"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { Star, Pencil, Trash, SquareTwoStack, BellAlert } from "@medusajs/icons"
import { useState } from "react"

export const Route = createFileRoute("/$countryCode/account/reviews")({
  component: MyReviewsPage,
})

function MyReviewsPage() {
  const { countryCode } = Route.useParams()
  const [filter, setFilter] = useState<"all" | "pending" | "published">("all")

  const reviews = [
    {
      id: "rev-1",
      productName: "Smart Security Camera Pro",
      productImage: "/product1.jpg",
      rating: 5,
      title: "Excellent quality!",
      content: "Crystal clear video quality and the night vision is amazing. Easy setup with the app.",
      date: "2024-01-15",
      status: "published" as const,
      helpful: 12,
    },
    {
      id: "rev-2",
      productName: "Smart Thermostat",
      productImage: "/product2.jpg",
      rating: 4,
      title: "Great energy savings",
      content: "Very intuitive controls and has already reduced our energy bills. Minor app connectivity issues.",
      date: "2024-01-10",
      status: "published" as const,
      helpful: 8,
    },
    {
      id: "rev-3",
      productName: "Smart Door Lock",
      productImage: "/product3.jpg",
      rating: null,
      title: null,
      content: null,
      date: null,
      status: "pending" as const,
      orderedDate: "2024-01-20",
    },
  ]

  const pendingReviews = reviews.filter(r => r.status === "pending")
  const publishedReviews = reviews.filter(r => r.status === "published")
  const filteredReviews = filter === "all" ? reviews : filter === "pending" ? pendingReviews : publishedReviews

  return (
    <AccountLayout currentPath={`/${countryCode}/account/reviews`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">My Reviews</h1>
          <p className="text-gray-400 mt-1">Manage your product reviews</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-purple-400">{publishedReviews.length}</p>
          <p className="text-gray-500 text-sm">Published Reviews</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-amber-400">{pendingReviews.length}</p>
          <p className="text-gray-500 text-sm">Awaiting Review</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-green-400">
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
                ? "bg-cyan-500 text-black"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Pending Reviews Alert */}
      {pendingReviews.length > 0 && filter !== "published" && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 text-amber-400">
            <BellAlert className="w-5 h-5" />
            <p className="font-medium">You have {pendingReviews.length} product(s) waiting for your review</p>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <SquareTwoStack className="w-8 h-8 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{review.productName}</h3>
                    {review.status === "pending" ? (
                      <p className="text-sm text-amber-400">Purchased on {review.orderedDate}</p>
                    ) : (
                      <p className="text-sm text-gray-500">Reviewed on {review.date}</p>
                    )}
                  </div>
                  {review.status === "published" && (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < (review.rating || 0) ? "fill-amber-400 text-amber-400" : "text-gray-600"}`} 
                        />
                      ))}
                    </div>
                  )}
                </div>

                {review.status === "published" ? (
                  <>
                    <p className="font-medium text-white mt-2">{review.title}</p>
                    <p className="text-gray-400 mt-1">{review.content}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500">{review.helpful} people found this helpful</span>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 text-sm">
                          <Pencil className="w-4 h-4" />
                          Edit
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 text-sm">
                          <Trash className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400">
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
        <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
          <Star className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500">No reviews in this category</p>
        </div>
      )}
    </AccountLayout>
  )
}
