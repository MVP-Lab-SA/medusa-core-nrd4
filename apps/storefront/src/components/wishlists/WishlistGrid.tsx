import { WishlistCard } from "./WishlistCard"
import { Plus } from "@medusajs/icons"

interface Wishlist {
  id: string
  name: string
  itemCount: number
  isPublic: boolean
  coverImage?: string
  createdAt: string
}

interface WishlistGridProps {
  wishlists: Wishlist[]
  onCreateNew?: () => void
  onSelectWishlist?: (id: string) => void
  onDeleteWishlist?: (id: string) => void
  onShareWishlist?: (id: string) => void
}

export function WishlistGrid({ 
  wishlists, 
  onCreateNew, 
  onSelectWishlist,
  onDeleteWishlist,
  onShareWishlist 
}: WishlistGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {/* Create New Card */}
      {onCreateNew && (
        <button
          onClick={onCreateNew}
          className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <span className="text-sm font-medium text-gray-600">Create New Wishlist</span>
        </button>
      )}
      
      {/* Wishlist Cards */}
      {wishlists.map((wishlist) => (
        <WishlistCard
          key={wishlist.id}
          wishlist={wishlist}
          onClick={() => onSelectWishlist?.(wishlist.id)}
          onDelete={() => onDeleteWishlist?.(wishlist.id)}
          onShare={() => onShareWishlist?.(wishlist.id)}
        />
      ))}
      
      {wishlists.length === 0 && !onCreateNew && (
        <div className="col-span-full py-12 text-center">
          <p className="text-gray-500">No wishlists yet</p>
        </div>
      )}
    </div>
  )
}
