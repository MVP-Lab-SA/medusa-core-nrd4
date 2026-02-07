import * as React from "react"
import { X, ShoppingBag, Heart, Minus, Plus } from "lucide-react"
import { clx } from "@medusajs/ui"

interface ProductQuickViewProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    title: string
    description?: string
    thumbnail?: string
    images?: string[]
    price: string
    comparePrice?: string
    options?: Array<{
      name: string
      values: string[]
    }>
    inStock?: boolean
  }
  onAddToCart?: (productId: string, quantity: number, options: Record<string, string>) => void
  onAddToWishlist?: (productId: string) => void
  className?: string
}

export function ProductQuickView({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onAddToWishlist,
  className
}: ProductQuickViewProps) {
  const [quantity, setQuantity] = React.useState(1)
  const [selectedOptions, setSelectedOptions] = React.useState<Record<string, string>>({})
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  const images = product.images?.length ? product.images : product.thumbnail ? [product.thumbnail] : []

  React.useEffect(() => {
    if (isOpen) {
      setQuantity(1)
      setSelectedOptions({})
      setCurrentImageIndex(0)
    }
  }, [isOpen])

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleAddToCart = () => {
    onAddToCart?.(product.id, quantity, selectedOptions)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={clx(
          "relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-2xl",
          "bg-zinc-900 border border-zinc-700 shadow-2xl",
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-800">
              {images.length > 0 ? (
                <img
                  src={images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                  No image
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={clx(
                      "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors",
                      currentImageIndex === index
                        ? "border-cyan-500"
                        : "border-zinc-700 hover:border-zinc-600"
                    )}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-2">{product.title}</h2>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-bold text-cyan-400">{product.price}</span>
              {product.comparePrice && (
                <span className="text-lg text-zinc-500 line-through">
                  {product.comparePrice}
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-zinc-400 mb-6 line-clamp-3">{product.description}</p>
            )}

            {/* Options */}
            {product.options?.map((option) => (
              <div key={option.name} className="mb-4">
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  {option.name}
                </label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => (
                    <button
                      key={value}
                      onClick={() => setSelectedOptions((prev) => ({
                        ...prev,
                        [option.name]: value
                      }))}
                      className={clx(
                        "px-4 py-2 rounded-lg border-2 transition-all",
                        selectedOptions[option.name] === value
                          ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                          : "border-zinc-700 text-white hover:border-zinc-600"
                      )}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-white font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={clx(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors",
                  product.inStock
                    ? "bg-cyan-500 text-black hover:bg-cyan-400"
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                )}
              >
                <ShoppingBag className="w-5 h-5" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              {onAddToWishlist && (
                <button
                  onClick={() => onAddToWishlist(product.id)}
                  className="p-3 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
