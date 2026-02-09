import { useState } from "react"
import { Heart, Plus } from "@medusajs/icons"
import type { Wishlist } from "../../lib/mock/marketplace"

interface AddToWishlistButtonProps {
  productId: string
  wishlists: Wishlist[]
  onAddToWishlist: (wishlistId: string, productId: string) => void
  onCreateWishlist?: (name: string) => void
  isInWishlist?: boolean
}

export function AddToWishlistButton({
  productId,
  wishlists,
  onAddToWishlist,
  onCreateWishlist,
  isInWishlist,
}: AddToWishlistButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newListName, setNewListName] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const handleAddToWishlist = (wishlistId: string) => {
    onAddToWishlist(wishlistId, productId)
    setIsOpen(false)
  }

  const handleCreateWishlist = () => {
    if (newListName.trim() && onCreateWishlist) {
      onCreateWishlist(newListName.trim())
      setNewListName("")
      setShowCreateForm(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full border transition-colors ${
          isInWishlist
            ? "bg-red-500/20 border-red-500/30 text-red-400"
            : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600"
        }`}
        title="Add to wishlist"
      >
        <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-50">
            <div className="p-3 border-b border-gray-800">
              <h4 className="font-medium text-white">Add to Wishlist</h4>
            </div>
            <div className="max-h-60 overflow-auto">
              {wishlists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => handleAddToWishlist(list.id)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-800 flex items-center justify-between"
                >
                  <span className="text-gray-300">{list.name}</span>
                  <span className="text-sm text-gray-500">{list.items.length}</span>
                </button>
              ))}
            </div>
            {onCreateWishlist && (
              <div className="p-3 border-t border-gray-800">
                {showCreateForm ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      placeholder="List name"
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-white placeholder-gray-500"
                      autoFocus
                    />
                    <button
                      onClick={handleCreateWishlist}
                      className="px-3 py-2 bg-cyan-500 text-black text-sm rounded-md hover:bg-cyan-400"
                    >
                      Create
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="w-full flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New List</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
