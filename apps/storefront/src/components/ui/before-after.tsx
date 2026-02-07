import * as React from "react"
import { clx } from "@medusajs/ui"

interface BeforeAfterProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  initialPosition?: number
  orientation?: "horizontal" | "vertical"
  className?: string
}

export function BeforeAfter({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  initialPosition = 50,
  orientation = "horizontal",
  className
}: BeforeAfterProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState(initialPosition)
  const [isDragging, setIsDragging] = React.useState(false)

  const handleMove = React.useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    let newPosition: number

    if (orientation === "horizontal") {
      newPosition = ((clientX - rect.left) / rect.width) * 100
    } else {
      newPosition = ((clientY - rect.top) / rect.height) * 100
    }

    setPosition(Math.max(0, Math.min(100, newPosition)))
  }, [orientation])

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX, e.clientY)
    }
  }, [isDragging, handleMove])

  const handleTouchMove = React.useCallback((e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY)
    }
  }, [isDragging, handleMove])

  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [handleMouseMove, handleTouchMove])

  const isHorizontal = orientation === "horizontal"

  return (
    <div
      ref={containerRef}
      className={clx(
        "relative overflow-hidden rounded-xl select-none",
        className
      )}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="w-full h-full object-cover"
        draggable={false}
      />

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={
          isHorizontal
            ? { width: `${position}%` }
            : { height: `${position}%` }
        }
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className={clx(
            "object-cover",
            isHorizontal ? "h-full" : "w-full"
          )}
          style={
            isHorizontal
              ? { width: containerRef.current?.offsetWidth }
              : { height: containerRef.current?.offsetHeight }
          }
          draggable={false}
        />
      </div>

      {/* Slider */}
      <div
        className={clx(
          "absolute flex items-center justify-center",
          isHorizontal
            ? "top-0 bottom-0 w-1 cursor-ew-resize"
            : "left-0 right-0 h-1 cursor-ns-resize"
        )}
        style={
          isHorizontal
            ? { left: `${position}%`, transform: "translateX(-50%)" }
            : { top: `${position}%`, transform: "translateY(-50%)" }
        }
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Line */}
        <div
          className={clx(
            "bg-white shadow-lg",
            isHorizontal ? "w-0.5 h-full" : "h-0.5 w-full"
          )}
        />

        {/* Handle */}
        <div
          className={clx(
            "absolute w-10 h-10 rounded-full bg-white shadow-lg",
            "flex items-center justify-center",
            "border-4 border-cyan-500"
          )}
        >
          <div className="flex gap-0.5">
            <div className="w-0.5 h-4 bg-zinc-400 rounded-full" />
            <div className="w-0.5 h-4 bg-zinc-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div
        className={clx(
          "absolute px-3 py-1 rounded-full bg-black/70 text-white text-sm font-medium",
          isHorizontal ? "top-4 left-4" : "top-4 left-4"
        )}
      >
        {beforeLabel}
      </div>
      <div
        className={clx(
          "absolute px-3 py-1 rounded-full bg-black/70 text-white text-sm font-medium",
          isHorizontal ? "top-4 right-4" : "bottom-4 left-4"
        )}
      >
        {afterLabel}
      </div>
    </div>
  )
}
