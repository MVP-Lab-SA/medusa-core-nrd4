import { Star } from "@medusajs/icons"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  interactive?: boolean
  onChange?: (rating: number) => void
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  interactive = false,
  onChange,
}: StarRatingProps) {
  const sizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, i) => (
        <button
          key={i}
          type={interactive ? "button" : undefined}
          onClick={() => interactive && onChange?.(i + 1)}
          disabled={!interactive}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            className={`${sizes[size]} ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-current"
                : i < rating
                ? "text-yellow-400 fill-current opacity-50"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
      {showValue && (
        <span className={`${textSizes[size]} font-medium text-gray-700 ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
