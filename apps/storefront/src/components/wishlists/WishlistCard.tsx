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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/${countryCode}/account/wishlists/${wishlist.id}`} className="block">
        <div className="aspect-square bg-gray-100 grid grid-cols-2 gap-0.5 p-0.5">
          {previewImages.map((item, index) => (
            <div key={item.id} className="bg-gray-200 overflow-hidden">
              {item.thumbnail ? (
                <img src={item.thumbnail} alt={item.productName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Heart className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
          {[...Array(4 - previewImages.length)].map((_, i) => (
            <div key={`empty-${i}`} className="bg-gray-100" />
          ))}
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900">{wishlist.name}</h3>
          {(onEdit || onDelete) && (
            <div className="relative group">
              <button className="p-1 hover:bg-gray-100 rounded">
                <EllipsisHorizontal className="w-4 h-4 text-gray-500" />
              </button>
              <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                {onEdit && (
                  <button
                    onClick={() => onEdit(wishlist.id)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(wishlist.id)}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
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
