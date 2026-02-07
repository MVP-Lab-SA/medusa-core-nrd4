import { XMark } from "@medusajs/icons"

interface FilterTag {
  id: string
  label: string
  groupLabel?: string
}

interface FilterTagsProps {
  tags: FilterTag[]
  onRemove: (tagId: string) => void
  onClearAll: () => void
  className?: string
}

export function FilterTags({ tags, onRemove, onClearAll, className = "" }: FilterTagsProps) {
  if (tags.length === 0) return null

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-500">Active filters:</span>
      
      {tags.map(tag => (
        <button
          key={tag.id}
          onClick={() => onRemove(tag.id)}
          className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm hover:bg-cyan-100 transition-colors group"
        >
          {tag.groupLabel && (
            <span className="text-cyan-500">{tag.groupLabel}:</span>
          )}
          <span>{tag.label}</span>
          <XMark className="w-4 h-4 text-cyan-400 group-hover:text-cyan-600" />
        </button>
      ))}

      {tags.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Clear all
        </button>
      )}
    </div>
  )
}
