import { useState, useRef, useEffect } from "react"
import { ArrowPath } from "@medusajs/icons"

interface Product360ViewerProps {
  images: string[]
  alt?: string
  autoRotate?: boolean
  autoRotateSpeed?: number
  className?: string
}

export function Product360Viewer({
  images,
  alt = "Product 360 view",
  autoRotate = false,
  autoRotateSpeed = 100,
  className = ""
}: Product360ViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef(0)
  const frameRef = useRef(0)

  useEffect(() => {
    // Preload images
    let loadedCount = 0
    images.forEach(src => {
      const img = new Image()
      img.onload = () => {
        loadedCount++
        if (loadedCount === images.length) {
          setIsLoading(false)
        }
      }
      img.src = src
    })
  }, [images])

  useEffect(() => {
    if (!isAutoRotating || isDragging) return

    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % images.length)
    }, autoRotateSpeed)

    return () => clearInterval(interval)
  }, [isAutoRotating, isDragging, images.length, autoRotateSpeed])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setIsAutoRotating(false)
    startXRef.current = e.clientX
    frameRef.current = currentFrame
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - startXRef.current
    const sensitivity = 5
    const frameChange = Math.floor(deltaX / sensitivity)
    let newFrame = (frameRef.current + frameChange) % images.length
    if (newFrame < 0) newFrame += images.length
    setCurrentFrame(newFrame)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setIsAutoRotating(false)
    startXRef.current = e.touches[0].clientX
    frameRef.current = currentFrame
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const deltaX = e.touches[0].clientX - startXRef.current
    const sensitivity = 5
    const frameChange = Math.floor(deltaX / sensitivity)
    let newFrame = (frameRef.current + frameChange) % images.length
    if (newFrame < 0) newFrame += images.length
    setCurrentFrame(newFrame)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  if (images.length === 0) return null

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <img
            src={images[currentFrame]}
            alt={`${alt} - frame ${currentFrame + 1}`}
            className="w-full h-full object-contain"
            draggable={false}
          />
        )}

        {/* 360 badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/70 text-white text-xs rounded">
          <ArrowPath className="w-3 h-3" />
          360
        </div>

        {/* Frame indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/70 text-white text-xs rounded">
          {currentFrame + 1} / {images.length}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-3">
        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm ${isAutoRotating ? "bg-cyan-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          <ArrowPath className={`w-4 h-4 ${isAutoRotating ? "animate-spin" : ""}`} />
          {isAutoRotating ? "Stop" : "Auto Rotate"}
        </button>
        <p className="text-xs text-gray-500">Drag to rotate</p>
      </div>
    </div>
  )
}
