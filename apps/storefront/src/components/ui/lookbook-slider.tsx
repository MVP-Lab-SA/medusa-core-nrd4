import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { ChevronLeft, ChevronRight, ShoppingBag } from "@medusajs/icons"

interface Product {
  id: string
  title: string
  handle: string
  thumbnail?: string
  price: string
  position: { x: number; y: number }
}

interface LookbookSlide {
  id: string
  image: string
  title?: string
  products: Product[]
}

interface LookbookSliderProps {
  slides: LookbookSlide[]
  className?: string
}

export function LookbookSlider({ slides, className = "" }: LookbookSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeProduct, setActiveProduct] = useState<string | null>(null)

  const goToPrev = () => {
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : slides.length - 1))
    setActiveProduct(null)
  }

  const goToNext = () => {
    setCurrentSlide(prev => (prev < slides.length - 1 ? prev + 1 : 0))
    setActiveProduct(null)
  }

  const slide = slides[currentSlide]

  return (
    <div className={`relative ${className}`}>
      <div className="aspect-[4/5] md:aspect-[16/9] relative overflow-hidden rounded-2xl">
        <img
          src={slide.image}
          alt={slide.title || "Lookbook"}
          className="w-full h-full object-cover"
        />

        {/* Product Hotspots */}
        {slide.products.map(product => (
          <div
            key={product.id}
            className="absolute"
            style={{ left: `${product.position.x}%`, top: `${product.position.y}%` }}
          >
            <button
              onClick={() => setActiveProduct(activeProduct === product.id ? null : product.id)}
              className={`w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center transition-all ${
                activeProduct === product.id
                  ? "bg-cyan-500 text-white scale-110"
                  : "bg-white/90 text-gray-700 hover:scale-110"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
            </button>

            {/* Product Card */}
            {activeProduct === product.id && (
              <div className="absolute z-10 w-48 bg-white rounded-lg shadow-xl p-3 mt-2 -ml-20">
                <Link
                  to={`/us/products/${product.handle}` as any}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.title}
                    </p>
                    <p className="text-sm text-cyan-600">{product.price}</p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        ))}

        {/* Navigation */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx)
                setActiveProduct(null)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentSlide ? "bg-white w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Products List */}
      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-2">
          {slide.products.length} products in this look
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {slide.products.map(product => (
            <Link
              key={product.id}
              to={`/us/products/${product.handle}` as any}
              className="flex-shrink-0 w-24"
            >
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-1">
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              <p className="text-xs font-medium text-gray-900 truncate">{product.title}</p>
              <p className="text-xs text-cyan-600">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
