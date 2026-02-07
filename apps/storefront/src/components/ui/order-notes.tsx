import { useState } from "react"
import { DocumentText, ChevronDownMini } from "@medusajs/icons"

interface OrderNotesProps {
  value: string
  onChange: (value: string) => void
  maxLength?: number
  placeholder?: string
  className?: string
}

export function OrderNotes({
  value,
  onChange,
  maxLength = 500,
  placeholder = "Add any special instructions for your order...",
  className = ""
}: OrderNotesProps) {
  const [isExpanded, setIsExpanded] = useState(!!value)

  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <DocumentText className="w-5 h-5 text-gray-400" />
          <span className="font-medium text-gray-900">Order Notes</span>
          {value && !isExpanded && (
            <span className="text-sm text-cyan-600">(Added)</span>
          )}
        </div>
        <ChevronDownMini
          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      {isExpanded && (
        <div className="p-4 pt-0">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
            placeholder={placeholder}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none text-sm"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">
              Special delivery instructions, gate codes, etc.
            </p>
            <span className="text-xs text-gray-400">
              {value.length}/{maxLength}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
