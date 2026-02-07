import { useState, useEffect, useCallback } from "react"
import { clx } from "@medusajs/ui"
import { XMark, ChevronLeft, ChevronRight, Plus, Minus } from "@medusajs/icons"

interface LightboxImage {
  src: string
  alt?: string
  caption?: string
}

interface LightboxProps {
  images: LightboxImage[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
  enableZoom?: boolean
  showThumbnails?: boolean
  className?: string
}

export function Lightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  enableZoom = true,
  showThumbnails = true,
  className,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex, isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          goToPrev()
          break
        case "ArrowRight":
          goToNext()
          break
      }
    },
    [isOpen, onClose]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const goToPrev = () => {
    setIsZoomed(false)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setIsZoomed(false)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  return (
    <div className={clx("fixed inset-0 z-50 bg-black", className)}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
        <span className="text-white/70 text-sm">
          {currentIndex + 1} / {images.length}
        </span>
        <div className="flex items-center gap-2">
          {enableZoom && (
            <button
              onClick={toggleZoom}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? (
                <Minus className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close"
          >
            <XMark className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main image */}
      <div
        className="absolute inset-0 flex items-center justify-center p-16"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt || ""}
          className={clx(
            "max-w-full max-h-full object-contain transition-transform duration-300",
            isZoomed && "scale-150 cursor-zoom-out"
          )}
          onClick={enableZoom ? toggleZoom : undefined}
        />
      </div>

      {/* Caption */}
      {currentImage.caption && (
        <div className="absolute bottom-20 left-0 right-0 text-center">
          <p className="text-white/80 text-sm px-4">{currentImage.caption}</p>
        </div>
      )}

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/30 hover:bg-black/50 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/30 hover:bg-black/50 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 rounded-lg">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setIsZoomed(false)
                setCurrentIndex(index)
              }}
              className={clx(
                "w-12 h-12 rounded overflow-hidden border-2 transition-all",
                index === currentIndex
                  ? "border-cyan-500"
                  : "border-transparent opacity-50 hover:opacity-100"
              )}
            >
              <img
                src={image.src}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Hook for easy lightbox usage
export function useLightbox(images: LightboxImage[]) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialIndex, setInitialIndex] = useState(0)

  const open = (index: number = 0) => {
    setInitialIndex(index)
    setIsOpen(true)
  }

  const close = () => setIsOpen(false)

  return {
    isOpen,
    initialIndex,
    open,
    close,
    LightboxComponent: () => (
      <Lightbox
        images={images}
        initialIndex={initialIndex}
        isOpen={isOpen}
        onClose={close}
      />
    ),
  }
}
