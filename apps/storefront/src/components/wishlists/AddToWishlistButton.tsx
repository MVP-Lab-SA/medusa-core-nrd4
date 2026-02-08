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
            ? "bg-red-50 border-red-200 text-red-500"
            : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
        }`}
        title="Add to wishlist"
      >
        <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-3 border-b border-gray-100">
              <h4 className="font-medium text-gray-900">Add to Wishlist</h4>
            </div>
            <div className="max-h-60 overflow-auto">
              {wishlists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => handleAddToWishlist(list.id)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
                >
                  <span className="text-gray-700">{list.name}</span>
                  <span className="text-sm text-gray-400">{list.items.length}</span>
                </button>
              ))}
            </div>
            {onCreateWishlist && (
              <div className="p-3 border-t border-gray-100">
                {showCreateForm ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      placeholder="List name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      autoFocus
                    />
                    <button
                      onClick={handleCreateWishlist}
                      className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                    >
                      Create
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="w-full flex items-center gap-2 text-blue-600 hover:text-blue-700"
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
