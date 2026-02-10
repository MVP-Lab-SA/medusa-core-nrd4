import { clsx } from "clsx"
import { useCallback, useRef, useState, useEffect } from "react"

interface SliderProps {
  min: number
  max: number
  value: number | [number, number]
  onChange: (value: number | [number, number]) => void
  step?: number
  disabled?: boolean
  className?: string
  showLabels?: boolean
  formatLabel?: (value: number) => string
}

export const Slider = ({
  min,
  max,
  value,
  onChange,
  step = 1,
  disabled = false,
  className,
  showLabels = false,
  formatLabel = (v) => String(v),
}: SliderProps) => {
  const isRange = Array.isArray(value)
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return min
      const rect = trackRef.current.getBoundingClientRect()
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      const rawValue = min + percentage * (max - min)
      return Math.round(rawValue / step) * step
    },
    [min, max, step]
  )

  const handleMouseDown = (thumb: "min" | "max") => (e: React.MouseEvent) => {
    if (disabled) return
    e.preventDefault()
    setIsDragging(thumb)
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const newValue = getValueFromPosition(e.clientX)

      if (isRange) {
        const [minVal, maxVal] = value as [number, number]
        if (isDragging === "min") {
          onChange([Math.min(newValue, maxVal - step), maxVal])
        } else {
          onChange([minVal, Math.max(newValue, minVal + step)])
        }
      } else {
        onChange(newValue)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(null)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isRange, value, onChange, getValueFromPosition, step])

  const minValue = isRange ? (value as [number, number])[0] : min
  const maxValue = isRange ? (value as [number, number])[1] : (value as number)

  return (
    <div className={clsx("w-full", className)}>
      {showLabels && (
        <div className="flex justify-between mb-2 text-sm text-city-muted">
          <span>{formatLabel(minValue)}</span>
          <span>{formatLabel(maxValue)}</span>
        </div>
      )}
      <div
        ref={trackRef}
        className={clsx(
          "relative h-2 bg-city-steel rounded-full cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {/* Active track */}
        <div
          className="absolute h-full bg-city-cyan rounded-full"
          style={{
            left: isRange ? `${getPercentage(minValue)}%` : "0%",
            width: isRange
              ? `${getPercentage(maxValue) - getPercentage(minValue)}%`
              : `${getPercentage(maxValue)}%`,
          }}
        />

        {/* Min thumb (for range) */}
        {isRange && (
          <button
            type="button"
            onMouseDown={handleMouseDown("min")}
            className={clsx(
              "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-city-cyan rounded-full shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-city-cyan-light focus-visible:ring-offset-2 focus-visible:ring-offset-city-dark transition-transform",
              isDragging === "min" && "scale-110",
              disabled && "cursor-not-allowed"
            )}
            style={{ left: `${getPercentage(minValue)}%` }}
            disabled={disabled}
            aria-label="Minimum value"
          />
        )}

        {/* Max thumb (or single thumb) */}
        <button
          type="button"
          onMouseDown={handleMouseDown("max")}
          className={clsx(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-city-cyan rounded-full shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-city-cyan-light focus-visible:ring-offset-2 focus-visible:ring-offset-city-dark transition-transform",
            isDragging === "max" && "scale-110",
            disabled && "cursor-not-allowed"
          )}
          style={{ left: `${getPercentage(maxValue)}%` }}
          disabled={disabled}
          aria-label={isRange ? "Maximum value" : "Value"}
        />
      </div>
    </div>
  )
}

export default Slider
