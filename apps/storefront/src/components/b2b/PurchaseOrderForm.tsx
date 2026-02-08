import { useState } from "react"
import { Plus, XMark } from "@medusajs/icons"

interface POItem {
  productId: string
  productName: string
  sku: string
  quantity: number
  unitPrice: number
}

interface PurchaseOrderFormProps {
  onSubmit: (data: { items: POItem[]; shippingAddress: string; notes: string }) => void
  isSubmitting?: boolean
}

export function PurchaseOrderForm({ onSubmit, isSubmitting }: PurchaseOrderFormProps) {
  const [items, setItems] = useState<POItem[]>([
    { productId: "", productName: "", sku: "", quantity: 1, unitPrice: 0 },
  ])
  const [shippingAddress, setShippingAddress] = useState("")
  const [notes, setNotes] = useState("")

  const addItem = () => {
    setItems([...items, { productId: "", productName: "", sku: "", quantity: 1, unitPrice: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof POItem, value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ items, shippingAddress, notes })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                  <input
                    type="text"
                    value={item.productName}
                    onChange={(e) => updateItem(index, "productName", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Product name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    value={item.sku}
                    onChange={(e) => updateItem(index, "sku", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qty</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(index, "unitPrice", parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="p-2 text-gray-400 hover:text-red-500 mb-0.5"
                    >
                      <XMark className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
        <textarea
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <span className="text-lg font-medium">Total</span>
        <span className="text-2xl font-bold">${total.toFixed(2)}</span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Creating Order..." : "Create Purchase Order"}
      </button>
    </form>
  )
}
