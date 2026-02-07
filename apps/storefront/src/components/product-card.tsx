import ProductPrice from "@/components/product-price"
import { Thumbnail } from "@/components/ui/thumbnail"
import { getCountryCodeFromPath } from "@/lib/utils/region"
import { HttpTypes } from "@medusajs/types"
import { Link, useLocation } from "@tanstack/react-router"

interface ProductCardProps {
  product: HttpTypes.StoreProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const location = useLocation()
  const countryCode = getCountryCodeFromPath(location.pathname) || "us"

  return (
    <Link
      to="/$countryCode/products/$handle"
      params={{ countryCode, handle: product.handle }}
      className="group flex flex-col w-full"
    >
      <div className="aspect-square w-full overflow-hidden bg-city-slate/50 relative border border-city-steel/30 transition-all duration-300 group-hover:border-city-cyan/50">
        <Thumbnail
          thumbnail={product.thumbnail}
          alt={product.title}
          className="absolute inset-0 object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-city-cyan/0 transition-colors duration-300 group-hover:bg-city-cyan/5" />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <span className="text-city-white font-medium group-hover:text-city-cyan transition-colors">
          {product.title}
        </span>
        <ProductPrice
          product={product}
          variant={product.variants?.[0]}
          className="text-city-gray"
        />
      </div>
    </Link>
  )
}

export default ProductCard
