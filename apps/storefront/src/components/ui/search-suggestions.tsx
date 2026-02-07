import { useState, useEffect, useRef } from "react"
import { Link } from "@tanstack/react-router"
import { MagnifyingGlass, XMark, Clock, ArrowTrendingUp } from "@medusajs/icons"

interface SearchSuggestionsProps {
  onSearch: (query: string) => void
  recentSearches?: string[]
  trendingSearches?: string[]
  suggestions?: Array<{
    type: "product" | "category" | "brand"
    title: string
    image?: string
    url: string
  }>
  isLoading?: boolean
  placeholder?: string
}

export function SearchSuggestions({
  onSearch,
  recentSearches = ["smart sensor", "urban lighting", "security camera"],
  trendingSearches = ["IoT gateway", "smart meter", "LED controller"],
  suggestions = [],
  isLoading = false,
  placeholder = "Search products..."
}: SearchSuggestionsProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items = [...recentSearches, ...trendingSearches, ...suggestions.map(s => s.title)]
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex(prev => (prev < items.length - 1 ? prev + 1 : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex(prev => (prev > 0 ? prev - 1 : items.length - 1))
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault()
      setQuery(items[activeIndex])
      onSearch(items[activeIndex])
      setIsOpen(false)
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="relative">
        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("")
              inputRef.current?.focus()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <XMark className="w-5 h-5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto" />
            </div>
          ) : (
            <>
              {!query && recentSearches.length > 0 && (
                <div className="p-3 border-b border-gray-100">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">Recent Searches</p>
                  {recentSearches.map((search, idx) => (
                    <button
                      key={search}
                      onClick={() => {
                        setQuery(search)
                        onSearch(search)
                        setIsOpen(false)
                      }}
                      className={`flex items-center gap-2 w-full px-2 py-1.5 text-left hover:bg-gray-50 rounded ${activeIndex === idx ? "bg-gray-50" : ""}`}
                    >
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{search}</span>
                    </button>
                  ))}
                </div>
              )}

              {!query && trendingSearches.length > 0 && (
                <div className="p-3 border-b border-gray-100">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">Trending</p>
                  {trendingSearches.map((search, idx) => (
                    <button
                      key={search}
                      onClick={() => {
                        setQuery(search)
                        onSearch(search)
                        setIsOpen(false)
                      }}
                      className={`flex items-center gap-2 w-full px-2 py-1.5 text-left hover:bg-gray-50 rounded ${activeIndex === recentSearches.length + idx ? "bg-gray-50" : ""}`}
                    >
                      <ArrowTrendingUp className="w-4 h-4 text-cyan-500" />
                      <span className="text-sm text-gray-700">{search}</span>
                    </button>
                  ))}
                </div>
              )}

              {suggestions.length > 0 && (
                <div className="p-3">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">Suggestions</p>
                  {suggestions.map((suggestion, idx) => (
                    <Link
                      key={suggestion.url}
                      to={suggestion.url}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 w-full px-2 py-2 text-left hover:bg-gray-50 rounded ${activeIndex === recentSearches.length + trendingSearches.length + idx ? "bg-gray-50" : ""}`}
                    >
                      {suggestion.image && (
                        <img src={suggestion.image} alt="" className="w-10 h-10 object-cover rounded" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{suggestion.title}</p>
                        <p className="text-xs text-gray-500 capitalize">{suggestion.type}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {query && suggestions.length === 0 && (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No results found for "{query}"
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
