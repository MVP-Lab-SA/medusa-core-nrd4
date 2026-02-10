import { Minus, Plus } from "@medusajs/icons"
import { clsx } from "clsx"

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  className?: string
}

export const QuantitySelector = ({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  disabled = false,
  className,
}: QuantitySelectorProps) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10)
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue)
    }
  }

  const sizeClasses = {
    sm: {
      button: "w-7 h-7",
      input: "w-10 h-7 text-sm",
      icon: "w-3 h-3",
    },
    md: {
      button: "w-10 h-10",
      input: "w-14 h-10 text-base",
      icon: "w-4 h-4",
    },
    lg: {
      button: "w-12 h-12",
      input: "w-16 h-12 text-lg",
      icon: "w-5 h-5",
    },
  }

  return (
    <div
      className={clsx(
        "inline-flex items-center border border-city-steel/50 rounded-lg overflow-hidden",
        disabled && "opacity-50",
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className={clsx(
          "flex items-center justify-center bg-city-dark text-city-gray transition-colors",
          "hover:bg-city-steel/30 hover:text-city-cyan",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-city-dark disabled:hover:text-city-gray",
          sizeClasses[size].button
        )}
        aria-label="Decrease quantity"
      >
        <Minus className={sizeClasses[size].icon} />
      </button>

      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        min={min}
        max={max}
        className={clsx(
          "text-center bg-city-dark text-city-white border-x border-city-steel/50 focus:outline-none",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          sizeClasses[size].input
        )}
        aria-label="Quantity"
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        className={clsx(
          "flex items-center justify-center bg-city-dark text-city-gray transition-colors",
          "hover:bg-city-steel/30 hover:text-city-cyan",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-city-dark disabled:hover:text-city-gray",
          sizeClasses[size].button
        )}
        aria-label="Increase quantity"
      >
        <Plus className={sizeClasses[size].icon} />
      </button>
    </div>
  )
}

export default QuantitySelector
