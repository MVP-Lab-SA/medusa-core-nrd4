import { Star } from "@medusajs/icons"

interface VendorRatingProps {
  rating: number
  reviewCount?: number
  size?: "sm" | "md" | "lg"
  showCount?: boolean
}

export function VendorRating({ rating, reviewCount, size = "md", showCount = true }: VendorRatingProps) {
  const sizes = {
    sm: { star: "w-3 h-3", text: "text-xs" },
    md: { star: "w-4 h-4", text: "text-sm" },
    lg: { star: "w-5 h-5", text: "text-base" },
  }

  const { star, text } = sizes[size]

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${star} ${i <= Math.round(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        />
      ))}
      <span className={`${text} font-medium ml-1`}>{rating.toFixed(1)}</span>
      {showCount && reviewCount !== undefined && (
        <span className={`${text} text-gray-500`}>({reviewCount})</span>
      )}
    </div>
  )
}
