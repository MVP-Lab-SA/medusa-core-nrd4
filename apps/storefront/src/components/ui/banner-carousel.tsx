import * as React from "react"
import { Link } from "@tanstack/react-router"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { clx } from "@medusajs/ui"

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
  align?: "left" | "center" | "right"
  overlay?: boolean
}

interface BannerCarouselProps {
  banners: Banner[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showArrows?: boolean
  showDots?: boolean
  aspectRatio?: string
  className?: string
}

export function BannerCarousel({
  banners,
  autoPlay = true,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  aspectRatio = "aspect-[21/9]",
  className
}: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isHovered, setIsHovered] = React.useState(false)

  React.useEffect(() => {
    if (!autoPlay || isHovered || banners.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, banners.length, isHovered])

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  if (banners.length === 0) return null

  const currentBanner = banners[currentIndex]

  return (
    <div
      className={clx("relative overflow-hidden rounded-xl", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={clx("relative", aspectRatio)}>
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={clx(
              "absolute inset-0 transition-opacity duration-500",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <picture>
              {banner.mobileImage && (
                <source media="(max-width: 768px)" srcSet={banner.mobileImage} />
              )}
              <img
                src={banner.image}
                alt={banner.title || `Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </picture>
            
            {banner.overlay && (
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            )}
          </div>
        ))}

        {(currentBanner.title || currentBanner.subtitle || currentBanner.cta) && (
          <div
            className={clx(
              "absolute inset-0 flex flex-col justify-center p-8 md:p-12 lg:p-16",
              currentBanner.align === "center" && "items-center text-center",
              currentBanner.align === "right" && "items-end text-right",
              !currentBanner.align && "items-start"
            )}
          >
            {currentBanner.subtitle && (
              <p className="text-cyan-400 text-sm md:text-base font-medium mb-2 uppercase tracking-wider">
                {currentBanner.subtitle}
              </p>
            )}
            {currentBanner.title && (
              <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-xl">
                {currentBanner.title}
              </h2>
            )}
            {currentBanner.cta && (
              <Link
                to={currentBanner.cta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors"
              >
                {currentBanner.cta.text}
              </Link>
            )}
          </div>
        )}
      </div>

      {showArrows && banners.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className={clx(
              "absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all",
              "bg-black/50 text-white hover:bg-black/70",
              "opacity-0 group-hover:opacity-100",
              isHovered && "opacity-100"
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className={clx(
              "absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all",
              "bg-black/50 text-white hover:bg-black/70",
              "opacity-0 group-hover:opacity-100",
              isHovered && "opacity-100"
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {showDots && banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={clx(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex
                  ? "w-8 bg-cyan-500"
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
