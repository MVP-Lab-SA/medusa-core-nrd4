import { useState } from "react"
import { clx } from "@medusajs/ui"
import { XMark, ArrowsPointingOut } from "@medusajs/icons"

interface SizeRow {
  size: string
  measurements: Record<string, string>
}

interface SizeGuideProps {
  productType?: "tops" | "bottoms" | "shoes" | "accessories"
  customHeaders?: string[]
  customData?: SizeRow[]
  unit?: "in" | "cm"
  className?: string
}

const DEFAULT_DATA: Record<string, { headers: string[]; rows: SizeRow[] }> = {
  tops: {
    headers: ["Size", "Chest", "Length", "Sleeve"],
    rows: [
      { size: "XS", measurements: { Chest: "34", Length: "26", Sleeve: "32" } },
      { size: "S", measurements: { Chest: "36", Length: "27", Sleeve: "33" } },
      { size: "M", measurements: { Chest: "38", Length: "28", Sleeve: "34" } },
      { size: "L", measurements: { Chest: "40", Length: "29", Sleeve: "35" } },
      { size: "XL", measurements: { Chest: "42", Length: "30", Sleeve: "36" } },
      { size: "2XL", measurements: { Chest: "44", Length: "31", Sleeve: "37" } },
    ],
  },
  bottoms: {
    headers: ["Size", "Waist", "Hip", "Inseam"],
    rows: [
      { size: "28", measurements: { Waist: "28", Hip: "36", Inseam: "30" } },
      { size: "30", measurements: { Waist: "30", Hip: "38", Inseam: "31" } },
      { size: "32", measurements: { Waist: "32", Hip: "40", Inseam: "32" } },
      { size: "34", measurements: { Waist: "34", Hip: "42", Inseam: "32" } },
      { size: "36", measurements: { Waist: "36", Hip: "44", Inseam: "33" } },
      { size: "38", measurements: { Waist: "38", Hip: "46", Inseam: "33" } },
    ],
  },
  shoes: {
    headers: ["US", "UK", "EU", "CM"],
    rows: [
      { size: "7", measurements: { UK: "6", EU: "40", CM: "25" } },
      { size: "8", measurements: { UK: "7", EU: "41", CM: "26" } },
      { size: "9", measurements: { UK: "8", EU: "42", CM: "27" } },
      { size: "10", measurements: { UK: "9", EU: "43", CM: "28" } },
      { size: "11", measurements: { UK: "10", EU: "44", CM: "29" } },
      { size: "12", measurements: { UK: "11", EU: "45", CM: "30" } },
    ],
  },
  accessories: {
    headers: ["Size", "Width", "Height", "Depth"],
    rows: [
      { size: "S", measurements: { Width: "8", Height: "6", Depth: "3" } },
      { size: "M", measurements: { Width: "10", Height: "8", Depth: "4" } },
      { size: "L", measurements: { Width: "12", Height: "10", Depth: "5" } },
    ],
  },
}

export function SizeGuide({
  productType = "tops",
  customHeaders,
  customData,
  unit = "in",
  className,
}: SizeGuideProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentUnit, setCurrentUnit] = useState(unit)

  const data = customData || DEFAULT_DATA[productType]?.rows || []
  const headers = customHeaders || DEFAULT_DATA[productType]?.headers || []

  const convertToMetric = (value: string): string => {
    const num = parseFloat(value)
    if (isNaN(num)) return value
    return (num * 2.54).toFixed(1)
  }

  const getMeasurement = (value: string): string => {
    if (currentUnit === "cm") {
      return convertToMetric(value)
    }
    return value
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={clx(
          "inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors",
          className
        )}
      >
        <ArrowsPointingOut className="w-4 h-4" />
        Size Guide
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
              <h2 className="text-lg font-semibold text-white">Size Guide</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <XMark className="w-5 h-5 text-neutral-400" />
              </button>
            </header>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-neutral-400">Unit:</span>
                <div className="flex bg-neutral-800 rounded-lg p-1">
                  <button
                    onClick={() => setCurrentUnit("in")}
                    className={clx(
                      "px-3 py-1 text-sm font-medium rounded transition-colors",
                      currentUnit === "in"
                        ? "bg-cyan-500 text-black"
                        : "text-neutral-400 hover:text-white"
                    )}
                  >
                    Inches
                  </button>
                  <button
                    onClick={() => setCurrentUnit("cm")}
                    className={clx(
                      "px-3 py-1 text-sm font-medium rounded transition-colors",
                      currentUnit === "cm"
                        ? "bg-cyan-500 text-black"
                        : "text-neutral-400 hover:text-white"
                    )}
                  >
                    Centimeters
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      {headers.map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3 text-left text-sm font-semibold text-neutral-400 bg-neutral-800 first:rounded-tl-lg last:rounded-tr-lg"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr
                        key={row.size}
                        className={clx(
                          "border-b border-neutral-800",
                          index === data.length - 1 && "border-b-0"
                        )}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-white">
                          {row.size}
                        </td>
                        {Object.values(row.measurements).map((value, i) => (
                          <td key={i} className="px-4 py-3 text-sm text-neutral-300">
                            {getMeasurement(value)} {currentUnit}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-neutral-800/50 rounded-lg">
                <h3 className="text-sm font-medium text-white mb-2">How to Measure</h3>
                <ul className="text-sm text-neutral-400 space-y-1">
                  <li>- Use a flexible measuring tape</li>
                  <li>- Measure close to your body but not tight</li>
                  <li>- For best results, have someone help you</li>
                  <li>- When in doubt, size up</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
