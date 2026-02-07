import { useState, useEffect, useRef, useCallback } from "react"
import { Link } from "@tanstack/react-router"
import { clx } from "@medusajs/ui"
import { ChevronLeft, ChevronRight } from "@medusajs/icons"

interface Banner {
  id: string
  image: string
  mobileImage?: string
  title?: string
  subtitle?: string
  cta?: {
    text: string
    href: string
  }
  overlay?: boolean
  textPosition?: "left" | "center" | "right"
}

interface BannerCarouselProps {
  banners: Banner[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showArrows?: boolean
  showDots?: boolean
  className?: string
  aspectRatio?: string
}

export function BannerCarousel({
  banners,
  autoPlay = true,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  className,
  aspectRatio = "aspect-[21/9]",
}: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex((index + banners.length) % banners.length)
  }, [banners.length])

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex - 1)
  }, [currentIndex, goToSlide])

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1)
  }, [currentIndex, goToSlide])

  useEffect(() => {
    if (autoPlay && !isPaused && banners.length > 1) {
      intervalRef.current = setInterval(goToNext, autoPlayInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoPlay, isPaused, autoPlayInterval, goToNext, banners.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return

    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrev()
      }
    }

    setTouchStart(null)
  }

  const textPositionClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }

  return (
    <div
      className={clx("relative overflow-hidden group", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={clx("relative", aspectRatio)}>
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={clx(
              "absolute inset-0 transition-opacity duration-700",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <picture>
              {banner.mobileImage && (
                <source media="(max-width: 768px)" srcSet={banner.mobileImage} />
              )}
              <img
                src={banner.image}
                alt={banner.title || "Banner"}
                className="w-full h-full object-cover"
              />
            </picture>

            {banner.overlay && (
              <div className="absolute inset-0 bg-black/40" />
            )}

            {(banner.title || banner.subtitle || banner.cta) && (
              <div
                className={clx(
                  "absolute inset-0 flex flex-col justify-center p-8 md:p-16",
                  textPositionClasses[banner.textPosition || "left"]
                )}
              >
                <div className="max-w-xl">
                  {banner.title && (
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                      {banner.title}
                    </h2>
                  )}
                  {banner.subtitle && (
                    <p className="text-lg md:text-xl text-white/90 mb-6 drop-shadow">
                      {banner.subtitle}
                    </p>
                  )}
                  {banner.cta && (
                    <Link
                      to={banner.cta.href}
                      className="inline-flex px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors"
                    >
                      {banner.cta.text}
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showArrows && banners.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {showDots && banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={clx(
                "w-2.5 h-2.5 rounded-full transition-all",
                index === currentIndex
                  ? "bg-cyan-500 w-8"
                  : "bg-white/50 hover:bg-white/70"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
