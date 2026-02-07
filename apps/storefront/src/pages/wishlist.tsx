import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { ArrowLeft, XMark, ShoppingCart, Heart } from "@medusajs/icons"

type WishlistItem = {
  id: string
  title: string
  variant: string
  price: string
  originalPrice?: string
  thumbnail: string
  inStock: boolean
  addedAt: string
}

const initialWishlist: WishlistItem[] = [
  {
    id: "1",
    title: "Urban Sensor Pro X1",
    variant: "Black / Standard",
    price: "$299.00",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
    inStock: true,
    addedAt: "2 days ago"
  },
  {
    id: "2",
    title: "Smart Hub Controller",
    variant: "White",
    price: "$149.00",
    originalPrice: "$199.00",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    inStock: true,
    addedAt: "1 week ago"
  },
  {
    id: "3",
    title: "Environmental Monitor",
    variant: "Silver",
    price: "$399.00",
    thumbnail: "https://images.unsplash.com/photo-1597424216809-3ba9864aeb18?w=400",
    inStock: false,
    addedAt: "2 weeks ago"
  }
]

export function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>(initialWishlist)

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const moveToCart = (id: string) => {
    // In real app, this would add to cart and optionally remove from wishlist
    console.log("Move to cart:", id)
  }

  const clearAll = () => {
    setItems([])
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <Link 
              to="/us/store" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Store
            </Link>
            <h1 className="text-2xl font-bold">My Wishlist</h1>
          </div>

          {/* Empty State */}
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <Heart className="w-12 h-12 text-gray-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Save items you love by clicking the heart icon on any product. Your wishlist will be waiting for you here.
            </p>
            <Link 
              to="/us/store"
              className="inline-flex px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors"
            >
              Discover Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/us/store" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">My Wishlist</h1>
              <p className="text-gray-400 mt-1">{items.length} {items.length === 1 ? "item" : "items"} saved</p>
            </div>
            <button 
              onClick={clearAll}
              className="text-gray-400 hover:text-red-400 text-sm transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="space-y-4">
          {items.map(item => (
            <div 
              key={item.id} 
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex gap-6"
            >
              {/* Image */}
              <Link to={`/us/products/${item.id}`} className="flex-shrink-0">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-32 h-32 object-cover rounded-xl hover:opacity-80 transition-opacity"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link 
                      to={`/us/products/${item.id}`}
                      className="font-semibold text-lg hover:text-cyan-400 transition-colors"
                    >
                      {item.title}
                    </Link>
                    <p className="text-gray-400 text-sm mt-1">{item.variant}</p>
                    <p className="text-gray-500 text-xs mt-2">Added {item.addedAt}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <XMark className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="flex items-end justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-cyan-400">{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-gray-500 line-through">{item.originalPrice}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {item.inStock ? (
                      <>
                        <span className="text-green-400 text-sm">In Stock</span>
                        <button 
                          onClick={() => moveToCart(item.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-red-400 text-sm">Out of Stock</span>
                        <button className="px-4 py-2 border border-gray-700 text-gray-400 rounded-lg cursor-not-allowed">
                          Unavailable
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-between p-6 bg-gray-900/50 border border-gray-800 rounded-2xl">
          <div>
            <p className="text-gray-400 text-sm">Ready to checkout?</p>
            <p className="font-semibold">{items.filter(i => i.inStock).length} items available</p>
          </div>
          <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors">
            Add All to Cart
          </button>
        </div>

        {/* Share Wishlist */}
        <div className="mt-6 p-6 bg-gray-900/30 border border-gray-800 rounded-xl">
          <h3 className="font-semibold mb-2">Share Your Wishlist</h3>
          <p className="text-gray-400 text-sm mb-4">
            Share your wishlist with friends and family for gift ideas
          </p>
          <div className="flex gap-3">
            <input 
              type="text" 
              value="https://cityos.store/wishlist/abc123"
              readOnly
              className="flex-1 py-2 px-4 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-400"
            />
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
