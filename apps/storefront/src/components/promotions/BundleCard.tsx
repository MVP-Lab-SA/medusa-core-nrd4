import { Link } from "@tanstack/react-router"
import type { BundleOffer } from "../../lib/mock/marketplace"

interface BundleCardProps {
  bundle: BundleOffer
  countryCode: string
}

export function BundleCard({ bundle, countryCode }: BundleCardProps) {
  const savings = bundle.originalPrice - bundle.bundlePrice
  const savingsPercent = Math.round((savings / bundle.originalPrice) * 100)

  return (
    <Link
      to={`/${countryCode}/bundles/${bundle.handle}`}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <div className="grid grid-cols-2 gap-0.5 bg-gray-100">
          {bundle.products.slice(0, 4).map((product, index) => (
            <div key={product.id} className="aspect-square bg-white">
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100" />
              )}
            </div>
          ))}
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-sm font-bold rounded">
          Save {savingsPercent}%
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
          }).format(savings)}
        </p>
      </div>
    </Link>
  )
}
