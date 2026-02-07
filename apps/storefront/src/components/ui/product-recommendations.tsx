import { Link } from "@tanstack/react-router"
import { Thumbnail } from "./thumbnail"

interface Product {
  id: string
  title: string
  handle: string
  thumbnail?: string
  price: string
  originalPrice?: string
  rating?: number
  reviewCount?: number
}

interface ProductRecommendationsProps {
  title?: string
  subtitle?: string
  products: Product[]
  type?: "similar" | "bought-together" | "recently-viewed" | "trending"
  columns?: 2 | 3 | 4 | 5 | 6
  showAddToCart?: boolean
  onAddToCart?: (productId: string) => void
}

export function ProductRecommendations({
  title = "You might also like",
  subtitle,
  products,
  type = "similar",
  columns = 4,
  showAddToCart = false,
  onAddToCart
}: ProductRecommendationsProps) {
  const typeLabels = {
    similar: "Similar Products",
    "bought-together": "Frequently Bought Together",
    "recently-viewed": "Recently Viewed",
    trending: "Trending Now"
  }

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-5",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
  }

  if (products.length === 0) return null

  return (
    <section className="py-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {title || typeLabels[type]}
        </h2>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>

      <div className={`grid ${gridCols[columns]} gap-4`}>
        {products.map(product => (
          <div
            key={product.id}
            className="group bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <Link to={`/us/products/${product.handle}`} className="block">
              <div className="aspect-square bg-gray-50 relative overflow-hidden">
                <Thumbnail
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                    Sale
                  </span>
                )}
              </div>
            </Link>

            <div className="p-3">
              <Link to={`/us/products/${product.handle}`}>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-cyan-600 transition-colors">
                  {product.title}
                </h3>
              </Link>

              {product.rating !== undefined && (
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${i < Math.round(product.rating!) ? "text-yellow-400" : "text-gray-200"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {product.reviewCount !== undefined && (
                    <span className="text-xs text-gray-500">({product.reviewCount})</span>
                  )}
                </div>
              )}

              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                )}
              </div>

              {showAddToCart && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    onAddToCart?.(product.id)
                  }}
                  className="mt-3 w-full py-2 text-xs font-medium bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
