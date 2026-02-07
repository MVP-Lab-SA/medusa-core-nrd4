import { clx } from "@medusajs/ui"
import { ExclamationCircle, CheckCircleSolid, XCircleSolid } from "@medusajs/icons"

interface StockIndicatorProps {
  quantity?: number | null
  lowStockThreshold?: number
  showExactCount?: boolean
  variant?: "badge" | "text" | "detailed"
  className?: string
}

export function StockIndicator({
  quantity,
  lowStockThreshold = 5,
  showExactCount = false,
  variant = "badge",
  className,
}: StockIndicatorProps) {
  const isOutOfStock = quantity === 0
  const isLowStock = quantity !== null && quantity !== undefined && quantity > 0 && quantity <= lowStockThreshold
  const isInStock = quantity === null || quantity === undefined || quantity > lowStockThreshold

  const getStatus = () => {
    if (isOutOfStock) {
      return {
        label: "Out of Stock",
        color: "text-red-400",
        bgColor: "bg-red-500/20",
        borderColor: "border-red-500/30",
        icon: <XCircleSolid className="w-4 h-4" />,
      }
    }
    if (isLowStock) {
      return {
        label: showExactCount ? `Only ${quantity} left` : "Low Stock",
        color: "text-amber-400",
        bgColor: "bg-amber-500/20",
        borderColor: "border-amber-500/30",
        icon: <ExclamationCircle className="w-4 h-4" />,
      }
    }
    return {
      label: "In Stock",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/30",
      icon: <CheckCircleSolid className="w-4 h-4" />,
    }
  }

  const status = getStatus()

  if (variant === "text") {
    return (
      <span className={clx("flex items-center gap-1.5 text-sm", status.color, className)}>
        {status.icon}
        {status.label}
      </span>
    )
  }

  if (variant === "detailed") {
    return (
      <div
        className={clx(
          "flex items-center gap-3 px-4 py-3 rounded-lg border",
          status.bgColor,
          status.borderColor,
          className
        )}
      >
        <span className={status.color}>{status.icon}</span>
        <div>
          <p className={clx("font-medium text-sm", status.color)}>{status.label}</p>
          {isLowStock && (
            <p className="text-xs text-neutral-500">Order soon before it runs out</p>
          )}
          {isInStock && (
            <p className="text-xs text-neutral-500">Ready to ship within 24 hours</p>
          )}
          {isOutOfStock && (
            <p className="text-xs text-neutral-500">Sign up to be notified when back in stock</p>
          )}
        </div>
      </div>
    )
  }

  // Badge variant (default)
  return (
    <span
      className={clx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full",
        status.bgColor,
        status.color,
        className
      )}
    >
      {status.icon}
      {status.label}
    </span>
  )
}
