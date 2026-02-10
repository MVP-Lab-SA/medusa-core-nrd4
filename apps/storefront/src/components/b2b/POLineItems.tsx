import { Minus, Plus, Trash } from "@medusajs/icons"

interface LineItem {
  id: string
  productId: string
  productName: string
  sku: string
  quantity: number
  unitPrice: number
  total: number
}

interface POLineItemsProps {
  items: LineItem[]
  editable?: boolean
  onUpdateQuantity?: (id: string, quantity: number) => void
  onRemoveItem?: (id: string) => void
}

export function POLineItems({ items, editable = false, onUpdateQuantity, onRemoveItem }: POLineItemsProps) {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0)

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Product</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">SKU</th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase">Quantity</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Unit Price</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Total</th>
            {editable && <th className="px-4 py-3 w-12"></th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-800/50">
              <td className="px-4 py-4">
                <span className="font-medium text-white">{item.productName}</span>
              </td>
              <td className="px-4 py-4 text-sm text-gray-400">{item.sku}</td>
              <td className="px-4 py-4">
                {editable ? (
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))}
                      className="p-1 border border-gray-700 rounded hover:bg-gray-700 text-gray-400"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-white">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                      className="p-1 border border-gray-700 rounded hover:bg-gray-700 text-gray-400"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <span className="text-center block text-white">{item.quantity}</span>
                )}
              </td>
              <td className="px-4 py-4 text-right text-sm text-gray-400">
                ${item.unitPrice.toFixed(2)}
              </td>
              <td className="px-4 py-4 text-right font-medium text-white">
                ${item.total.toFixed(2)}
              </td>
              {editable && (
                <td className="px-4 py-4">
                  <button 
                    onClick={() => onRemoveItem?.(item.id)}
                    className="p-1 text-red-400 hover:bg-red-500/10 rounded"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-800">
          <tr>
            <td colSpan={editable ? 4 : 3} className="px-4 py-3 text-right font-medium text-white">
              Subtotal
            </td>
            <td className="px-4 py-3 text-right font-bold text-white">
              ${subtotal.toFixed(2)}
            </td>
            {editable && <td></td>}
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
