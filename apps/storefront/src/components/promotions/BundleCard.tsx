import { Link } from "@tanstack/react-router"

interface BundleProduct {
  id: string
  title?: string
  name?: string
  image?: string
  thumbnail?: string
}

interface Bundle {
  id: string
  handle: string
  name: string
  description: string
  image?: string
  products: BundleProduct[]
  bundlePrice: number
  originalPrice: number
  savings: number
  savingsPercent: number
  currency: string
}

interface BundleCardProps {
  bundle: Bundle
  countryCode: string
}

export function BundleCard({ bundle, countryCode }: BundleCardProps) {
  return (
    <Link
      to={`/${countryCode}/bundles/${bundle.handle}` as any}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        {/* Show bundle image or product grid */}
        {bundle.image ? (
          <div className="aspect-video bg-gray-100">
            <img
              src={bundle.image}
              alt={bundle.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-0.5 bg-gray-100">
            {bundle.products.slice(0, 4).map((product) => (
              <div key={product.id} className="aspect-square bg-white">
                {(product.image || product.thumbnail) ? (
                  <img
                    src={product.image || product.thumbnail}
                    alt={product.title || product.name || 'Product'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </div>
            ))}
          </div>
        )}
        <div className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-sm font-bold rounded">
          Save {bundle.savingsPercent}%
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
          {bundle.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{bundle.description}</p>
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-gray-900">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: bundle.currency,
            }).format(bundle.bundlePrice)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: bundle.currency,
            }).format(bundle.originalPrice)}
          </span>
        </div>
        <p className="text-sm text-green-600 mt-1">
          You save {new Intl.NumberFormat("en", {
            style: "currency",
            currency: bundle.currency,
          }).format(bundle.savings)}
        </p>
      </div>
    </Link>
  )
}
