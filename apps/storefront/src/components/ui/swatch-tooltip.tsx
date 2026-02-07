import { useState } from "react"

interface SwatchTooltipProps {
  color: string
  colorName: string
  isSelected?: boolean
  isAvailable?: boolean
  onClick?: () => void
  size?: "sm" | "md" | "lg"
}

export function SwatchTooltip({
  color,
  colorName,
  isSelected = false,
  isAvailable = true,
  onClick,
  size = "md"
}: SwatchTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        disabled={!isAvailable}
        className={`${sizeClasses[size]} rounded-full border-2 transition-all relative ${
          isSelected
            ? "border-cyan-500 ring-2 ring-cyan-200"
            : isAvailable
            ? "border-gray-200 hover:border-gray-300"
            : "border-gray-100 opacity-50 cursor-not-allowed"
        }`}
        style={{ backgroundColor: color }}
      >
        {isSelected && (
          <svg
            className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-0.5 bg-gray-400 rotate-45 transform" />
          </div>
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
          {colorName}
          {!isAvailable && " (Out of stock)"}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      )}
    </div>
  )
}

interface SwatchGroupProps {
  colors: Array<{
    id: string
    name: string
    hex: string
    available?: boolean
  }>
  selected?: string
  onSelect: (colorId: string) => void
  size?: "sm" | "md" | "lg"
  className?: string
}

export function SwatchGroup({
  colors,
  selected,
  onSelect,
  size = "md",
  className = ""
}: SwatchGroupProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {colors.map(color => (
        <SwatchTooltip
          key={color.id}
          color={color.hex}
          colorName={color.name}
          isSelected={selected === color.id}
          isAvailable={color.available !== false}
          onClick={() => color.available !== false && onSelect(color.id)}
          size={size}
        />
      ))}
    </div>
  )
}
