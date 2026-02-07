import { Link } from "@tanstack/react-router"
import { MagnifyingGlass } from "@medusajs/icons"
import { Button } from "./button"

interface SearchNoResultsProps {
  query: string
  suggestions?: string[]
  popularCategories?: Array<{ name: string; url: string }>
  onSearchSuggestion?: (suggestion: string) => void
}

export function SearchNoResults({
  query,
  suggestions = ["smart sensor", "IoT device", "LED controller"],
  popularCategories = [
    { name: "Urban Sensors", url: "/us/store?category=sensors" },
    { name: "Smart Lighting", url: "/us/store?category=lighting" },
    { name: "Security Systems", url: "/us/store?category=security" }
  ],
  onSearchSuggestion
}: SearchNoResultsProps) {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        <MagnifyingGlass className="w-10 h-10 text-gray-400" />
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        No results found for "{query}"
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        We couldn't find any products matching your search. Try checking your spelling or using different keywords.
      </p>

      <div className="max-w-md mx-auto space-y-6">
        {suggestions.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Did you mean:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => onSearchSuggestion?.(suggestion)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {popularCategories.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Browse popular categories:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularCategories.map(category => (
                <Link
                  key={category.url}
                  to={category.url}
                  className="px-4 py-2 bg-cyan-50 hover:bg-cyan-100 rounded-full text-sm text-cyan-700 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4">
          <Link to="/us/store">
            <Button variant="outline">
              Browse all products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
