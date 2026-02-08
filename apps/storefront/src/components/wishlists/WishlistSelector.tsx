import { useState } from "react"
import { Heart, Plus, Check } from "@medusajs/icons"

interface Wishlist {
  id: string
  name: string
  itemCount: number
  hasProduct?: boolean
}

interface WishlistSelectorProps {
  wishlists: Wishlist[]
  productId: string
  onAddToWishlist: (wishlistId: string) => void
  onRemoveFromWishlist: (wishlistId: string) => void
  onCreateWishlist: (name: string) => void
}

export function WishlistSelector({ 
  wishlists, 
  productId,
  onAddToWishlist, 
  onRemoveFromWishlist,
  onCreateWishlist 
}: WishlistSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [newWishlistName, setNewWishlistName] = useState("")

  const handleCreateWishlist = () => {
    if (newWishlistName.trim()) {
      onCreateWishlist(newWishlistName.trim())
      setNewWishlistName("")
      setShowCreate(false)
    }
  }

  const isInAnyWishlist = wishlists.some(w => w.hasProduct)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full border transition-colors ${
          isInAnyWishlist 
            ? 'border-red-200 bg-red-50 text-red-500' 
            : 'border-gray-300 hover:border-gray-400 text-gray-500'
        }`}
        title="Add to wishlist"
      >
        <Heart className={`w-5 h-5 ${isInAnyWishlist ? 'fill-red-500' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-3 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Save to Wishlist</h3>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {wishlists.map((wishlist) => (
                <button
                  key={wishlist.id}
                  onClick={() => {
                    if (wishlist.hasProduct) {
                      onRemoveFromWishlist(wishlist.id)
                    } else {
                      onAddToWishlist(wishlist.id)
                    }
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50"
                >
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{wishlist.name}</p>
                    <p className="text-xs text-gray-500">{wishlist.itemCount} items</p>
                  </div>
                  {wishlist.hasProduct && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                </button>
              ))}
            </div>

            <div className="p-3 border-t border-gray-200">
              {showCreate ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newWishlistName}
                    onChange={(e) => setNewWishlistName(e.target.value)}
                    placeholder="Wishlist name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowCreate(false)}
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateWishlist}
                      disabled={!newWishlistName.trim()}
                      className="flex-1 px-3 py-1.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                    >
                      Create
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCreate(true)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  Create New Wishlist
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
