import * as React from "react"
import { Check, AlertTriangle, X, Clock } from "lucide-react"
import { clx } from "@medusajs/ui"

interface StockIndicatorProps {
  quantity?: number
  lowStockThreshold?: number
  showQuantity?: boolean
  variant?: "default" | "compact" | "detailed"
  className?: string
}

export function StockIndicator({
  quantity,
  lowStockThreshold = 5,
  showQuantity = false,
  variant = "default",
  className
}: StockIndicatorProps) {
  const isOutOfStock = quantity === 0
  const isLowStock = quantity !== undefined && quantity > 0 && quantity <= lowStockThreshold
  const isInStock = quantity === undefined || quantity > lowStockThreshold

  const getConfig = () => {
    if (isOutOfStock) {
      return {
        icon: <X className="w-4 h-4" />,
        text: "Out of Stock",
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20"
      }
    }
    if (isLowStock) {
      return {
        icon: <AlertTriangle className="w-4 h-4" />,
        text: showQuantity ? `Only ${quantity} left` : "Low Stock",
        color: "text-orange-400",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/20"
      }
    }
    return {
      icon: <Check className="w-4 h-4" />,
      text: showQuantity && quantity !== undefined ? `${quantity} in stock` : "In Stock",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    }
  }

  const config = getConfig()

  if (variant === "compact") {
    return (
      <div className={clx("flex items-center gap-1.5", config.color, className)}>
        {config.icon}
        <span className="text-sm font-medium">{config.text}</span>
      </div>
    )
  }

  if (variant === "detailed") {
    return (
      <div
        className={clx(
          "flex items-center gap-3 p-3 rounded-lg border",
          config.bgColor,
          config.borderColor,
          className
        )}
      >
        <div className={clx("p-2 rounded-full", config.bgColor, config.color)}>
          {config.icon}
        </div>
        <div>
          <p className={clx("font-medium", config.color)}>{config.text}</p>
          {isLowStock && (
            <p className="text-zinc-500 text-sm">Order soon to avoid missing out</p>
          )}
          {isOutOfStock && (
            <p className="text-zinc-500 text-sm">Check back later or sign up for notifications</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={clx(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border",
        config.bgColor,
        config.borderColor,
        config.color,
        className
      )}
    >
      {config.icon}
      <span className="text-sm font-medium">{config.text}</span>
    </div>
  )
}

interface RestockIndicatorProps {
  date?: Date
  className?: string
}

export function RestockIndicator({ date, className }: RestockIndicatorProps) {
  const formatDate = (d: Date) => {
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    })
  }

  return (
    <div
      className={clx(
        "flex items-center gap-2 px-3 py-2 rounded-lg",
        "bg-blue-500/10 border border-blue-500/20 text-blue-400",
        className
      )}
    >
      <Clock className="w-4 h-4" />
      <span className="text-sm">
        {date ? `Expected restock: ${formatDate(date)}` : "Restock coming soon"}
      </span>
    </div>
  )
}
