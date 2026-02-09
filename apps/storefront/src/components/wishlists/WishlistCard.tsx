import { Link } from "@tanstack/react-router"
import { Heart, EllipsisHorizontal } from "@medusajs/icons"
import type { Wishlist } from "../../lib/mock/marketplace"

interface WishlistCardProps {
  wishlist: Wishlist
  countryCode: string
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function WishlistCard({ wishlist, countryCode, onEdit, onDelete }: WishlistCardProps) {
  const previewImages = wishlist.items.slice(0, 4)

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors">
      <Link to={`/${countryCode}/account/wishlists/${wishlist.id}`} className="block">
        <div className="aspect-square bg-gray-800 grid grid-cols-2 gap-0.5 p-0.5">
          {previewImages.map((item, index) => (
            <div key={item.id} className="bg-gray-700 overflow-hidden">
              {item.thumbnail ? (
                <img src={item.thumbnail} alt={item.productName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <Heart className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
          {[...Array(4 - previewImages.length)].map((_, i) => (
            <div key={`empty-${i}`} className="bg-gray-800" />
          ))}
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-white">{wishlist.name}</h3>
          {(onEdit || onDelete) && (
            <div className="relative group">
              <button className="p-1 hover:bg-gray-800 rounded">
                <EllipsisHorizontal className="w-4 h-4 text-gray-500" />
              </button>
              <div className="absolute right-0 mt-1 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                {onEdit && (
                  <button
                    onClick={() => onEdit(wishlist.id)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(wishlist.id)}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500">
          {wishlist.items.length} item{wishlist.items.length !== 1 ? "s" : ""}
          {wishlist.isPublic && " - Public"}
        </p>
      </div>
    </div>
  )
}
