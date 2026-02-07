import { useState } from "react"
import { XMark, Heart, ShoppingBag } from "@medusajs/icons"
import { Link } from "@tanstack/react-router"

interface UGCItem {
  id: string
  imageUrl: string
  username: string
  userAvatar?: string
  caption?: string
  likes?: number
  products?: Array<{
    id: string
    title: string
    handle: string
    thumbnail?: string
  }>
}

interface UGCGalleryProps {
  items: UGCItem[]
  title?: string
  columns?: 3 | 4 | 5
  className?: string
}

export function UGCGallery({
  items,
  title = "Shop the Look",
  columns = 4,
  className = ""
}: UGCGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<UGCItem | null>(null)

  const gridCols = {
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-5"
  }

  return (
    <div className={className}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">{title}</h2>

      <div className={`grid ${gridCols[columns]} gap-3`}>
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="relative aspect-square group overflow-hidden rounded-xl"
          >
            <img
              src={item.imageUrl}
              alt={item.caption || `Photo by ${item.username}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-2">
                  {item.userAvatar ? (
                    <img src={item.userAvatar} alt={item.username} className="w-6 h-6 rounded-full" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-white/30" />
                  )}
                  <span className="text-white text-sm font-medium">@{item.username}</span>
                </div>
              </div>
            </div>

            {item.products && item.products.length > 0 && (
              <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                <ShoppingBag className="w-4 h-4 text-gray-700" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSelectedItem(null)} />
          
          <div className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white"
            >
              <XMark className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="md:w-2/3 bg-black">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.caption || ""}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Details */}
            <div className="md:w-1/3 p-6 overflow-y-auto">
              <div className="flex items-center gap-3 mb-4">
                {selectedItem.userAvatar ? (
                  <img src={selectedItem.userAvatar} alt={selectedItem.username} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                )}
                <div>
                  <p className="font-medium text-gray-900">@{selectedItem.username}</p>
                  {selectedItem.likes !== undefined && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {selectedItem.likes.toLocaleString()} likes
                    </p>
                  )}
                </div>
              </div>

              {selectedItem.caption && (
                <p className="text-gray-700 mb-6">{selectedItem.caption}</p>
              )}

              {selectedItem.products && selectedItem.products.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">Shop Products</h4>
                  <div className="space-y-3">
                    {selectedItem.products.map(product => (
                      <Link
                        key={product.id}
                        to={`/us/products/${product.handle}`}
                        onClick={() => setSelectedItem(null)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                          {product.thumbnail && (
                            <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{product.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
