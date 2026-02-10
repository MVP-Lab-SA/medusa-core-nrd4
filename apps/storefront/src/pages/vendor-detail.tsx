import { Link } from "@tanstack/react-router"
import { useVendor, useVendorReviews, useFollowVendor } from "@/lib/hooks/use-marketplace"
import { Star, CheckCircle, Users, MapPin, Envelope, Phone } from "@medusajs/icons"
import { useState } from "react"

interface VendorDetailPageProps {
  handle: string
  countryCode: string
}

export default function VendorDetailPage({ handle, countryCode }: VendorDetailPageProps) {
  const { vendor, isLoading } = useVendor(handle)
  const { reviews } = useVendorReviews(vendor?.id || "")
  const { toggleFollow, isFollowing: followingStatus, isLoading: followLoading } = useFollowVendor(vendor?.id || "")
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = async () => {
    if (vendor) {
      await toggleFollow()
      setIsFollowing(true)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="h-48 bg-gray-800 animate-pulse" />
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 w-48 bg-gray-800 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Vendor Not Found</h1>
          <Link
            to="/$countryCode/vendors"
            params={{ countryCode }}
            className="text-cyan-400 hover:text-cyan-300 mt-2 block"
          >
            Back to Vendors
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Banner */}
      <div className="relative h-64 md:h-80">
        {vendor.banner ? (
          <img
            src={vendor.banner}
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-900 to-gray-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Vendor Info */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-20 bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo & Basic Info */}
            <div className="flex items-start gap-4">
              {vendor.logo ? (
                <img
                  src={vendor.logo}
                  alt={vendor.name}
                  className="w-24 h-24 rounded-xl border-4 border-gray-800 shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-xl border-4 border-gray-800 shadow-lg bg-gray-800 flex items-center justify-center text-2xl font-bold text-gray-500">
                  {vendor.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">{vendor.name}</h1>
                  {vendor.isVerified && (
                    <span className="flex items-center gap-1 text-cyan-400 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-gray-400 mt-1">{vendor.description}</p>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-white">{vendor.rating}</span>
                    <span className="text-gray-500">({vendor.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{vendor.productCount.toLocaleString()} products</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="md:ml-auto flex items-start gap-3">
              <button
                onClick={handleFollow}
                disabled={isFollowing}
                className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                  isFollowing
                    ? "bg-gray-800 text-gray-400"
                    : "bg-cyan-500 text-black hover:bg-cyan-400"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-800">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{vendor.productCount}</p>
              <p className="text-sm text-gray-500">Products</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{vendor.reviewCount}</p>
              <p className="text-sm text-gray-500">Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{vendor.rating}</p>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {new Date(vendor.joinedAt).getFullYear()}
              </p>
              <p className="text-sm text-gray-500">Member Since</p>
            </div>
          </div>
        </div>

        {/* Tabs & Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Products Section */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Products</h2>
                <Link
                  to="/$countryCode/store"
                  params={{ countryCode }}
                  search={{ vendor: vendor.slug }}
                  className="text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  View All
                </Link>
              </div>
              <p className="text-gray-400 text-center py-8">
                Browse {vendor.productCount} products from this vendor
              </p>
            </div>

            {/* Reviews Section */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-6">
              <h2 className="text-lg font-semibold text-white mb-4">Recent Reviews</h2>
              {reviews && reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-800 pb-4 last:border-0">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">{review.author}</span>
                      </div>
                      <h4 className="font-medium text-white mt-2">{review.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">{review.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No reviews yet</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            {vendor.categories && vendor.categories.length > 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            {vendor.location && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-3">Location</h3>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{vendor.location}</span>
                </div>
              </div>
            )}

            {/* Member Info */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3">About</h3>
              <p className="text-sm text-gray-400">
                Member since {new Date(vendor.joinedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
