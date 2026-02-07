import * as React from "react"
import { Check } from "lucide-react"
import { clx } from "@medusajs/ui"

interface ColorOption {
  value: string
  label: string
  color: string
  image?: string
  disabled?: boolean
  outOfStock?: boolean
}

interface ColorSwatchProps {
  options: ColorOption[]
  value?: string
  onChange?: (value: string) => void
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

export function ColorSwatch({
  options,
  value,
  onChange,
  size = "md",
  showLabel = true,
  className
}: ColorSwatchProps) {
  const selectedOption = options.find((opt) => opt.value === value)

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  }

  const checkSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  }

  return (
    <div className={clx("space-y-3", className)}>
      {showLabel && selectedOption && (
        <p className="text-sm">
          <span className="text-zinc-400">Color: </span>
          <span className="text-white font-medium">{selectedOption.label}</span>
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value === option.value
          const isLight = isLightColor(option.color)

          return (
            <button
              key={option.value}
              onClick={() => !option.disabled && onChange?.(option.value)}
              disabled={option.disabled}
              title={option.label}
              className={clx(
                "relative rounded-full transition-all",
                sizeClasses[size],
                "ring-offset-2 ring-offset-zinc-900",
                isSelected && "ring-2 ring-cyan-500",
                !isSelected && !option.disabled && "hover:ring-2 hover:ring-zinc-500",
                option.disabled && "opacity-50 cursor-not-allowed"
              )}
              style={{
                backgroundColor: option.color,
                backgroundImage: option.image ? `url(${option.image})` : undefined,
                backgroundSize: "cover"
              }}
            >
              {isSelected && (
                <Check
                  className={clx(
                    "absolute inset-0 m-auto",
                    checkSizes[size],
                    isLight ? "text-black" : "text-white"
                  )}
                />
              )}
              {option.outOfStock && !option.disabled && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-full h-0.5 bg-zinc-500 rotate-45 absolute" />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function isLightColor(color: string): boolean {
  const hex = color.replace("#", "")
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 155
}

interface ColorSwatchGridProps {
  options: ColorOption[]
  value?: string
  onChange?: (value: string) => void
  columns?: number
  showLabels?: boolean
  className?: string
}

export function ColorSwatchGrid({
  options,
  value,
  onChange,
  columns = 5,
  showLabels = true,
  className
}: ColorSwatchGridProps) {
  return (
    <div
      className={clx("grid gap-3", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {options.map((option) => {
        const isSelected = value === option.value
        const isLight = isLightColor(option.color)

        return (
          <button
            key={option.value}
            onClick={() => !option.disabled && onChange?.(option.value)}
            disabled={option.disabled}
            className={clx(
              "flex flex-col items-center gap-2 p-2 rounded-lg transition-all",
              isSelected
                ? "bg-zinc-800 ring-1 ring-cyan-500"
                : "hover:bg-zinc-800/50",
              option.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <div
              className={clx(
                "relative w-10 h-10 rounded-full",
                "ring-1 ring-zinc-700"
              )}
              style={{
                backgroundColor: option.color,
                backgroundImage: option.image ? `url(${option.image})` : undefined,
                backgroundSize: "cover"
              }}
            >
              {isSelected && (
                <Check
                  className={clx(
                    "absolute inset-0 m-auto w-5 h-5",
                    isLight ? "text-black" : "text-white"
                  )}
                />
              )}
            </div>
            {showLabels && (
              <span className={clx(
                "text-xs truncate w-full text-center",
                isSelected ? "text-white" : "text-zinc-400"
              )}>
                {option.label}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
