import { clx } from "@medusajs/ui"

interface SizeOption {
  value: string
  label: string
  disabled?: boolean
  outOfStock?: boolean
  lowStock?: boolean
}

interface SizeSelectorProps {
  options: SizeOption[]
  value?: string
  onChange?: (value: string) => void
  variant?: "buttons" | "dropdown"
  showLabel?: boolean
  className?: string
}

export function SizeSelector({
  options,
  value,
  onChange,
  variant = "buttons",
  showLabel = true,
  className,
}: SizeSelectorProps) {
  const selectedOption = options.find((opt) => opt.value === value)

  if (variant === "dropdown") {
    return (
      <div className={className}>
        {showLabel && (
          <label className="block text-sm text-neutral-400 mb-2">
            Size: {selectedOption && <span className="text-white font-medium">{selectedOption.label}</span>}
          </label>
        )}
        <select
          value={value || ""}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        >
          <option value="" disabled>Select a size</option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled || option.outOfStock}
            >
              {option.label}
              {option.outOfStock ? " - Out of Stock" : option.lowStock ? " - Low Stock" : ""}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className={className}>
      {showLabel && (
        <p className="text-sm text-neutral-400 mb-2">
          Size: {selectedOption && <span className="text-white font-medium">{selectedOption.label}</span>}
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
              className={clx(
                "relative min-w-[3rem] h-11 px-4 rounded-lg font-medium text-sm transition-all duration-200",
                isSelected
                  ? "bg-cyan-500 text-black ring-2 ring-cyan-500 ring-offset-2 ring-offset-black"
                  : "bg-neutral-900 text-white border border-neutral-700 hover:border-neutral-500",
                isDisabled && "opacity-40 cursor-not-allowed line-through"
              )}
            >
              {option.label}
              {option.lowStock && !option.outOfStock && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
