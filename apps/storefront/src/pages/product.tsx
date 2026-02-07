import ProductActions from "@/components/product-actions"
import { ImageGallery } from "@/components/ui/image-gallery"
import { useLoaderData } from "@tanstack/react-router"

const ProductDetails = () => {
  const { product, region } = useLoaderData({
    from: "/$countryCode/products/$handle",
  })

  return (
    <div className="min-h-screen bg-city-dark">
      <div className="content-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image gallery */}
          <div className="bg-city-slate/30 p-4 lg:p-8">
            <ImageGallery images={product.images || []} />
          </div>

          {/* Right: Product info + variant selection */}
          <div className="flex flex-col">
            {/* Category badge */}
            {product.collection && (
              <span className="text-city-cyan text-sm font-semibold uppercase tracking-widest mb-4">
                {product.collection.title}
              </span>
            )}

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-city-white mb-4 leading-tight">
              {product.title}
            </h1>

            {/* Description */}
            {product.description && (
              <p className="text-city-gray text-lg leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            {/* Specs section */}
            {product.material && (
              <div className="border-t border-city-steel/30 pt-6 mb-6">
                <h3 className="text-city-cyan text-sm font-semibold uppercase tracking-widest mb-3">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-city-muted">Material</div>
                  <div className="text-city-white">{product.material}</div>
                </div>
              </div>
            )}

            {/* Product Actions */}
            <div className="mt-auto">
              <ProductActions product={product} region={region} />
            </div>

            {/* Trust badges */}
            <div className="mt-8 pt-8 border-t border-city-steel/30 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-city-cyan text-lg font-bold mb-1">24/7</div>
                <div className="text-city-muted text-xs">Support</div>
              </div>
              <div className="text-center">
                <div className="text-city-cyan text-lg font-bold mb-1">2 Year</div>
                <div className="text-city-muted text-xs">Warranty</div>
              </div>
              <div className="text-center">
                <div className="text-city-cyan text-lg font-bold mb-1">Fast</div>
                <div className="text-city-muted text-xs">Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
