import { useState, useCallback, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "@medusajs/icons"
import { clsx } from "clsx"

export interface CarouselImage {
  id: string
  url: string
  alt?: string
  caption?: string
}

interface ContentCarouselProps {
  images: CarouselImage[]
  aspectRatio?: "square" | "video" | "wide" | "portrait"
  showThumbnails?: boolean
  showDots?: boolean
  showArrows?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
  thumbnailPosition?: "bottom" | "left"
  enableZoom?: boolean
}

export function ContentCarousel({
  images,
  aspectRatio = "video",
  showThumbnails = true,
  showDots = false,
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  className,
  thumbnailPosition = "bottom",
  enableZoom = false,
}: ContentCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      autoPlayRef.current = setInterval(goToNext, autoPlayInterval)
      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current)
        }
      }
    }
  }, [autoPlay, autoPlayInterval, goToNext, images.length])

  // Pause autoplay on hover
  const pauseAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }, [])

  const resumeAutoPlay = useCallback(() => {
    if (autoPlay && images.length > 1) {
      autoPlayRef.current = setInterval(goToNext, autoPlayInterval)
    }
  }, [autoPlay, autoPlayInterval, goToNext, images.length])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !enableZoom) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }, [isZoomed, enableZoom])

  const toggleZoom = useCallback(() => {
    if (enableZoom) {
      setIsZoomed((prev) => !prev)
    }
  }, [enableZoom])

  if (images.length === 0) {
    return (
      <div className={clsx("bg-city-slate rounded-lg flex items-center justify-center", className)}>
        <span className="text-city-muted">No images available</span>
      </div>
    )
  }

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    portrait: "aspect-[3/4]",
  }

  const isLeftThumbnails = thumbnailPosition === "left" && showThumbnails

  return (
    <div 
      className={clsx(
        "flex gap-4",
        isLeftThumbnails ? "flex-row" : "flex-col",
        className
      )}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Left Thumbnails */}
      {isLeftThumbnails && images.length > 1 && (
        <div className="flex flex-col gap-2 w-20 overflow-y-auto max-h-[500px]">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToSlide(index)}
              className={clsx(
                "flex-shrink-0 w-full aspect-square rounded-lg overflow-hidden border-2 transition-all",
                index === currentIndex
                  ? "border-city-cyan ring-2 ring-city-cyan/30"
                  : "border-city-steel/30 hover:border-city-steel"
              )}
            >
              <img
                src={image.url}
                alt={image.alt || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Carousel */}
      <div className="flex-1">
        <div className="relative">
          <div 
            className={clsx(
              "relative w-full overflow-hidden bg-city-navy rounded-lg",
              aspectClasses[aspectRatio],
              enableZoom && (isZoomed ? "cursor-zoom-out" : "cursor-zoom-in")
            )}
            onClick={toggleZoom}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isZoomed && setIsZoomed(false)}
          >
            <div 
              className="flex transition-transform duration-500 ease-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="w-full h-full flex-shrink-0 relative"
                >
                  <img
                    src={image.url}
                    className={clsx(
                      "absolute inset-0 w-full h-full object-cover transition-transform duration-200",
                      isZoomed && index === currentIndex && enableZoom ? "scale-150" : "scale-100"
                    )}
                    style={
                      isZoomed && index === currentIndex && enableZoom
                        ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                        : undefined
                    }
                    alt={image.alt || `Image ${index + 1}`}
                    loading={index <= 1 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : undefined}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {showArrows && images.length > 1 && !isZoomed && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrevious()
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-city-dark/80 hover:bg-city-dark text-city-gray hover:text-city-cyan rounded-full flex items-center justify-center transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-city-dark/80 hover:bg-city-dark text-city-gray hover:text-city-cyan rounded-full flex items-center justify-center transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-3 z-10 px-3 py-1 bg-city-dark/80 rounded-full text-city-gray text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Caption */}
          {images[currentIndex]?.caption && (
            <p className="mt-3 text-city-gray text-sm text-center">
              {images[currentIndex].caption}
            </p>
          )}
        </div>

        {/* Dot Indicators */}
        {showDots && images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={clsx(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex
                    ? "bg-city-cyan w-6"
                    : "bg-city-steel hover:bg-city-gray"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Bottom Thumbnails */}
        {showThumbnails && thumbnailPosition === "bottom" && images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToSlide(index)}
                className={clsx(
                  "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                  index === currentIndex
                    ? "border-city-cyan ring-2 ring-city-cyan/30"
                    : "border-city-steel/30 hover:border-city-steel"
                )}
              >
                <img
                  src={image.url}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ContentCarousel
