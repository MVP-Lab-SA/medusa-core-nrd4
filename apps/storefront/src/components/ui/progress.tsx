import { clsx } from "clsx"

interface ProgressProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  variant?: "default" | "success" | "warning" | "error"
  showLabel?: boolean
  label?: string
  className?: string
}

export const Progress = ({
  value,
  max = 100,
  size = "md",
  variant = "default",
  showLabel = false,
  label,
  className,
}: ProgressProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  }

  const variantClasses = {
    default: "bg-city-cyan",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    error: "bg-rose-500",
  }

  return (
    <div className={clsx("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between mb-2 text-sm">
          {label && <span className="text-city-gray">{label}</span>}
          {showLabel && (
            <span className="text-city-muted">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div
        className={clsx(
          "w-full bg-city-steel rounded-full overflow-hidden",
          sizeClasses[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-300 ease-out",
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default Progress
