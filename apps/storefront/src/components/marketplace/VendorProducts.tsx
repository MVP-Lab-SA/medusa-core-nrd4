import { Link } from "@tanstack/react-router"

interface VendorProduct {
  id: string
  title: string
  handle: string
  thumbnail?: string
  price: number
  currency: string
}

interface VendorProductsProps {
  products: VendorProduct[]
  countryCode: string
  vendorName: string
}

export function VendorProducts({ products, countryCode, vendorName }: VendorProductsProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">{vendorName} has no products yet</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/${countryCode}/products/${product.handle}` as any}
          className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="aspect-square bg-gray-100 overflow-hidden">
            {product.thumbnail ? (
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          <div className="p-3">
            <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600">
              {product.title}
            </h4>
            <p className="text-sm font-semibold text-gray-900">
              {new Intl.NumberFormat("en", {
                style: "currency",
                currency: product.currency,
              }).format(product.price)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
