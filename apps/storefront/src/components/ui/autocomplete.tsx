import { useState, useRef, useEffect, useCallback } from "react"
import { clx } from "@medusajs/ui"
import { MagnifyingGlass, XMark } from "@medusajs/icons"

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
  className?: string
  label?: string
  error?: string
  clearable?: boolean
  showIcon?: boolean
  emptyMessage?: string
  filterFn?: (option: AutocompleteOption, query: string) => boolean
}

export function Autocomplete({
  value = "",
  onChange,
  onSelect,
  options,
  placeholder = "Search...",
  disabled = false,
  loading = false,
  className,
  label,
  error,
  clearable = true,
  showIcon = true,
  emptyMessage = "No results found",
  filterFn,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const defaultFilterFn = useCallback((option: AutocompleteOption, query: string) => {
    const searchTerm = query.toLowerCase()
    return (
      option.label.toLowerCase().includes(searchTerm) ||
      option.value.toLowerCase().includes(searchTerm) ||
      (option.description?.toLowerCase().includes(searchTerm) ?? false)
    )
  }, [])

  const filteredOptions = options.filter(option =>
    (filterFn || defaultFilterFn)(option, inputValue)
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onChange?.(newValue)
    setIsOpen(true)
    setHighlightedIndex(-1)
  }

  const handleSelect = (option: AutocompleteOption) => {
    setInputValue(option.label)
    onChange?.(option.value)
    onSelect?.(option)
    setIsOpen(false)
  }

  const handleClear = () => {
    setInputValue("")
    onChange?.("")
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        break
    }
  }

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement
      item?.scrollIntoView({ block: "nearest" })
    }
  }, [highlightedIndex])

  return (
    <div ref={containerRef} className={clx("relative", className)}>
      {label && (
        <label className="block text-sm font-medium text-neutral-300 mb-1.5">
          {label}
        </label>
      )}
      
      <div className="relative">
        {showIcon && (
          <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        )}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={clx(
            "w-full py-3 bg-neutral-900 border border-neutral-700 rounded-lg",
            "text-white placeholder-neutral-500",
            "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent",
            "transition-all duration-200",
            showIcon ? "pl-11 pr-10" : "px-4",
            disabled && "opacity-50 cursor-not-allowed",
            error && "border-red-500"
          )}
        />
        {clearable && inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-800 rounded transition-colors"
          >
            <XMark className="w-4 h-4 text-neutral-500" />
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}

      {isOpen && (
        <ul
          ref={listRef}
          className="absolute z-50 w-full mt-2 py-2 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl max-h-64 overflow-y-auto"
        >
          {loading ? (
            <li className="px-4 py-3 text-neutral-500 text-sm">Loading...</li>
          ) : filteredOptions.length === 0 ? (
            <li className="px-4 py-3 text-neutral-500 text-sm">{emptyMessage}</li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={clx(
                  "px-4 py-3 cursor-pointer transition-colors",
                  highlightedIndex === index
                    ? "bg-cyan-500/20"
                    : "hover:bg-neutral-800"
                )}
              >
                <div className="flex items-center gap-3">
                  {option.icon}
                  <div>
                    <p className="text-white text-sm">{option.label}</p>
                    {option.description && (
                      <p className="text-xs text-neutral-500">{option.description}</p>
                    )}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
