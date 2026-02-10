import { useState } from "react"
import { Check, XMark } from "@medusajs/icons"

interface VariantOption {
  value: string
  available: boolean
  price?: string
  originalPrice?: string
}

interface VariantMatrixProps {
  sizes: string[]
  colors: Array<{ name: string; hex: string }>
  availability: Record<string, Record<string, VariantOption>>
  selectedSize?: string
  selectedColor?: string
  onSelect: (size: string, color: string) => void
  showPrices?: boolean
}

export function VariantMatrix({
  sizes,
  colors,
  availability,
  selectedSize,
  selectedColor,
  onSelect,
  showPrices = false
}: VariantMatrixProps) {
  const [hoveredCell, setHoveredCell] = useState<{ size: string; color: string } | null>(null)

  const getVariant = (size: string, colorName: string): VariantOption | null => {
    return availability[size]?.[colorName] || null
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-left text-sm font-medium text-gray-500 border-b border-gray-200">
              Size / Color
            </th>
            {colors.map(color => (
              <th
                key={color.name}
                className="p-2 text-center text-sm font-medium text-gray-700 border-b border-gray-200"
              >
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="w-6 h-6 rounded-full border border-gray-200"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs">{color.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.map(size => (
            <tr key={size}>
              <td className="p-2 text-sm font-medium text-gray-700 border-b border-gray-100">
                {size}
              </td>
              {colors.map(color => {
                const variant = getVariant(size, color.name)
                const isSelected = selectedSize === size && selectedColor === color.name
                const isHovered = hoveredCell?.size === size && hoveredCell?.color === color.name

                return (
                  <td
                    key={`${size}-${color.name}`}
                    className="p-1 border-b border-gray-100"
                  >
                    <button
                      onClick={() => variant?.available && onSelect(size, color.name)}
                      onMouseEnter={() => setHoveredCell({ size, color: color.name })}
                      onMouseLeave={() => setHoveredCell(null)}
                      disabled={!variant?.available}
                      className={`w-full p-2 rounded transition-all ${
                        !variant?.available
                          ? "bg-gray-50 cursor-not-allowed"
                          : isSelected
                          ? "bg-cyan-500 text-white"
                          : isHovered
                          ? "bg-cyan-50 border-cyan-200"
                          : "bg-white hover:bg-gray-50"
                      } ${variant?.available ? "border border-gray-200" : ""}`}
                    >
                      {!variant?.available ? (
                        <XMark className="w-4 h-4 mx-auto text-gray-300" />
                      ) : isSelected ? (
                        <Check className="w-4 h-4 mx-auto" />
                      ) : showPrices && variant.price ? (
                        <div className="text-xs">
                          <span className={isSelected ? "text-white" : "text-gray-900"}>
                            {variant.price}
                          </span>
                          {variant.originalPrice && (
                            <span className="block line-through text-gray-400">
                              {variant.originalPrice}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="w-4 h-4 mx-auto rounded-full border-2 border-gray-300" />
                      )}
                    </button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded border border-gray-200 bg-white" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-cyan-500 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-gray-50 flex items-center justify-center">
            <XMark className="w-3 h-3 text-gray-300" />
          </div>
          <span>Out of stock</span>
        </div>
      </div>
    </div>
  )
}
