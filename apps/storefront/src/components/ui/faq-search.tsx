import { useState } from "react"
import { MagnifyingGlass, ChevronDownMini } from "@medusajs/icons"

interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

interface FAQSearchProps {
  items: FAQItem[]
  categories?: string[]
  className?: string
}

export function FAQSearch({ items, categories = [], className = "" }: FAQSearchProps) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const filteredItems = items.filter(item => {
    const matchesSearch = !search || 
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleItem = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className={className}>
      {/* Search */}
      <div className="relative mb-6">
        <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search frequently asked questions..."
          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg"
        />
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory ? "bg-cyan-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category ? "bg-cyan-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      <div className="space-y-3">
        {filteredItems.map(item => {
          const isExpanded = expandedItems.includes(item.id)
          
          return (
            <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900 pr-4">{item.question}</span>
                <ChevronDownMini className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <MagnifyingGlass className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No results found for "{search}"</p>
        </div>
      )}
    </div>
  )
}
