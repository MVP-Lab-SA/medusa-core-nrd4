import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { ChevronRightMini, ChevronDownMini } from "@medusajs/icons"

interface Category {
  id: string
  name: string
  handle: string
  count?: number
  children?: Category[]
}

interface CategoryTreeProps {
  categories: Category[]
  activeCategory?: string
  onCategorySelect?: (categoryId: string) => void
  collapsible?: boolean
  showCounts?: boolean
  className?: string
}

function CategoryItem({
  category,
  activeCategory,
  onCategorySelect,
  collapsible,
  showCounts,
  level = 0
}: {
  category: Category
  activeCategory?: string
  onCategorySelect?: (categoryId: string) => void
  collapsible?: boolean
  showCounts?: boolean
  level?: number
}) {
  const [isExpanded, setIsExpanded] = useState(level < 2)
  const hasChildren = category.children && category.children.length > 0
  const isActive = activeCategory === category.id

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-2 ${level > 0 ? "ml-4" : ""}`}
      >
        {hasChildren && collapsible && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isExpanded ? (
              <ChevronDownMini className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRightMini className="w-4 h-4 text-gray-400" />
            )}
          </button>
        )}
        {!hasChildren && collapsible && <div className="w-6" />}
        
        <Link
          to={`/us/categories/${category.handle}`}
          onClick={() => onCategorySelect?.(category.id)}
          className={`flex-1 flex items-center justify-between text-sm hover:text-cyan-600 transition-colors ${isActive ? "font-medium text-cyan-600" : "text-gray-700"}`}
        >
          <span>{category.name}</span>
          {showCounts && category.count !== undefined && (
            <span className="text-xs text-gray-400">({category.count})</span>
          )}
        </Link>
      </div>

      {hasChildren && (!collapsible || isExpanded) && (
        <div className="border-l border-gray-100 ml-3">
          {category.children!.map(child => (
            <CategoryItem
              key={child.id}
              category={child}
              activeCategory={activeCategory}
              onCategorySelect={onCategorySelect}
              collapsible={collapsible}
              showCounts={showCounts}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function CategoryTree({
  categories,
  activeCategory,
  onCategorySelect,
  collapsible = true,
  showCounts = true,
  className = ""
}: CategoryTreeProps) {
  return (
    <nav className={className}>
      {categories.map(category => (
        <CategoryItem
          key={category.id}
          category={category}
          activeCategory={activeCategory}
          onCategorySelect={onCategorySelect}
          collapsible={collapsible}
          showCounts={showCounts}
        />
      ))}
    </nav>
  )
}
