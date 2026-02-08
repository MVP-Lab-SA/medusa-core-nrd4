import { useState } from "react"

interface VendorFiltersProps {
  onFilterChange: (filters: VendorFilterState) => void
  categories?: string[]
}

export interface VendorFilterState {
  search: string
  category: string
  sortBy: "rating" | "products" | "name" | "newest"
  verified: boolean
}

export function VendorFilters({ onFilterChange, categories = [] }: VendorFiltersProps) {
  const [filters, setFilters] = useState<VendorFilterState>({
    search: "",
    category: "",
    sortBy: "rating",
    verified: false,
  })

  const updateFilter = <K extends keyof VendorFilterState>(
    key: K,
    value: VendorFilterState[K]
  ) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search vendors..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter("sortBy", e.target.value as VendorFilterState["sortBy"])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="rating">Highest Rated</option>
            <option value="products">Most Products</option>
            <option value="name">Name A-Z</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.verified}
              onChange={(e) => updateFilter("verified", e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Verified Only</span>
          </label>
        </div>
      </div>
    </div>
  )
}
