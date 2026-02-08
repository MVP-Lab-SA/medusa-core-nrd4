import { useState } from "react"
import { XMark } from "@medusajs/icons"

interface PauseSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onPause: (duration: string, reason: string) => void
  subscriptionName: string
}

export function PauseSubscriptionModal({ isOpen, onClose, onPause, subscriptionName }: PauseSubscriptionModalProps) {
  const [duration, setDuration] = useState("1_month")
  const [reason, setReason] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onPause(duration, reason)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Pause Subscription</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <XMark className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              Pausing <strong>{subscriptionName}</strong> will temporarily stop billing and deliveries.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pause Duration
            </label>
            <select 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="2_weeks">2 Weeks</option>
              <option value="1_month">1 Month</option>
              <option value="2_months">2 Months</option>
              <option value="3_months">3 Months</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for pausing (optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Let us know why you're pausing..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none h-24"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Pause Subscription
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
