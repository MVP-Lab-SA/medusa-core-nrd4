import * as React from "react"
import { X, Check, Minus } from "lucide-react"
import { clx } from "@medusajs/ui"

interface Product {
  id: string
  name: string
  image?: string
  price: string
  rating?: number
  specs: Record<string, string | boolean | number>
}

interface ComparisonTableProps {
  products: Product[]
  specLabels: Record<string, string>
  onRemove?: (productId: string) => void
  onAddToCart?: (productId: string) => void
  maxProducts?: number
  className?: string
}

export function ComparisonTable({
  products,
  specLabels,
  onRemove,
  onAddToCart,
  maxProducts = 4,
  className
}: ComparisonTableProps) {
  const specs = Object.keys(specLabels)

  const renderValue = (value: string | boolean | number | undefined) => {
    if (value === undefined) {
      return <Minus className="w-4 h-4 text-zinc-600" />
    }
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-green-500" />
      ) : (
        <X className="w-5 h-5 text-red-500" />
      )
    }
    return <span className="text-white">{value}</span>
  }

  if (products.length === 0) {
    return (
      <div className={clx("text-center py-12", className)}>
        <p className="text-zinc-400">No products to compare</p>
        <p className="text-zinc-500 text-sm mt-1">
          Add products to start comparing
        </p>
      </div>
    )
  }

  return (
    <div className={clx("overflow-x-auto", className)}>
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            <th className="p-4 text-left text-zinc-400 font-medium w-40">
              Product
            </th>
            {products.slice(0, maxProducts).map((product) => (
              <th key={product.id} className="p-4 text-center">
                <div className="relative">
                  {onRemove && (
                    <button
                      onClick={() => onRemove(product.id)}
                      className="absolute -top-2 -right-2 p-1 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg mx-auto mb-3"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-zinc-800 rounded-lg mx-auto mb-3" />
                  )}
                  
                  <h3 className="text-white font-medium text-sm line-clamp-2">
                    {product.name}
                  </h3>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody>
          {/* Price Row */}
          <tr className="border-t border-zinc-800">
            <td className="p-4 text-zinc-400 font-medium">Price</td>
            {products.slice(0, maxProducts).map((product) => (
              <td key={product.id} className="p-4 text-center">
                <span className="text-cyan-400 font-bold text-lg">
                  {product.price}
                </span>
              </td>
            ))}
          </tr>

          {/* Rating Row */}
          {products.some(p => p.rating !== undefined) && (
            <tr className="border-t border-zinc-800">
              <td className="p-4 text-zinc-400 font-medium">Rating</td>
              {products.slice(0, maxProducts).map((product) => (
                <td key={product.id} className="p-4 text-center">
                  {product.rating !== undefined ? (
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-white">{product.rating}</span>
                    </div>
                  ) : (
                    <Minus className="w-4 h-4 text-zinc-600 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
          )}

          {/* Spec Rows */}
          {specs.map((spec, index) => (
            <tr
              key={spec}
              className={clx(
                "border-t border-zinc-800",
                index % 2 === 0 && "bg-zinc-800/20"
              )}
            >
              <td className="p-4 text-zinc-400 font-medium">
                {specLabels[spec]}
              </td>
              {products.slice(0, maxProducts).map((product) => (
                <td key={product.id} className="p-4 text-center">
                  {renderValue(product.specs[spec])}
                </td>
              ))}
            </tr>
          ))}

          {/* Add to Cart Row */}
          {onAddToCart && (
            <tr className="border-t border-zinc-800">
              <td className="p-4"></td>
              {products.slice(0, maxProducts).map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <button
                    onClick={() => onAddToCart(product.id)}
                    className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors"
                  >
                    Add to Cart
                  </button>
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
