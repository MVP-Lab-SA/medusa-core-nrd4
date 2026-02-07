import * as React from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from "lucide-react"
import { clx } from "@medusajs/ui"

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
  showThumbnails?: boolean
  showCounter?: boolean
  enableZoom?: boolean
  enableDownload?: boolean
  className?: string
}

export function Lightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  showThumbnails = true,
  showCounter = true,
  enableZoom = true,
  enableDownload = true,
  className
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex)
  const [zoom, setZoom] = React.useState(1)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const dragStart = React.useRef({ x: 0, y: 0 })

  React.useEffect(() => {
    setCurrentIndex(initialIndex)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [initialIndex, isOpen])

  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
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
        case "+":
        case "=":
          handleZoomIn()
          break
        case "-":
          handleZoomOut()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, currentIndex])

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 1)
      if (newZoom === 1) setPosition({ x: 0, y: 0 })
      return newZoom
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y }
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = images[currentIndex].src
    link.download = images[currentIndex].alt || "image"
    link.click()
  }

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  return (
    <div
      className={clx(
        "fixed inset-0 z-50 bg-black/95 flex flex-col",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          {showCounter && (
            <span className="text-white text-sm">
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {enableZoom && (
            <>
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                className="p-2 rounded-lg hover:bg-white/10 text-white disabled:opacity-50 transition-colors"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-white text-sm w-16 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="p-2 rounded-lg hover:bg-white/10 text-white disabled:opacity-50 transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </>
          )}
          {enableDownload && (
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              <Download className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {images.length > 1 && (
          <button
            onClick={goToPrev}
            className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          src={currentImage.src}
          alt={currentImage.alt || ""}
          className={clx(
            "max-w-full max-h-full object-contain transition-transform",
            zoom > 1 ? "cursor-grab" : "cursor-zoom-in",
            isDragging && "cursor-grabbing"
          )}
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`
          }}
          onClick={() => zoom === 1 && handleZoomIn()}
          draggable={false}
        />

        {images.length > 1 && (
          <button
            onClick={goToNext}
            className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Caption */}
      {currentImage.caption && (
        <div className="text-center py-2">
          <p className="text-white text-sm">{currentImage.caption}</p>
        </div>
      )}

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className="flex justify-center gap-2 p-4 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setZoom(1)
                setPosition({ x: 0, y: 0 })
              }}
              className={clx(
                "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors",
                index === currentIndex
                  ? "border-cyan-500"
                  : "border-transparent hover:border-white/50"
              )}
            >
              <img
                src={image.src}
                alt={image.alt || ""}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Hook for lightbox
export function useLightbox(images: LightboxImage[]) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [initialIndex, setInitialIndex] = React.useState(0)

  const open = React.useCallback((index = 0) => {
    setInitialIndex(index)
    setIsOpen(true)
  }, [])

  const close = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  return { isOpen, initialIndex, open, close, images }
}
