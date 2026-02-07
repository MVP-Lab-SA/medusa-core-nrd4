import { useState, useRef } from "react"

interface ZoomLensProps {
  src: string
  alt?: string
  zoomLevel?: number
  lensSize?: number
  className?: string
}

export function ZoomLens({
  src,
  alt = "Product image",
  zoomLevel = 2.5,
  lensSize = 150,
  className = ""
}: ZoomLensProps) {
  const [isZooming, setIsZooming] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Clamp lens position
    const halfLens = lensSize / 2
    const lensX = Math.max(halfLens, Math.min(rect.width - halfLens, x))
    const lensY = Math.max(halfLens, Math.min(rect.height - halfLens, y))

    setLensPosition({ x: lensX, y: lensY })

    // Calculate background position percentage
    const bgX = ((lensX - halfLens) / (rect.width - lensSize)) * 100
    const bgY = ((lensY - halfLens) / (rect.height - lensSize)) * 100

    setPosition({ x: bgX, y: bgY })
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-crosshair ${className}`}
      onMouseEnter={() => setIsZooming(true)}
      onMouseLeave={() => setIsZooming(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        draggable={false}
      />

      {/* Lens overlay */}
      {isZooming && (
        <div
          className="absolute border-2 border-cyan-500 rounded-full pointer-events-none shadow-lg overflow-hidden"
          style={{
            width: lensSize,
            height: lensSize,
            left: lensPosition.x - lensSize / 2,
            top: lensPosition.y - lensSize / 2,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${zoomLevel * 100}%`,
              backgroundPosition: `${position.x}% ${position.y}%`,
              backgroundRepeat: "no-repeat"
            }}
          />
        </div>
      )}

      {/* Hint */}
      {!isZooming && (
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
          Hover to zoom
        </div>
      )}
    </div>
  )
}

// Alternative: Side panel zoom
interface SidePanelZoomProps {
  src: string
  alt?: string
  zoomLevel?: number
  className?: string
}

export function SidePanelZoom({
  src,
  alt = "Product image",
  zoomLevel = 2,
  className = ""
}: SidePanelZoomProps) {
  const [isZooming, setIsZooming] = useState(false)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setPosition({ x, y })
  }

  return (
    <div className={`flex gap-4 ${className}`}>
      <div
        ref={containerRef}
        className="relative flex-1 cursor-crosshair"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-lg"
          draggable={false}
        />
        
        {/* Indicator square */}
        {isZooming && (
          <div
            className="absolute border-2 border-cyan-500 bg-cyan-500/20 pointer-events-none"
            style={{
              width: `${100 / zoomLevel}%`,
              height: `${100 / zoomLevel}%`,
              left: `${Math.max(0, Math.min(100 - 100 / zoomLevel, position.x - 50 / zoomLevel))}%`,
              top: `${Math.max(0, Math.min(100 - 100 / zoomLevel, position.y - 50 / zoomLevel))}%`,
            }}
          />
        )}
      </div>

      {/* Zoomed panel */}
      {isZooming && (
        <div className="w-80 h-80 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${zoomLevel * 100}%`,
              backgroundPosition: `${position.x}% ${position.y}%`,
              backgroundRepeat: "no-repeat"
            }}
          />
        </div>
      )}
    </div>
  )
}
