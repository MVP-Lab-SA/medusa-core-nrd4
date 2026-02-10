import { useState } from "react"
import { Plus, XMark } from "@medusajs/icons"

interface QuoteItem {
  productId: string
  productName: string
  quantity: number
  notes?: string
}

interface QuoteRequestFormProps {
  onSubmit: (data: { items: QuoteItem[]; notes: string; expiresIn: number }) => void
  isSubmitting?: boolean
}

export function QuoteRequestForm({ onSubmit, isSubmitting }: QuoteRequestFormProps) {
  const [items, setItems] = useState<QuoteItem[]>([
    { productId: "", productName: "", quantity: 1 },
  ])
  const [notes, setNotes] = useState("")
  const [expiresIn, setExpiresIn] = useState(30)

  const addItem = () => {
    setItems([...items, { productId: "", productName: "", quantity: 1 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof QuoteItem, value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ items, notes, expiresIn })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quote Items</h3>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={item.productName}
                    onChange={(e) => updateItem(index, "productName", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <XMark className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addItem}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quote Valid For
        </label>
        <select
          value={expiresIn}
          onChange={(e) => setExpiresIn(parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value={7}>7 days</option>
          <option value={14}>14 days</option>
          <option value={30}>30 days</option>
          <option value={60}>60 days</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Any special requirements or notes..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Request Quote"}
      </button>
    </form>
  )
}
