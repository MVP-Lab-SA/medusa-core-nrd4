import { clsx } from "clsx"

interface LoadingProps {
  rows?: number;
  columns?: number;
  height?: string;
  width?: string;
  className?: string;
}

const Loading = ({
  rows = 3,
  columns = 1,
  height = "h-4",
  width = "w-full",
  className,
}: LoadingProps) => {
  return (
    <div className={clsx("space-y-3 p-2", className)}>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div key={rowIndex} className="flex gap-3">
          {Array.from({ length: columns }, (_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={clsx(
                "animate-pulse bg-city-steel/50 flex-1 rounded",
                height,
                width
              )}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// Spinner component for inline loading
const Spinner = ({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <div
      className={clsx(
        "border-2 border-city-steel border-t-city-cyan rounded-full animate-spin",
        sizeClasses[size],
        className
      )}
    />
  )
}

// Full page loading overlay
const LoadingOverlay = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="fixed inset-0 bg-city-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-city-gray text-sm font-medium">{message}</p>
      </div>
    </div>
  )
}

// Product card skeleton
const ProductCardSkeleton = () => {
  return (
    <div className="space-y-3">
      <div className="aspect-square bg-city-slate animate-pulse rounded" />
      <div className="space-y-2">
        <div className="h-4 bg-city-steel/50 animate-pulse rounded w-3/4" />
        <div className="h-4 bg-city-steel/50 animate-pulse rounded w-1/2" />
      </div>
    </div>
  )
}

export { Loading, Spinner, LoadingOverlay, ProductCardSkeleton }
export default Loading
