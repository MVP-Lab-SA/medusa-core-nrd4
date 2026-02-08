import { Link } from "@tanstack/react-router"
import { useVendor, useVendorReviews, useFollowVendor } from "@/lib/hooks/use-marketplace"
import { Star, CheckCircle, Users, MapPin, Envelope, Phone } from "@medusajs/icons"
import { useState } from "react"

interface VendorDetailPageProps {
  handle: string
  countryCode: string
}

export default function VendorDetailPage({ handle, countryCode }: VendorDetailPageProps) {
  const { data: vendor, isLoading } = useVendor(handle)
  const { data: reviews } = useVendorReviews(vendor?.id || "")
  const followMutation = useFollowVendor()
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = async () => {
    if (vendor) {
      await followMutation.mutateAsync(vendor.id)
      setIsFollowing(true)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-48 bg-gray-200 animate-pulse" />
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Vendor Not Found</h1>
          <Link
            to="/$countryCode/vendors"
            params={{ countryCode }}
            className="text-blue-600 hover:underline mt-2 block"
          >
            Back to Vendors
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative h-64 md:h-80">
        <img
          src={vendor.banner}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Vendor Info */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-20 bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo & Basic Info */}
            <div className="flex items-start gap-4">
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="w-24 h-24 rounded-xl border-4 border-white shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">{vendor.name}</h1>
                  {vendor.verified && (
                    <span className="flex items-center gap-1 text-blue-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-1">{vendor.description}</p>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{vendor.rating}</span>
                    <span className="text-gray-400">({vendor.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{vendor.followerCount.toLocaleString()} followers</span>
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
                    ? "bg-gray-100 text-gray-500"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
              <a
                href={`mailto:${vendor.contact.email}`}
                className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{vendor.productCount}</p>
              <p className="text-sm text-gray-500">Products</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{vendor.reviewCount}</p>
              <p className="text-sm text-gray-500">Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{vendor.followerCount}</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
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
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Products</h2>
                <Link
                  to="/$countryCode/store"
                  params={{ countryCode }}
                  search={{ vendor: vendor.handle }}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View All
                </Link>
              </div>
              <p className="text-gray-500 text-center py-8">
                Browse {vendor.productCount} products from this vendor
              </p>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h2>
              {reviews && reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center gap-2">
                        <div className="flex">
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
                        </div>
                        <span className="text-sm text-gray-500">{review.customerName}</span>
                      </div>
                      <h4 className="font-medium text-gray-900 mt-2">{review.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{review.content}</p>
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
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {vendor.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Policies</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Shipping</p>
                  <p className="text-sm text-gray-500">{vendor.policies.shipping}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Returns</p>
                  <p className="text-sm text-gray-500">{vendor.policies.returns}</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
              <div className="space-y-2">
                <a
                  href={`mailto:${vendor.contact.email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
                >
                  <Envelope className="w-4 h-4" />
                  {vendor.contact.email}
                </a>
                {vendor.contact.phone && (
                  <a
                    href={`tel:${vendor.contact.phone}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    <Phone className="w-4 h-4" />
                    {vendor.contact.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
