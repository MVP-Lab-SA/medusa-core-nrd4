import { Link } from "@tanstack/react-router"
import { Plus, Check } from "@medusajs/icons"
import { Thumbnail } from "./thumbnail"

interface UpsellProduct {
  id: string
  title: string
  handle: string
  thumbnail?: string
  price: string
  originalPrice?: string
  reason?: string
}

interface CartUpsellProps {
  title?: string
  products: UpsellProduct[]
  onAddToCart: (productId: string) => void
  addedProducts?: string[]
  layout?: "horizontal" | "vertical"
  className?: string
}

export function CartUpsell({
  title = "Complete Your Order",
  products,
  onAddToCart,
  addedProducts = [],
  layout = "horizontal",
  className = ""
}: CartUpsellProps) {
  if (products.length === 0) return null

  return (
    <div className={`bg-gray-50 rounded-xl p-4 ${className}`}>
      <h3 className="font-medium text-gray-900 mb-4">{title}</h3>

      <div className={`${layout === "horizontal" ? "flex gap-3 overflow-x-auto pb-2" : "space-y-3"}`}>
        {products.map(product => {
          const isAdded = addedProducts.includes(product.id)

          return (
            <div
              key={product.id}
              className={`${
                layout === "horizontal"
                  ? "flex-shrink-0 w-40"
                  : "flex items-center gap-3"
              } bg-white rounded-lg p-3 border border-gray-100`}
            >
              <Link
                to={`/us/products/${product.handle}`}
                className={`${layout === "horizontal" ? "block mb-2" : "w-16 h-16 flex-shrink-0"}`}
              >
                <div className={`${layout === "horizontal" ? "aspect-square" : "w-full h-full"} bg-gray-100 rounded overflow-hidden`}>
                  <Thumbnail src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
                </div>
              </Link>

              <div className={layout === "horizontal" ? "" : "flex-1 min-w-0"}>
                <Link
                  to={`/us/products/${product.handle}`}
                  className="text-sm font-medium text-gray-900 hover:text-cyan-600 line-clamp-2"
                >
                  {product.title}
                </Link>

                {product.reason && (
                  <p className="text-xs text-cyan-600 mt-0.5">{product.reason}</p>
                )}

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-semibold text-gray-900">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                  )}
                </div>

                <button
                  onClick={() => !isAdded && onAddToCart(product.id)}
                  disabled={isAdded}
                  className={`mt-2 w-full flex items-center justify-center gap-1 py-1.5 rounded text-xs font-medium transition-colors ${
                    isAdded
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3 h-3" />
                      Added
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" />
                      Add
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface FrequentlyBoughtTogetherProps {
  mainProduct: {
    id: string
    title: string
    thumbnail?: string
    price: string
  }
  products: UpsellProduct[]
  onAddBundle: (productIds: string[]) => void
  bundleDiscount?: number
  currency?: string
}

export function FrequentlyBoughtTogether({
  mainProduct,
  products,
  onAddBundle,
  bundleDiscount = 10,
  currency = "USD"
}: FrequentlyBoughtTogetherProps) {
  const allProducts = [mainProduct, ...products]
  const totalPrice = allProducts.reduce((sum, p) => {
    const price = parseFloat(p.price.replace(/[^0-9.]/g, ""))
    return sum + price
  }, 0)
  const discountedPrice = totalPrice * (1 - bundleDiscount / 100)

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(amount)
  }

  return (
    <div className="border border-gray-200 rounded-xl p-4">
      <h3 className="font-medium text-gray-900 mb-4">Frequently Bought Together</h3>

      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
        {allProducts.map((product, idx) => (
          <div key={product.id} className="flex items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <Thumbnail src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
            </div>
            {idx < allProducts.length - 1 && (
              <Plus className="w-5 h-5 text-gray-400 mx-2 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600">Bundle price</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">{formatPrice(discountedPrice)}</span>
            <span className="text-sm text-gray-400 line-through">{formatPrice(totalPrice)}</span>
            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
              Save {bundleDiscount}%
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onAddBundle(allProducts.map(p => p.id))}
        className="w-full py-3 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-600 transition-colors"
      >
        Add All to Cart
      </button>
    </div>
  )
}
