import * as React from "react"
import { clx } from "@medusajs/ui"

interface SizeOption {
  value: string
  label: string
  disabled?: boolean
  outOfStock?: boolean
  inventory?: number
}

interface SizeSelectorProps {
  options: SizeOption[]
  value?: string
  onChange?: (value: string) => void
  variant?: "default" | "compact" | "grid"
  showInventory?: boolean
  lowStockThreshold?: number
  className?: string
}

export function SizeSelector({
  options,
  value,
  onChange,
  variant = "default",
  showInventory = false,
  lowStockThreshold = 5,
  className
}: SizeSelectorProps) {
  if (variant === "compact") {
    return (
      <div className={clx("flex flex-wrap gap-2", className)}>
        {options.map((option) => {
          const isSelected = value === option.value
          const isDisabled = option.disabled || option.outOfStock

          return (
            <button
              key={option.value}
              onClick={() => !isDisabled && onChange?.(option.value)}
              disabled={isDisabled}
              className={clx(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                isSelected
                  ? "bg-cyan-500 text-black"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700",
                isDisabled && "opacity-50 cursor-not-allowed line-through"
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    )
  }

  if (variant === "grid") {
    return (
      <div className={clx("grid grid-cols-4 gap-2", className)}>
        {options.map((option) => {
          const isSelected = value === option.value
          const isDisabled = option.disabled || option.outOfStock
          const isLowStock = option.inventory !== undefined && 
            option.inventory > 0 && 
            option.inventory <= lowStockThreshold

          return (
            <button
              key={option.value}
              onClick={() => !isDisabled && onChange?.(option.value)}
              disabled={isDisabled}
              className={clx(
                "relative p-3 rounded-lg border-2 transition-all text-center",
                isSelected
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-zinc-700 hover:border-zinc-600",
                isDisabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className={clx(
                "text-sm font-medium",
                isSelected ? "text-cyan-400" : "text-white",
                isDisabled && "line-through"
              )}>
                {option.label}
              </span>
              
              {showInventory && option.inventory !== undefined && (
                <span className={clx(
                  "block text-xs mt-1",
                  option.outOfStock
                    ? "text-red-400"
                    : isLowStock
                    ? "text-orange-400"
                    : "text-zinc-500"
                )}>
                  {option.outOfStock
                    ? "Out of stock"
                    : isLowStock
                    ? `Only ${option.inventory} left`
                    : "In stock"}
                </span>
              )}

              {option.outOfStock && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-full h-0.5 bg-zinc-500 rotate-[-20deg]" />
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  // Default variant
  return (
    <div className={clx("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isSelected = value === option.value
        const isDisabled = option.disabled || option.outOfStock
        const isLowStock = option.inventory !== undefined && 
          option.inventory > 0 && 
          option.inventory <= lowStockThreshold

        return (
          <button
            key={option.value}
            onClick={() => !isDisabled && onChange?.(option.value)}
            disabled={isDisabled}
            className={clx(
              "relative min-w-[48px] px-4 py-2 rounded-lg border-2 transition-all",
              isSelected
                ? "border-cyan-500 bg-cyan-500/10"
                : "border-zinc-700 hover:border-zinc-600",
              isDisabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className={clx(
              "font-medium",
              isSelected ? "text-cyan-400" : "text-white",
              isDisabled && "line-through"
            )}>
              {option.label}
            </span>

            {isLowStock && !option.outOfStock && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-500" />
            )}

            {option.outOfStock && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-full h-0.5 bg-zinc-500 rotate-[-20deg]" />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
