import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { MagnifyingGlass, XMark, BellAlert, Check } from "@medusajs/icons"
import { Button } from "./button"

interface SavedSearch {
  id: string
  query: string
  filters?: Record<string, string>
  resultCount?: number
  alertEnabled: boolean
  createdAt: string
}

interface SavedSearchesProps {
  searches: SavedSearch[]
  onDelete: (id: string) => void
  onToggleAlert: (id: string, enabled: boolean) => void
  className?: string
}

export function SavedSearches({
  searches,
  onDelete,
  onToggleAlert,
  className = ""
}: SavedSearchesProps) {
  if (searches.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <MagnifyingGlass className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No saved searches</h3>
        <p className="text-gray-500 mb-6">Save your favorite searches to quickly access them later</p>
        <Link to="/us/store">
          <Button variant="outline">Start Browsing</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">Saved Searches</h3>
        <span className="text-sm text-gray-500">{searches.length} saved</span>
      </div>

      <div className="space-y-3">
        {searches.map(search => (
          <div
            key={search.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <MagnifyingGlass className="w-5 h-5 text-gray-400 flex-shrink-0" />
            
            <div className="flex-1 min-w-0">
              <Link
                to={`/us/store?q=${encodeURIComponent(search.query)}`}
                className="font-medium text-gray-900 hover:text-cyan-600"
              >
                {search.query}
              </Link>
              {search.filters && Object.keys(search.filters).length > 0 && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {Object.entries(search.filters).map(([k, v]) => `${k}: ${v}`).join(", ")}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                {search.resultCount !== undefined && `${search.resultCount} results - `}
                Saved {search.createdAt}
              </p>
            </div>

            <button
              onClick={() => onToggleAlert(search.id, !search.alertEnabled)}
              className={`p-2 rounded-full ${
                search.alertEnabled
                  ? "bg-cyan-100 text-cyan-600"
                  : "hover:bg-gray-200 text-gray-400"
              }`}
              title={search.alertEnabled ? "Alerts enabled" : "Enable alerts"}
            >
              <BellAlert className="w-5 h-5" />
            </button>

            <button
              onClick={() => onDelete(search.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
            >
              <XMark className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

interface SaveSearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, enableAlerts: boolean) => void
  defaultQuery: string
}

export function SaveSearchModal({
  isOpen,
  onClose,
  onSave,
  defaultQuery
}: SaveSearchModalProps) {
  const [name, setName] = useState(defaultQuery)
  const [enableAlerts, setEnableAlerts] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Search</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer mb-6">
          <input
            type="checkbox"
            checked={enableAlerts}
            onChange={(e) => setEnableAlerts(e.target.checked)}
            className="w-4 h-4 text-cyan-500"
          />
          <div>
            <p className="font-medium text-gray-900">Enable alerts</p>
            <p className="text-sm text-gray-500">Get notified when new products match this search</p>
          </div>
        </label>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={() => onSave(name, enableAlerts)} className="flex-1">
            Save Search
          </Button>
        </div>
      </div>
    </div>
  )
}
