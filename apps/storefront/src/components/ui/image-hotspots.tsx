import { useState } from "react"
import { Plus, XMark } from "@medusajs/icons"
import { Link } from "@tanstack/react-router"

interface Hotspot {
  id: string
  x: number // percentage 0-100
  y: number // percentage 0-100
  title: string
  description?: string
  link?: string
  linkText?: string
  image?: string
}

interface ImageHotspotsProps {
  src: string
  alt?: string
  hotspots: Hotspot[]
  className?: string
}

export function ImageHotspots({
  src,
  alt = "Interactive image",
  hotspots,
  className = ""
}: ImageHotspotsProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)

  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-auto"
        onClick={() => setActiveHotspot(null)}
      />

      {hotspots.map(hotspot => {
        const isActive = activeHotspot === hotspot.id

        return (
          <div
            key={hotspot.id}
            className="absolute"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
          >
            {/* Hotspot button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setActiveHotspot(isActive ? null : hotspot.id)
              }}
              className={`relative w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center transition-all ${
                isActive
                  ? "bg-cyan-500 text-white scale-110"
                  : "bg-white text-gray-700 shadow-lg hover:scale-110"
              }`}
            >
              {isActive ? (
                <XMark className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              
              {/* Pulse animation */}
              {!isActive && (
                <span className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-30" />
              )}
            </button>

            {/* Tooltip */}
            {isActive && (
              <div
                className="absolute z-10 w-64 bg-white rounded-lg shadow-xl p-4 mt-2"
                style={{
                  left: hotspot.x > 50 ? "auto" : "0",
                  right: hotspot.x > 50 ? "0" : "auto",
                  transform: hotspot.x > 50 ? "translateX(50%)" : "translateX(-50%)"
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {hotspot.image && (
                  <img
                    src={hotspot.image}
                    alt={hotspot.title}
                    className="w-full h-24 object-cover rounded mb-3"
                  />
                )}
                <h4 className="font-semibold text-gray-900 mb-1">{hotspot.title}</h4>
                {hotspot.description && (
                  <p className="text-sm text-gray-600 mb-3">{hotspot.description}</p>
                )}
                {hotspot.link && (
                  <Link
                    to={hotspot.link}
                    className="inline-flex text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                  >
                    {hotspot.linkText || "Learn more"} &rarr;
                  </Link>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
