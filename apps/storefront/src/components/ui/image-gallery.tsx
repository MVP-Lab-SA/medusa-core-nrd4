import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus, Minus } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { useState, useCallback, memo } from "react"
import { clsx } from "clsx"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = memo(function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }, [isZoomed])

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev)
  }, [])

  if (images.length === 0) return null

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative">
        <div 
          className={clsx(
            "relative aspect-square w-full overflow-hidden bg-city-navy rounded-lg",
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          )}
          onClick={toggleZoom}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isZoomed && setIsZoomed(false)}
        >
          <div 
            className="flex transition-transform duration-300 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => {
              const isFirstImage = index === 0
              const isCriticalImage = index <= 1
              
              return (
                <div
                  key={image.id}
                  className="w-full h-full flex-shrink-0 relative"
                >
                  {!!image.url && (
                    <img
                      src={image.url}
                      className={clsx(
                        "absolute inset-0 w-full h-full transition-transform duration-200",
                        isZoomed && index === currentIndex ? "scale-150" : "scale-100 object-cover"
                      )}
                      style={
                        isZoomed && index === currentIndex
                          ? {
                              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                            }
                          : undefined
                      }
                      alt={isFirstImage ? "Main product image" : `Product image ${index + 1}`}
                      loading={isCriticalImage ? "eager" : "lazy"}
                      fetchPriority={isFirstImage ? "high" : undefined}
                      decoding="async"
                    />
                  )}
                </div>
              )
            })}
          </div>
          
          {/* Zoom indicator */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleZoom()
            }}
            className="absolute top-4 right-4 z-10 p-2 bg-city-dark/80 rounded-full text-city-gray hover:text-city-cyan transition-colors"
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
          
          {/* Navigation arrows */}
          {images.length > 1 && !isZoomed && (
            <>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-city-dark/80 hover:bg-city-dark text-city-gray hover:text-city-cyan rounded-full p-2"
                aria-label="Previous image"
                variant="transparent"
                size="fit"
              >
                <ChevronLeft />
              </Button>
              
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-city-dark/80 hover:bg-city-dark text-city-gray hover:text-city-cyan rounded-full p-2"
                aria-label="Next image"
                variant="transparent"
                size="fit"
              >
                <ChevronRight />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={clsx(
                "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                index === currentIndex
                  ? "border-city-cyan"
                  : "border-city-steel/30 hover:border-city-steel"
              )}
            >
              {!!image.url && (
                <img
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
})

ImageGallery.displayName = "ImageGallery"

export { ImageGallery }
export default ImageGallery
