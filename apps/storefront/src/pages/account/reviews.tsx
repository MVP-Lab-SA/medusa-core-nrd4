import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Star, StarSolid, PencilSquare, Trash, Clock, Check } from "@medusajs/icons"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountPageHeader,
  AccountCard,
  AccountButton,
  AccountEmptyState,
  AccountSkeleton,
  AccountBadge,
  AccountTabs,
} from "@/components/account/AccountUI"

interface ReviewsPageProps {
  countryCode: string
}

// Mock data
const mockReviews = [
  {
    id: "rev_1",
    productId: "prod_1",
    productName: "Wireless Headphones",
    productImage: null,
    rating: 5,
    title: "Amazing sound quality",
    content: "These headphones exceeded my expectations. The noise cancellation is incredible and battery life is great.",
    status: "published",
    helpful: 12,
    createdAt: "2024-01-15",
  },
  {
    id: "rev_2",
    productId: "prod_2",
    productName: "Smart Watch",
    productImage: null,
    rating: 4,
    title: "Great features, good value",
    content: "Really enjoy the fitness tracking features. The only downside is the battery needs charging every 2 days.",
    status: "published",
    helpful: 8,
    createdAt: "2024-02-20",
  },
  {
    id: "rev_3",
    productId: "prod_3",
    productName: "Laptop Stand",
    productImage: null,
    rating: 3,
    title: "Decent but could be sturdier",
    content: "Works fine for light laptops but wobbles a bit with heavier ones.",
    status: "pending",
    helpful: 0,
    createdAt: "2024-03-10",
  },
]

const pendingProducts = [
  { id: "prod_4", name: "Mechanical Keyboard", image: null, orderedAt: "2024-03-01" },
  { id: "prod_5", name: "USB Hub", image: null, orderedAt: "2024-03-05" },
]

export function AccountReviewsPage({ countryCode }: ReviewsPageProps) {
  const [activeTab, setActiveTab] = useState("published")
  const isLoading = false

  const publishedReviews = mockReviews.filter(r => r.status === "published")
  const pendingReviews = mockReviews.filter(r => r.status === "pending")

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          star <= rating ? (
            <StarSolid key={star} className="w-4 h-4 text-yellow-400" />
          ) : (
            <Star key={star} className="w-4 h-4 text-gray-600" />
          )
        ))}
      </div>
    )
  }

  const tabs = [
    { id: "published", label: "Published", count: publishedReviews.length },
    { id: "pending", label: "Pending", count: pendingReviews.length },
    { id: "to-review", label: "To Review", count: pendingProducts.length },
  ]

  return (
    <AccountLayout currentPath={`/${countryCode}/account/reviews`}>
      <AccountPageHeader
        title="My Reviews"
        description="Manage your product reviews"
        breadcrumbs={[
          { label: "Account", href: `/${countryCode}/account` },
          { label: "Reviews" },
        ]}
      />

      <AccountTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      />

      {isLoading ? (
        <div className="space-y-4">
          <AccountSkeleton height="h-40" />
          <AccountSkeleton height="h-40" />
        </div>
      ) : (
        <>
          {activeTab === "published" && (
            publishedReviews.length > 0 ? (
              <div className="space-y-4">
                {publishedReviews.map((review) => (
                  <ReviewCard 
                    key={review.id} 
                    review={review} 
                    countryCode={countryCode}
                    renderStars={renderStars}
                  />
                ))}
              </div>
            ) : (
              <AccountEmptyState
                icon={<Star className="w-12 h-12" />}
                title="No published reviews"
                description="Your approved reviews will appear here"
              />
            )
          )}

          {activeTab === "pending" && (
            pendingReviews.length > 0 ? (
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <ReviewCard 
                    key={review.id} 
                    review={review} 
                    countryCode={countryCode}
                    renderStars={renderStars}
                    isPending
                  />
                ))}
              </div>
            ) : (
              <AccountEmptyState
                icon={<Clock className="w-12 h-12" />}
                title="No pending reviews"
                description="Reviews waiting for approval will appear here"
              />
            )
          )}

          {activeTab === "to-review" && (
            pendingProducts.length > 0 ? (
              <div className="space-y-4">
                {pendingProducts.map((product) => (
                  <AccountCard key={product.id}>
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <Star className="w-6 h-6 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{product.name}</h3>
                          <p className="text-sm text-gray-500">
                            Ordered {new Date(product.orderedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <AccountButton>
                        <PencilSquare className="w-4 h-4 mr-2" />
                        Write Review
                      </AccountButton>
                    </div>
                  </AccountCard>
                ))}
              </div>
            ) : (
              <AccountEmptyState
                icon={<Check className="w-12 h-12" />}
                title="All caught up!"
                description="You've reviewed all your recent purchases"
              />
            )
          )}
        </>
      )}
    </AccountLayout>
  )
}

interface ReviewCardProps {
  review: typeof mockReviews[0]
  countryCode: string
  renderStars: (rating: number) => JSX.Element
  isPending?: boolean
}

function ReviewCard({ review, countryCode, renderStars, isPending }: ReviewCardProps) {
  return (
    <AccountCard>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
              {review.productImage ? (
                <img src={review.productImage} alt={review.productName} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <Star className="w-6 h-6 text-gray-600" />
              )}
            </div>
            <div>
              <Link 
                to={`/${countryCode}/products/${review.productId}`}
                className="font-medium text-white hover:text-cyan-400 transition-colors"
              >
                {review.productName}
              </Link>
              <div className="flex items-center gap-3 mt-1">
                {renderStars(review.rating)}
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isPending && (
              <AccountBadge variant="warning">Pending</AccountBadge>
            )}
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
              <PencilSquare className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
              <Trash className="w-4 h-4" />
            </button>
          </div>
        </div>

        {review.title && (
          <h4 className="font-medium text-white mb-2">{review.title}</h4>
        )}
        <p className="text-gray-400 text-sm">{review.content}</p>

        {!isPending && review.helpful > 0 && (
          <p className="text-xs text-gray-500 mt-4">
            {review.helpful} people found this helpful
          </p>
        )}
      </div>
    </AccountCard>
  )
}
