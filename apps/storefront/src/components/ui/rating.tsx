import { Star, StarSolid } from "@medusajs/icons"
import { clsx } from "clsx"

interface RatingProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  readonly?: boolean
  onChange?: (value: number) => void
  showValue?: boolean
  reviewCount?: number
  className?: string
}

export const Rating = ({
  value,
  max = 5,
  size = "md",
  readonly = true,
  onChange,
  showValue = false,
  reviewCount,
  className,
}: RatingProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const handleClick = (index: number) => {
    if (readonly || !onChange) return
    onChange(index + 1)
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (readonly || !onChange) return
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onChange(index + 1)
    }
  }

  return (
    <div className={clsx("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, index) => {
          const isFilled = index < Math.floor(value)
          const isHalfFilled = index === Math.floor(value) && value % 1 >= 0.5

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={readonly}
              className={clsx(
                "relative transition-colors focus:outline-none",
                !readonly && "cursor-pointer hover:scale-110",
                readonly && "cursor-default"
              )}
              aria-label={`${index + 1} star${index === 0 ? "" : "s"}`}
            >
              {isFilled ? (
                <StarSolid className={clsx(sizeClasses[size], "text-amber-400")} />
              ) : isHalfFilled ? (
                <div className="relative">
                  <Star className={clsx(sizeClasses[size], "text-city-steel")} />
                  <div className="absolute inset-0 overflow-hidden w-1/2">
                    <StarSolid className={clsx(sizeClasses[size], "text-amber-400")} />
                  </div>
                </div>
              ) : (
                <Star className={clsx(sizeClasses[size], "text-city-steel")} />
              )}
            </button>
          )
        })}
      </div>

      {showValue && (
        <span className="text-sm text-city-muted ml-1">
          {value.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className="text-sm text-city-muted">
          ({reviewCount} review{reviewCount !== 1 ? "s" : ""})
        </span>
      )}
    </div>
  )
}

export default Rating
