import { clx } from "@medusajs/ui"
import { Check, XMark } from "@medusajs/icons"

interface Product {
  id: string
  title: string
  thumbnail?: string
  price: string
  features: Record<string, string | boolean | number>
}

interface ComparisonTableProps {
  products: Product[]
  features: { key: string; label: string }[]
  highlightBest?: boolean
  onRemove?: (productId: string) => void
  className?: string
}

export function ComparisonTable({
  products,
  features,
  highlightBest = true,
  onRemove,
  className,
}: ComparisonTableProps) {
  if (products.length === 0) {
    return (
      <div className={clx("text-center py-12", className)}>
        <p className="text-neutral-400">No products to compare</p>
      </div>
    )
  }

  const renderValue = (value: string | boolean | number) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
      ) : (
        <XMark className="w-5 h-5 text-red-500 mx-auto" />
      )
    }
    return <span className="text-neutral-300">{value}</span>
  }

  return (
    <div className={clx("overflow-x-auto", className)}>
      <table className="w-full min-w-[640px]">
        <thead>
          <tr>
            <th className="text-left p-4 bg-neutral-900 rounded-tl-xl" />
            {products.map((product, index) => (
              <th
                key={product.id}
                className={clx(
                  "p-4 bg-neutral-900 min-w-[200px]",
                  index === products.length - 1 && "rounded-tr-xl"
                )}
              >
                <div className="relative">
                  {onRemove && (
                    <button
                      onClick={() => onRemove(product.id)}
                      className="absolute -top-1 -right-1 p-1 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors"
                      aria-label={`Remove ${product.title}`}
                    >
                      <XMark className="w-4 h-4 text-neutral-400" />
                    </button>
                  )}
                  {product.thumbnail && (
                    <div className="w-24 h-24 mx-auto mb-3 rounded-lg overflow-hidden bg-neutral-800">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-cyan-400 font-bold">{product.price}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, featureIndex) => (
            <tr key={feature.key}>
              <td
                className={clx(
                  "p-4 text-sm font-medium text-neutral-400 bg-neutral-900/50 border-t border-neutral-800",
                  featureIndex === features.length - 1 && "rounded-bl-xl"
                )}
              >
                {feature.label}
              </td>
              {products.map((product, productIndex) => {
                const value = product.features[feature.key]
                const isBest =
                  highlightBest &&
                  typeof value === "number" &&
                  products.every(
                    (p) =>
                      typeof p.features[feature.key] !== "number" ||
                      value >= (p.features[feature.key] as number)
                  )

                return (
                  <td
                    key={product.id}
                    className={clx(
                      "p-4 text-center text-sm border-t border-neutral-800",
                      isBest && "bg-cyan-500/10",
                      featureIndex === features.length - 1 &&
                        productIndex === products.length - 1 &&
                        "rounded-br-xl"
                    )}
                  >
                    {renderValue(value)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
