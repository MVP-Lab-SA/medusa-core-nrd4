import { createFileRoute } from "@tanstack/react-router"
import { WishlistCard, WishlistShareModal } from "~/components/wishlists"
import { Heart, Share2, ShoppingCart, Trash2, ArrowLeft, Lock, Globe, Edit } from "lucide-react"
import { useState } from "react"

export const Route = createFileRoute("/$countryCode/wishlist/$id")({
  component: SharedWishlistPage,
})

function SharedWishlistPage() {
  const { id } = Route.useParams()
  const [showShareModal, setShowShareModal] = useState(false)

  // Mock wishlist data
  const wishlist = {
    id,
    name: "Birthday Wishlist",
    owner: "John Doe",
    isOwner: false, // Set to true if viewing own wishlist
    visibility: "public", // public, private, shared
    itemCount: 5,
    createdDate: "2024-01-10",
    items: [
      { id: 1, name: "Wireless Headphones", price: 199, image: "/product1.jpg", inStock: true },
      { id: 2, name: "Smart Watch", price: 299, image: "/product2.jpg", inStock: true },
      { id: 3, name: "Leather Wallet", price: 79, image: "/product3.jpg", inStock: false },
      { id: 4, name: "Running Shoes", price: 129, image: "/product4.jpg", inStock: true },
      { id: 5, name: "Backpack", price: 89, image: "/product5.jpg", inStock: true },
    ],
  }

  const totalValue = wishlist.items.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <a href="/account/wishlists" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Wishlists
      </a>

      {/* Header */}
      <div className="bg-white border rounded-xl p-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{wishlist.name}</h1>
                {wishlist.visibility === "private" ? (
                  <Lock className="w-4 h-4 text-gray-400" />
                ) : (
                  <Globe className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <p className="text-gray-600">
                {wishlist.isOwner ? "Your wishlist" : `By ${wishlist.owner}`}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {wishlist.itemCount} items | Total value: ${totalValue}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {wishlist.isOwner && (
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Edit className="w-4 h-4" />
                Edit
              </button>
            )}
            <button 
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.items.map((item) => (
          <div key={item.id} className="bg-white border rounded-xl overflow-hidden group">
            <div className="aspect-square bg-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400">Product Image</span>
              </div>
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-medium">Out of Stock</span>
                </div>
              )}
              {wishlist.isOwner && (
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-1">{item.name}</h3>
              <p className="text-lg font-bold mb-3">${item.price}</p>
              <button 
                className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 ${
                  item.inStock 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!item.inStock}
              >
                <ShoppingCart className="w-4 h-4" />
                {item.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add All to Cart */}
      {wishlist.items.some(item => item.inStock) && (
        <div className="mt-8 bg-gray-50 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="font-semibold">Add all available items to cart</p>
            <p className="text-sm text-gray-500">
              {wishlist.items.filter(i => i.inStock).length} items | 
              ${wishlist.items.filter(i => i.inStock).reduce((sum, i) => sum + i.price, 0)}
            </p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Add All to Cart
          </button>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <WishlistShareModal 
          wishlistId={wishlist.id}
          wishlistName={wishlist.name}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  )
}
