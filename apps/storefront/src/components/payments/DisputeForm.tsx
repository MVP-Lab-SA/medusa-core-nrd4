import { useState } from "react"
import { ArrowUpTray } from "@medusajs/icons"

interface DisputeFormProps {
  transactionId: string
  onSubmit: (data: { reason: string; description: string; evidence?: File[] }) => void
  isSubmitting?: boolean
}

const disputeReasons = [
  { value: "not_received", label: "Product Not Received" },
  { value: "not_as_described", label: "Product Not As Described" },
  { value: "unauthorized", label: "Unauthorized Transaction" },
  { value: "duplicate", label: "Duplicate Charge" },
  { value: "canceled", label: "Subscription Canceled" },
  { value: "other", label: "Other" },
]

export function DisputeForm({ transactionId, onSubmit, isSubmitting }: DisputeFormProps) {
  const [reason, setReason] = useState("")
  const [description, setDescription] = useState("")
  const [evidence, setEvidence] = useState<File[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ reason, description, evidence: evidence.length > 0 ? evidence : undefined })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEvidence([...evidence, ...Array.from(e.target.files)])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-400">Transaction ID</p>
        <p className="font-mono text-white">{transactionId}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Reason for Dispute
        </label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          required
        >
          <option value="">Select a reason</option>
          {disputeReasons.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Describe the Issue
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          placeholder="Please provide details about your dispute..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Supporting Evidence (optional)
        </label>
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
          <ArrowUpTray className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <p className="text-sm text-gray-400 mb-2">Upload screenshots, receipts, or other evidence</p>
          <label className="inline-block px-4 py-2 bg-gray-800 text-gray-300 rounded-lg cursor-pointer hover:bg-gray-700">
            <input
              type="file"
              accept="image/*,.pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            Choose Files
          </label>
        </div>
        {evidence.length > 0 && (
          <ul className="mt-2 text-sm text-gray-400">
            {evidence.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-500 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Dispute"}
      </button>
    </form>
  )
}
