import { Link } from "@tanstack/react-router"
import { ArrowTrendingUp, Fire } from "@medusajs/icons"
import { Thumbnail } from "./thumbnail"

interface TrendingProduct {
  id: string
  title: string
  handle: string
  thumbnail?: string
  price: string
  trendScore?: number
  salesCount?: number
  category?: string
}

interface TrendingProductsProps {
  products: TrendingProduct[]
  title?: string
  showRank?: boolean
  layout?: "horizontal" | "vertical" | "compact"
  limit?: number
}

export function TrendingProducts({
  products,
  title = "Trending Now",
  showRank = true,
  layout = "horizontal",
  limit = 5
}: TrendingProductsProps) {
  const displayProducts = products.slice(0, limit)

  if (displayProducts.length === 0) return null

  if (layout === "compact") {
    return (
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Fire className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="space-y-3">
          {displayProducts.map((product, idx) => (
            <Link
              key={product.id}
              to={`/us/products/${product.handle}`}
              className="flex items-center gap-3 hover:bg-white/50 p-2 rounded-lg transition-colors"
            >
              {showRank && (
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? "bg-yellow-400 text-yellow-900" : idx === 1 ? "bg-gray-300 text-gray-700" : idx === 2 ? "bg-orange-300 text-orange-900" : "bg-gray-100 text-gray-600"}`}>
                  {idx + 1}
                </span>
              )}
              <div className="w-10 h-10 rounded bg-white overflow-hidden flex-shrink-0">
                <Thumbnail src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
                <p className="text-xs text-gray-500">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  if (layout === "vertical") {
    return (
      <div>
        <div className="flex items-center gap-2 mb-6">
          <ArrowTrendingUp className="w-6 h-6 text-cyan-500" />
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
        <div className="space-y-4">
          {displayProducts.map((product, idx) => (
            <Link
              key={product.id}
              to={`/us/products/${product.handle}`}
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
            >
              {showRank && (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${idx === 0 ? "bg-gradient-to-br from-yellow-400 to-orange-400 text-white" : idx === 1 ? "bg-gradient-to-br from-gray-300 to-gray-400 text-white" : idx === 2 ? "bg-gradient-to-br from-orange-300 to-orange-400 text-white" : "bg-gray-100 text-gray-600"}`}>
                  {idx + 1}
                </div>
              )}
              <div className="w-16 h-16 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0">
                <Thumbnail src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{product.title}</p>
                {product.category && (
                  <p className="text-sm text-gray-500">{product.category}</p>
                )}
                <p className="text-sm font-semibold text-cyan-600 mt-1">{product.price}</p>
              </div>
              {product.salesCount && (
                <div className="text-right">
                  <p className="text-xs text-gray-500">Sales</p>
                  <p className="font-semibold text-gray-900">{product.salesCount.toLocaleString()}</p>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  // Horizontal layout (default)
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <ArrowTrendingUp className="w-6 h-6 text-cyan-500" />
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {displayProducts.map((product, idx) => (
          <Link
            key={product.id}
            to={`/us/products/${product.handle}`}
            className="flex-shrink-0 w-48 bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-square bg-gray-50">
              <Thumbnail src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
              {showRank && (
                <div className={`absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${idx === 0 ? "bg-yellow-400 text-yellow-900" : idx === 1 ? "bg-gray-300 text-gray-700" : idx === 2 ? "bg-orange-300 text-orange-900" : "bg-white text-gray-600 shadow"}`}>
                  {idx + 1}
                </div>
              )}
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-gray-900 line-clamp-2">{product.title}</p>
              <p className="text-sm font-semibold text-cyan-600 mt-1">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
