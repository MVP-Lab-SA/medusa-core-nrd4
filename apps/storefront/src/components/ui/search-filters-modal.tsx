import { useState } from "react"
import { XMark, Check } from "@medusajs/icons"
import { Button } from "./button"

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterGroup {
  id: string
  label: string
  type: "checkbox" | "radio" | "range"
  options?: FilterOption[]
  min?: number
  max?: number
  unit?: string
}

interface SearchFiltersModalProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterGroup[]
  selectedFilters: Record<string, string[]>
  onApply: (filters: Record<string, string[]>) => void
  onClear: () => void
  resultCount?: number
}

export function SearchFiltersModal({
  isOpen,
  onClose,
  filters,
  selectedFilters,
  onApply,
  onClear,
  resultCount = 0
}: SearchFiltersModalProps) {
  const [localFilters, setLocalFilters] = useState<Record<string, string[]>>(selectedFilters)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  if (!isOpen) return null

  const toggleFilter = (groupId: string, optionId: string, type: "checkbox" | "radio") => {
    setLocalFilters(prev => {
      const current = prev[groupId] || []
      if (type === "radio") {
        return { ...prev, [groupId]: [optionId] }
      }
      if (current.includes(optionId)) {
        return { ...prev, [groupId]: current.filter(id => id !== optionId) }
      }
      return { ...prev, [groupId]: [...current, optionId] }
    })
  }

  const activeFilterCount = Object.values(localFilters).flat().length

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <XMark className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Groups */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {filters.map(group => (
            <div key={group.id}>
              <h3 className="text-sm font-medium text-gray-900 mb-3">{group.label}</h3>
              
              {group.type === "range" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500">Min</label>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                    <span className="text-gray-400 mt-5">-</span>
                    <div className="flex-1">
                      <label className="text-xs text-gray-500">Max</label>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min={group.min || 0}
                    max={group.max || 1000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-cyan-500"
                  />
                </div>
              )}

              {(group.type === "checkbox" || group.type === "radio") && group.options && (
                <div className="space-y-2">
                  {group.options.map(option => {
                    const isSelected = (localFilters[group.id] || []).includes(option.id)
                    return (
                      <button
                        key={option.id}
                        onClick={() => toggleFilter(group.id, option.id, group.type)}
                        className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded ${group.type === "radio" ? "rounded-full" : ""} border-2 flex items-center justify-center ${isSelected ? "bg-cyan-500 border-cyan-500" : "border-gray-300"}`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-sm text-gray-700">{option.label}</span>
                        </div>
                        {option.count !== undefined && (
                          <span className="text-xs text-gray-400">({option.count})</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setLocalFilters({})
                onClear()
              }}
              className="w-full text-sm text-cyan-600 hover:text-cyan-700"
            >
              Clear all filters ({activeFilterCount})
            </button>
          )}
          <Button
            onClick={() => {
              onApply(localFilters)
              onClose()
            }}
            className="w-full"
          >
            Show {resultCount} results
          </Button>
        </div>
      </div>
    </div>
  )
}
