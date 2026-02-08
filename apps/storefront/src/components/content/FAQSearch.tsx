import { useState } from "react"
import { MagnifyingGlass, XMark } from "@medusajs/icons"

interface FAQSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function FAQSearch({ onSearch, placeholder = "Search FAQs..." }: FAQSearchProps) {
  const [query, setQuery] = useState("")

  const handleChange = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="relative">
      <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
        >
          <XMark className="w-5 h-5 text-gray-400" />
        </button>
      )}
    </div>
  )
}
