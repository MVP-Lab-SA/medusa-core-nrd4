import { useState } from "react"
import { ChevronDownMini, Check } from "@medusajs/icons"

interface FacetValue {
  id: string
  label: string
  count: number
  selected?: boolean
}

interface Facet {
  id: string
  label: string
  values: FacetValue[]
  type: "list" | "color" | "size" | "rating"
}

interface FacetedSearchProps {
  facets: Facet[]
  onFacetChange: (facetId: string, valueId: string, selected: boolean) => void
  onClearAll: () => void
  className?: string
}

const colorMap: Record<string, string> = {
  black: "#000000",
  white: "#FFFFFF",
  red: "#EF4444",
  blue: "#3B82F6",
  green: "#22C55E",
  yellow: "#EAB308",
  purple: "#A855F7",
  pink: "#EC4899",
  orange: "#F97316",
  gray: "#6B7280",
  cyan: "#06B6D4"
}

export function FacetedSearch({ facets, onFacetChange, onClearAll, className = "" }: FacetedSearchProps) {
  const [expandedFacets, setExpandedFacets] = useState<string[]>(facets.map(f => f.id))
  const [showMore, setShowMore] = useState<Record<string, boolean>>({})

  const toggleFacet = (facetId: string) => {
    setExpandedFacets(prev =>
      prev.includes(facetId) ? prev.filter(id => id !== facetId) : [...prev, facetId]
    )
  }

  const selectedCount = facets.reduce(
    (acc, facet) => acc + facet.values.filter(v => v.selected).length,
    0
  )

  return (
    <div className={`space-y-4 ${className}`}>
      {selectedCount > 0 && (
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <span className="text-sm text-gray-600">{selectedCount} filters applied</span>
          <button
            onClick={onClearAll}
            className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      {facets.map(facet => {
        const isExpanded = expandedFacets.includes(facet.id)
        const visibleValues = showMore[facet.id] ? facet.values : facet.values.slice(0, 5)
        const hasMore = facet.values.length > 5

        return (
          <div key={facet.id} className="border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleFacet(facet.id)}
              className="flex items-center justify-between w-full py-2"
            >
              <span className="text-sm font-medium text-gray-900">{facet.label}</span>
              <ChevronDownMini
                className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>

            {isExpanded && (
              <div className="mt-2 space-y-1">
                {facet.type === "color" ? (
                  <div className="flex flex-wrap gap-2">
                    {visibleValues.map(value => (
                      <button
                        key={value.id}
                        onClick={() => onFacetChange(facet.id, value.id, !value.selected)}
                        className={`relative w-8 h-8 rounded-full border-2 ${value.selected ? "border-cyan-500" : "border-gray-200"}`}
                        style={{ backgroundColor: colorMap[value.id.toLowerCase()] || value.id }}
                        title={`${value.label} (${value.count})`}
                      >
                        {value.selected && (
                          <Check className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : facet.type === "size" ? (
                  <div className="flex flex-wrap gap-2">
                    {visibleValues.map(value => (
                      <button
                        key={value.id}
                        onClick={() => onFacetChange(facet.id, value.id, !value.selected)}
                        className={`px-3 py-1.5 text-sm border rounded ${value.selected ? "bg-cyan-500 text-white border-cyan-500" : "border-gray-200 text-gray-700 hover:border-gray-300"}`}
                      >
                        {value.label}
                        <span className="ml-1 text-xs opacity-60">({value.count})</span>
                      </button>
                    ))}
                  </div>
                ) : facet.type === "rating" ? (
                  <div className="space-y-1">
                    {visibleValues.map(value => (
                      <button
                        key={value.id}
                        onClick={() => onFacetChange(facet.id, value.id, !value.selected)}
                        className={`flex items-center gap-2 w-full p-2 rounded hover:bg-gray-50 ${value.selected ? "bg-cyan-50" : ""}`}
                      >
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < parseInt(value.id) ? "text-yellow-400" : "text-gray-200"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">& up</span>
                        <span className="text-xs text-gray-400 ml-auto">({value.count})</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {visibleValues.map(value => (
                      <button
                        key={value.id}
                        onClick={() => onFacetChange(facet.id, value.id, !value.selected)}
                        className={`flex items-center gap-2 w-full p-2 rounded hover:bg-gray-50 ${value.selected ? "bg-cyan-50" : ""}`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${value.selected ? "bg-cyan-500 border-cyan-500" : "border-gray-300"}`}>
                          {value.selected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-sm text-gray-700 flex-1 text-left">{value.label}</span>
                        <span className="text-xs text-gray-400">({value.count})</span>
                      </button>
                    ))}
                  </div>
                )}

                {hasMore && (
                  <button
                    onClick={() => setShowMore(prev => ({ ...prev, [facet.id]: !prev[facet.id] }))}
                    className="text-sm text-cyan-600 hover:text-cyan-700 mt-2"
                  >
                    {showMore[facet.id] ? "Show less" : `Show ${facet.values.length - 5} more`}
                  </button>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
