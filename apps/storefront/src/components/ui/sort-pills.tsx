interface SortOption {
  id: string
  label: string
}

interface SortPillsProps {
  options: SortOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SortPills({ options, value, onChange, className = "" }: SortPillsProps) {
  return (
    <div className={`flex gap-2 overflow-x-auto pb-2 scrollbar-hide ${className}`}>
      {options.map(option => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            value === option.id
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
