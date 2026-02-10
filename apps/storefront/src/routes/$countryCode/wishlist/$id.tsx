import { createFileRoute } from "@tanstack/react-router"
import { WishlistCard, WishlistShareModal } from "@/components/wishlists"
import { Heart, Share, ShoppingCart, Trash, ArrowLeftMini, LockClosedSolid, GlobeEurope, PencilSquare } from "@medusajs/icons"
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
    isOwner: false,
    visibility: "public",
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
    <div className="min-h-screen bg-city-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <a href="/account/wishlists" className="inline-flex items-center gap-2 text-city-gray hover:text-city-white transition-colors mb-6">
          <ArrowLeftMini className="w-4 h-4" />
          Back to Wishlists
        </a>

        {/* Header */}
        <div className="bg-city-navy border border-city-steel rounded-xl p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-city-cyan/10 rounded-xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-city-cyan" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-city-white">{wishlist.name}</h1>
                  {wishlist.visibility === "private" ? (
                    <LockClosedSolid className="w-4 h-4 text-city-muted" />
                  ) : (
                    <GlobeEurope className="w-4 h-4 text-city-muted" />
                  )}
                </div>
                <p className="text-city-gray">
                  {wishlist.isOwner ? "Your wishlist" : `By ${wishlist.owner}`}
                </p>
                <p className="text-sm text-city-muted mt-1">
                  {wishlist.itemCount} items | Total value: ${totalValue}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {wishlist.isOwner && (
                <button className="flex items-center gap-2 px-4 py-2 border border-city-steel rounded-lg text-city-white hover:bg-city-slate transition-colors">
                  <PencilSquare className="w-4 h-4" />
                  Edit
                </button>
              )}
              <button 
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-city-cyan text-city-dark rounded-lg hover:bg-city-cyan-light transition-colors font-medium"
              >
                <Share className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.items.map((item) => (
            <div key={item.id} className="bg-city-navy border border-city-steel rounded-xl overflow-hidden group hover:border-city-cyan/50 transition-colors">
              <div className="aspect-square bg-city-slate relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-city-muted">Product Image</span>
                </div>
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-city-white font-medium">Out of Stock</span>
                  </div>
                )}
                {wishlist.isOwner && (
                  <button className="absolute top-3 right-3 p-2 bg-city-navy border border-city-steel rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 hover:border-red-500/50">
                    <Trash className="w-4 h-4 text-red-400" />
                  </button>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-city-white mb-1">{item.name}</h3>
                <p className="text-lg font-bold text-city-white mb-3">${item.price}</p>
                <button 
                  className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors ${
                    item.inStock 
                      ? "bg-city-cyan text-city-dark hover:bg-city-cyan-light" 
                      : "bg-city-slate text-city-muted cursor-not-allowed"
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
          <div className="mt-8 bg-city-navy border border-city-steel rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="font-semibold text-city-white">Add all available items to cart</p>
              <p className="text-sm text-city-gray">
                {wishlist.items.filter(i => i.inStock).length} items | 
                ${wishlist.items.filter(i => i.inStock).reduce((sum, i) => sum + i.price, 0)}
              </p>
            </div>
            <button className="bg-city-cyan text-city-dark px-6 py-3 rounded-lg hover:bg-city-cyan-light transition-colors flex items-center gap-2 font-medium">
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
    </div>
  )
}
