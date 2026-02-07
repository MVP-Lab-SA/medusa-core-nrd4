import * as React from "react"
import { Search, X, Loader2 } from "lucide-react"
import { clx } from "@medusajs/ui"

interface AutocompleteOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
}

interface AutocompleteProps {
  value?: string
  onChange?: (value: string) => void
  onSelect?: (option: AutocompleteOption) => void
  options: AutocompleteOption[]
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  emptyMessage?: string
  className?: string
}

export function Autocomplete({
  value = "",
  onChange,
  onSelect,
  options,
  placeholder = "Search...",
  disabled = false,
  loading = false,
  emptyMessage = "No results found",
  className
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [highlightedIndex, setHighlightedIndex] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(value.toLowerCase()) ||
    option.description?.toLowerCase().includes(value.toLowerCase())
  )

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  React.useEffect(() => {
    setHighlightedIndex(0)
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case "Enter":
        e.preventDefault()
        if (filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        break
    }
  }

  const handleSelect = (option: AutocompleteOption) => {
    onChange?.(option.label)
    onSelect?.(option)
    setIsOpen(false)
  }

  const handleClear = () => {
    onChange?.("")
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className={clx("relative", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange?.(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={clx(
            "w-full pl-12 pr-12 py-3 rounded-lg border transition-all",
            "bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500",
            "hover:border-cyan-500/50 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
        {loading ? (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 animate-spin" />
        ) : value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-4 text-center text-zinc-500">
              <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
              Loading...
            </div>
          ) : filteredOptions.length === 0 ? (
            <div className="p-4 text-center text-zinc-500">
              {emptyMessage}
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto">
              {filteredOptions.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={clx(
                    "w-full px-4 py-3 text-left flex items-center gap-3 transition-colors",
                    highlightedIndex === index
                      ? "bg-zinc-800"
                      : "hover:bg-zinc-800/50"
                  )}
                >
                  {option.icon && (
                    <span className="text-zinc-400">{option.icon}</span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white truncate">{option.label}</p>
                    {option.description && (
                      <p className="text-zinc-500 text-sm truncate">{option.description}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
