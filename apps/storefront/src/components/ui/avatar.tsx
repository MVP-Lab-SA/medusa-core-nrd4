import { clsx } from "clsx"
import { forwardRef } from "react"

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, size = "md", className }, ref) => {
    const sizeClasses = {
      xs: "w-6 h-6 text-xs",
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base",
      lg: "w-12 h-12 text-lg",
      xl: "w-16 h-16 text-xl",
    }

    const getFallbackText = () => {
      if (fallback) return fallback.slice(0, 2).toUpperCase()
      if (alt) return alt.slice(0, 2).toUpperCase()
      return "?"
    }

    return (
      <div
        ref={ref}
        className={clsx(
          "relative rounded-full overflow-hidden flex items-center justify-center",
          "bg-city-steel text-city-cyan font-bold",
          sizeClasses[size],
          className
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Hide the image on error, showing fallback
              e.currentTarget.style.display = "none"
            }}
          />
        ) : (
          <span>{getFallbackText()}</span>
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

// Avatar group for displaying multiple avatars
const AvatarGroup = ({
  children,
  max = 4,
  className,
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
}) => {
  const childArray = Array.isArray(children) ? children : [children]
  const visibleChildren = childArray.slice(0, max)
  const remainingCount = childArray.length - max

  return (
    <div className={clsx("flex -space-x-2", className)}>
      {visibleChildren.map((child, index) => (
        <div key={`avatar-group-${index}`} className="ring-2 ring-city-dark rounded-full">
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="w-10 h-10 rounded-full bg-city-steel text-city-cyan flex items-center justify-center text-sm font-medium ring-2 ring-city-dark">
          +{remainingCount}
        </div>
      )}
    </div>
  )
}

export { Avatar, AvatarGroup }
export default Avatar
