import { clx } from "@medusajs/ui"
import { Check } from "@medusajs/icons"

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
  className,
}: ColorSwatchProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  }

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className={className}>
      {showLabel && selectedOption && (
        <p className="text-sm text-neutral-400 mb-2">
          Color: <span className="text-white font-medium">{selectedOption.label}</span>
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value === option.value
          const isDisabled = option.disabled || option.outOfStock

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => !isDisabled && onChange?.(option.value)}
              disabled={isDisabled}
              title={option.label}
              className={clx(
                "relative rounded-full transition-all duration-200",
                sizeClasses[size],
                isSelected
                  ? "ring-2 ring-cyan-500 ring-offset-2 ring-offset-black"
                  : "ring-1 ring-neutral-700 hover:ring-neutral-500",
                isDisabled && "opacity-40 cursor-not-allowed"
              )}
              style={{
                backgroundColor: option.image ? undefined : option.color,
                backgroundImage: option.image ? `url(${option.image})` : undefined,
                backgroundSize: "cover",
              }}
            >
              {isSelected && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check
                    className={clx(
                      "w-4 h-4",
                      isLightColor(option.color) ? "text-black" : "text-white"
                    )}
                  />
                </span>
              )}
              {option.outOfStock && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-full h-0.5 bg-red-500 rotate-45 absolute" />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Helper to determine if a color is light
function isLightColor(color: string): boolean {
  const hex = color.replace("#", "")
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 155
}
