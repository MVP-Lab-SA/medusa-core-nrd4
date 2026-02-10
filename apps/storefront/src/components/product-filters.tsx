import { AdjustmentsDone, ChevronDownMini, XMark } from "@medusajs/icons"
import { clsx } from "clsx"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface ProductFiltersProps {
  categories?: FilterOption[];
  collections?: FilterOption[];
  priceRanges?: FilterOption[];
  selectedCategories?: string[];
  selectedCollections?: string[];
  selectedPriceRange?: string;
  sortBy?: string;
  onCategoryChange?: (categories: string[]) => void;
  onCollectionChange?: (collections: string[]) => void;
  onPriceRangeChange?: (priceRange: string) => void;
  onSortChange?: (sort: string) => void;
  onClearAll?: () => void;
}

const sortOptions = [
  { id: "created_at", label: "Newest" },
  { id: "-created_at", label: "Oldest" },
  { id: "title", label: "Name A-Z" },
  { id: "-title", label: "Name Z-A" },
  { id: "price", label: "Price: Low to High" },
  { id: "-price", label: "Price: High to Low" },
]

export const ProductFilters = ({
  categories = [],
  collections = [],
  selectedCategories = [],
  selectedCollections = [],
  sortBy = "created_at",
  onCategoryChange,
  onCollectionChange,
  onSortChange,
  onClearAll,
}: ProductFiltersProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  const hasActiveFilters = selectedCategories.length > 0 || selectedCollections.length > 0

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId]
    onCategoryChange?.(newCategories)
  }

  const handleCollectionToggle = (collectionId: string) => {
    const newCollections = selectedCollections.includes(collectionId)
      ? selectedCollections.filter((id) => id !== collectionId)
      : [...selectedCollections, collectionId]
    onCollectionChange?.(newCollections)
  }

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Filter toggle button */}
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 border transition-colors",
            isFiltersOpen || hasActiveFilters
              ? "border-city-cyan text-city-cyan"
              : "border-city-steel text-city-gray hover:border-city-gray hover:text-city-white"
          )}
        >
          <AdjustmentsDone className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
          {hasActiveFilters && (
            <span className="bg-city-cyan text-city-dark text-xs px-1.5 py-0.5 font-bold">
              {selectedCategories.length + selectedCollections.length}
            </span>
          )}
        </button>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-city-steel text-city-gray hover:border-city-gray hover:text-city-white transition-colors"
          >
            <span className="text-sm font-medium">
              Sort: {sortOptions.find((o) => o.id === sortBy)?.label || "Newest"}
            </span>
            <ChevronDownMini className={clsx("w-4 h-4 transition-transform", isSortOpen && "rotate-180")} />
          </button>

          {isSortOpen && (
            <>
              <div 
                className="fixed inset-0 z-10"
                onClick={() => setIsSortOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 z-20 bg-city-navy border border-city-steel shadow-lg min-w-[200px]">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      onSortChange?.(option.id)
                      setIsSortOpen(false)
                    }}
                    className={clsx(
                      "w-full text-left px-4 py-2 text-sm transition-colors",
                      sortBy === option.id
                        ? "bg-city-cyan/10 text-city-cyan"
                        : "text-city-gray hover:bg-city-slate hover:text-city-white"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Active filters chips */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          {selectedCategories.map((catId) => {
            const cat = categories.find((c) => c.id === catId)
            return cat ? (
              <span
                key={catId}
                className="inline-flex items-center gap-1 px-2 py-1 bg-city-slate text-city-gray text-sm"
              >
                {cat.label}
                <button
                  onClick={() => handleCategoryToggle(catId)}
                  className="hover:text-city-white"
                >
                  <XMark className="w-3 h-3" />
                </button>
              </span>
            ) : null
          })}
          {selectedCollections.map((colId) => {
            const col = collections.find((c) => c.id === colId)
            return col ? (
              <span
                key={colId}
                className="inline-flex items-center gap-1 px-2 py-1 bg-city-slate text-city-gray text-sm"
              >
                {col.label}
                <button
                  onClick={() => handleCollectionToggle(colId)}
                  className="hover:text-city-white"
                >
                  <XMark className="w-3 h-3" />
                </button>
              </span>
            ) : null
          })}
          <button
            onClick={onClearAll}
            className="text-city-muted hover:text-city-cyan text-sm underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Expanded filters panel */}
      {isFiltersOpen && (
        <div className="bg-city-navy border border-city-steel p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Categories */}
            {categories.length > 0 && (
              <div>
                <h4 className="text-city-white font-medium mb-4">Categories</h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <Checkbox
                      key={category.id}
                      id={`cat-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      label={`${category.label}${category.count !== undefined ? ` (${category.count})` : ""}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Collections */}
            {collections.length > 0 && (
              <div>
                <h4 className="text-city-white font-medium mb-4">Collections</h4>
                <div className="space-y-3">
                  {collections.map((collection) => (
                    <Checkbox
                      key={collection.id}
                      id={`col-${collection.id}`}
                      checked={selectedCollections.includes(collection.id)}
                      onChange={() => handleCollectionToggle(collection.id)}
                      label={`${collection.label}${collection.count !== undefined ? ` (${collection.count})` : ""}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filter actions */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-city-steel">
            <Button variant="secondary" onClick={onClearAll}>
              Clear filters
            </Button>
            <Button variant="primary" onClick={() => setIsFiltersOpen(false)}>
              Apply filters
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductFilters
