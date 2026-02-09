// User Generated Content Gallery for Lookbook
import { useState } from "react"
import { Heart, ChatBubble, XMark, ChevronLeft, ChevronRight } from "@medusajs/icons"

interface UGCItem {
  id: string
  imageUrl: string
  username: string
  userAvatar?: string
  caption?: string
  likes: number
  comments: number
  products?: Array<{
    id: string
    name: string
    handle: string
    thumbnail?: string
    price: number
    currencyCode: string
  }>
}

interface UGCGalleryProps {
  items: UGCItem[]
  columns?: 3 | 4 | 5
  className?: string
}

export function UGCGallery({ items, columns = 4, className = "" }: UGCGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<UGCItem | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const gridCols = {
    3: "grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-5"
  }

  const handlePrev = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : items.length - 1
    setSelectedIndex(newIndex)
    setSelectedItem(items[newIndex])
  }

  const handleNext = () => {
    const newIndex = selectedIndex < items.length - 1 ? selectedIndex + 1 : 0
    setSelectedIndex(newIndex)
    setSelectedItem(items[newIndex])
  }

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-2 ${className}`}>
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedItem(item)
              setSelectedIndex(index)
            }}
            className="relative aspect-square overflow-hidden group"
          >
            <img
              src={item.imageUrl}
              alt={`Post by ${item.username}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <div className="flex items-center gap-1 text-white">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">{item.likes}</span>
              </div>
              <div className="flex items-center gap-1 text-white">
                <ChatBubble className="w-5 h-5" />
                <span className="text-sm font-medium">{item.comments}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <XMark className="w-8 h-8" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 text-white hover:text-gray-300"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 text-white hover:text-gray-300"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900 rounded-lg overflow-hidden">
            {/* Image */}
            <div className="aspect-square">
              <img
                src={selectedItem.imageUrl}
                alt={`Post by ${selectedItem.username}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info Panel */}
            <div className="p-6 flex flex-col">
              {/* User Info */}
              <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                {selectedItem.userAvatar ? (
                  <img
                    src={selectedItem.userAvatar}
                    alt={selectedItem.username}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {selectedItem.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="font-medium text-white">@{selectedItem.username}</span>
              </div>

              {/* Caption */}
              {selectedItem.caption && (
                <p className="py-4 text-gray-300 border-b border-gray-800">
                  {selectedItem.caption}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-6 py-4 border-b border-gray-800">
                <div className="flex items-center gap-2 text-white">
                  <Heart className="w-5 h-5" />
                  <span>{selectedItem.likes} likes</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <ChatBubble className="w-5 h-5" />
                  <span>{selectedItem.comments} comments</span>
                </div>
              </div>

              {/* Tagged Products */}
              {selectedItem.products && selectedItem.products.length > 0 && (
                <div className="flex-1 py-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Shop This Look</h4>
                  <div className="space-y-3">
                    {selectedItem.products.map((product) => (
                      <a
                        key={product.id}
                        href={`/products/${product.handle}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        {product.thumbnail && (
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">{product.name}</p>
                          <p className="text-cyan-400 text-sm">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: product.currencyCode
                            }).format(product.price)}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

interface LookbookSliderProps {
  images: Array<{
    url: string
    title?: string
    products?: UGCItem["products"]
  }>
  className?: string
}

export function LookbookSlider({ images, className = "" }: LookbookSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className={`relative ${className}`}>
      <div className="aspect-[16/9] overflow-hidden rounded-lg">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].title || `Lookbook image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {images[currentIndex].title && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-2xl font-bold text-white">{images[currentIndex].title}</h3>
        </div>
      )}

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-cyan-500" : "bg-gray-600"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : images.length - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrentIndex(currentIndex < images.length - 1 ? currentIndex + 1 : 0)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}
