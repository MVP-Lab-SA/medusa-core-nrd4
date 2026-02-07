import { useState } from "react"
import { clx } from "@medusajs/ui"
import { XMark, Eye } from "@medusajs/icons"
import { Link } from "@tanstack/react-router"

interface ProductQuickViewProps {
  product: {
    id: string
    title: string
    handle: string
    description?: string
    thumbnail?: string
    images?: { url: string }[]
    variants?: {
      id: string
      title: string
      prices?: { amount: number; currency_code: string }[]
      inventory_quantity?: number
    }[]
  }
  countryCode?: string
  onAddToCart?: (variantId: string) => void
  children?: React.ReactNode
  className?: string
}

export function ProductQuickView({
  product,
  countryCode = "us",
  onAddToCart,
  children,
  className,
}: ProductQuickViewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]?.id || ""
  )

  const images = product.images?.length
    ? product.images
    : product.thumbnail
    ? [{ url: product.thumbnail }]
    : []

  const currentVariant = product.variants?.find((v) => v.id === selectedVariant)
  const price = currentVariant?.prices?.[0]

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount)
  }

  const handleAddToCart = () => {
    if (selectedVariant) {
      onAddToCart?.(selectedVariant)
      setIsOpen(false)
    }
  }

  return (
    <>
      {children ? (
        <div onClick={() => setIsOpen(true)} className={className}>
          {children}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={clx(
            "p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors",
            className
          )}
          aria-label="Quick view"
        >
          <Eye className="w-5 h-5 text-white" />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              aria-label="Close"
            >
              <XMark className="w-5 h-5 text-white" />
            </button>

            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-neutral-800">
                  {images[selectedImage] && (
                    <img
                      src={images[selectedImage].url}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={clx(
                          "w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors",
                          selectedImage === index
                            ? "border-cyan-500"
                            : "border-transparent hover:border-neutral-600"
                        )}
                      >
                        <img
                          src={img.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {product.title}
                </h2>

                {price && (
                  <p className="text-2xl font-bold text-cyan-400 mb-4">
                    {formatPrice(price.amount, price.currency_code)}
                  </p>
                )}

                {product.description && (
                  <p className="text-neutral-400 text-sm mb-6 line-clamp-3">
                    {product.description}
                  </p>
                )}

                {product.variants && product.variants.length > 1 && (
                  <div className="mb-6">
                    <label className="block text-sm text-neutral-400 mb-2">
                      Variant
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant.id)}
                          disabled={variant.inventory_quantity === 0}
                          className={clx(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            selectedVariant === variant.id
                              ? "bg-cyan-500 text-black"
                              : "bg-neutral-800 text-white hover:bg-neutral-700",
                            variant.inventory_quantity === 0 &&
                              "opacity-40 cursor-not-allowed line-through"
                          )}
                        >
                          {variant.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedVariant || currentVariant?.inventory_quantity === 0}
                    className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentVariant?.inventory_quantity === 0
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>

                  <Link
                    to={`/${countryCode}/products/${product.handle}`}
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-3 text-center border border-neutral-700 text-white font-medium rounded-lg hover:border-neutral-500 transition-colors"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
