import { useState } from "react"
import { ArrowUpTray } from "@medusajs/icons"

interface BulkOrderItem {
  sku: string
  quantity: number
}

interface BulkOrderFormProps {
  onSubmit: (items: BulkOrderItem[]) => void
  isSubmitting?: boolean
}

export function BulkOrderForm({ onSubmit, isSubmitting }: BulkOrderFormProps) {
  const [csvData, setCsvData] = useState("")
  const [items, setItems] = useState<BulkOrderItem[]>([])
  const [error, setError] = useState<string | null>(null)

  const parseCSV = (text: string) => {
    setError(null)
    const lines = text.trim().split("\n")
    const parsed: BulkOrderItem[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const parts = line.split(",").map((p) => p.trim())
      if (parts.length < 2) {
        setError(`Line ${i + 1}: Invalid format. Expected: SKU, Quantity`)
        return
      }

      const sku = parts[0]
      const quantity = parseInt(parts[1])

      if (!sku || isNaN(quantity) || quantity < 1) {
        setError(`Line ${i + 1}: Invalid SKU or quantity`)
        return
      }

      parsed.push({ sku, quantity })
    }

    setItems(parsed)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      setCsvData(text)
      parseCSV(text)
    }
    reader.readAsText(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length > 0) {
      onSubmit(items)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
        <ArrowUpTray className="w-8 h-8 text-gray-500 mx-auto mb-4" />
        <p className="text-gray-400 mb-2">Upload a CSV file with SKU and Quantity</p>
        <p className="text-sm text-gray-500 mb-4">Format: SKU, Quantity (one per line)</p>
        <label className="inline-block">
          <input
            type="file"
            accept=".csv,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
          <span className="px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg cursor-pointer hover:bg-cyan-400">
            Choose File
          </span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Or paste CSV data directly
        </label>
        <textarea
          value={csvData}
          onChange={(e) => {
            setCsvData(e.target.value)
            parseCSV(e.target.value)
          }}
          rows={6}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md font-mono text-sm text-white placeholder-gray-500"
          placeholder="SKU001, 10&#10;SKU002, 5&#10;SKU003, 20"
        />
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {items.length > 0 && (
        <div className="border border-gray-800 rounded-lg overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h4 className="font-medium text-white">Preview ({items.length} items)</h4>
          </div>
          <div className="max-h-48 overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left py-2 px-4 text-gray-400">SKU</th>
                  <th className="text-right py-2 px-4 text-gray-400">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.slice(0, 10).map((item, index) => (
                  <tr key={index} className="border-t border-gray-800">
                    <td className="py-2 px-4 font-mono text-white">{item.sku}</td>
                    <td className="py-2 px-4 text-right text-white">{item.quantity}</td>
                  </tr>
                ))}
                {items.length > 10 && (
                  <tr className="border-t border-gray-800">
                    <td colSpan={2} className="py-2 px-4 text-center text-gray-500">
                      ...and {items.length - 10} more items
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || items.length === 0}
        className="w-full py-3 px-4 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Processing..." : `Add ${items.length} Items to Cart`}
      </button>
    </form>
  )
}
