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
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Quantity</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
            {editable && <th className="px-4 py-3 w-12"></th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-4 py-4">
                <span className="font-medium text-gray-900">{item.productName}</span>
              </td>
              <td className="px-4 py-4 text-sm text-gray-500">{item.sku}</td>
              <td className="px-4 py-4">
                {editable ? (
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <span className="text-center block">{item.quantity}</span>
                )}
              </td>
              <td className="px-4 py-4 text-right text-sm text-gray-500">
                ${item.unitPrice.toFixed(2)}
              </td>
              <td className="px-4 py-4 text-right font-medium text-gray-900">
                ${item.total.toFixed(2)}
              </td>
              {editable && (
                <td className="px-4 py-4">
                  <button 
                    onClick={() => onRemoveItem?.(item.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50">
          <tr>
            <td colSpan={editable ? 4 : 3} className="px-4 py-3 text-right font-medium text-gray-900">
              Subtotal
            </td>
            <td className="px-4 py-3 text-right font-bold text-gray-900">
              ${subtotal.toFixed(2)}
            </td>
            {editable && <td></td>}
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
