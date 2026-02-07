import { useState } from "react"
import { ArrowPath, XMark } from "@medusajs/icons"
import { Button } from "./button"

interface UpdatePromptProps {
  onUpdate: () => void
  onDismiss: () => void
  className?: string
}

export function UpdatePrompt({ onUpdate, onDismiss, className = "" }: UpdatePromptProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdate = () => {
    setIsUpdating(true)
    onUpdate()
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 max-w-sm ${className}`}>
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
            <ArrowPath className={`w-5 h-5 text-cyan-600 ${isUpdating ? "animate-spin" : ""}`} />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Update Available</h3>
            <p className="text-sm text-gray-600 mt-1">
              A new version is available. Refresh to get the latest features.
            </p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={handleUpdate} disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Refresh Now"}
              </Button>
              <Button size="sm" variant="outline" onClick={onDismiss}>
                Later
              </Button>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <XMark className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
