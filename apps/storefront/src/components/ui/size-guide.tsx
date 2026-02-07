import * as React from "react"
import { X, Ruler } from "lucide-react"
import { clx } from "@medusajs/ui"

interface SizeChartRow {
  size: string
  [key: string]: string | number
}

interface SizeGuideProps {
  title?: string
  description?: string
  measurements: string[]
  sizes: SizeChartRow[]
  unit?: "cm" | "in"
  tips?: string[]
  className?: string
}

export function SizeGuide({
  title = "Size Guide",
  description,
  measurements,
  sizes,
  unit = "cm",
  tips,
  className
}: SizeGuideProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedUnit, setSelectedUnit] = React.useState(unit)

  const convertValue = (value: string | number): string => {
    if (typeof value === "string") return value
    if (selectedUnit === "in" && unit === "cm") {
      return (value / 2.54).toFixed(1)
    }
    if (selectedUnit === "cm" && unit === "in") {
      return (value * 2.54).toFixed(1)
    }
    return value.toString()
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={clx(
          "inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors",
          className
        )}
      >
        <Ruler className="w-4 h-4" />
        Size Guide
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-2xl bg-zinc-900 border border-zinc-700 shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {description && (
                <p className="text-zinc-400">{description}</p>
              )}

              <div className="flex items-center gap-2">
                <span className="text-zinc-400 text-sm">Unit:</span>
                <div className="flex rounded-lg overflow-hidden border border-zinc-700">
                  <button
                    onClick={() => setSelectedUnit("cm")}
                    className={clx(
                      "px-3 py-1.5 text-sm font-medium transition-colors",
                      selectedUnit === "cm"
                        ? "bg-cyan-500 text-black"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    )}
                  >
                    CM
                  </button>
                  <button
                    onClick={() => setSelectedUnit("in")}
                    className={clx(
                      "px-3 py-1.5 text-sm font-medium transition-colors",
                      selectedUnit === "in"
                        ? "bg-cyan-500 text-black"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    )}
                  >
                    IN
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">
                        Size
                      </th>
                      {measurements.map((measurement) => (
                        <th
                          key={measurement}
                          className="px-4 py-3 text-left text-sm font-medium text-zinc-400"
                        >
                          {measurement}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((row, index) => (
                      <tr
                        key={row.size}
                        className={clx(
                          "border-b border-zinc-800 last:border-0",
                          index % 2 === 0 && "bg-zinc-800/30"
                        )}
                      >
                        <td className="px-4 py-3 font-medium text-white">
                          {row.size}
                        </td>
                        {measurements.map((measurement) => (
                          <td
                            key={measurement}
                            className="px-4 py-3 text-zinc-300"
                          >
                            {convertValue(row[measurement.toLowerCase()])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {tips && tips.length > 0 && (
                <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                  <h3 className="text-white font-medium mb-2">
                    Measuring Tips
                  </h3>
                  <ul className="space-y-2">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="text-cyan-500">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
