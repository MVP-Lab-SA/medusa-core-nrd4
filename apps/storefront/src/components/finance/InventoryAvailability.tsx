import { Check, XMark, Clock } from "@medusajs/icons"

interface InventoryAvailabilityProps {
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'backorder'
  quantity?: number
  lowStockThreshold?: number
  restockDate?: string
  showQuantity?: boolean
}

export function InventoryAvailability({ 
  status, 
  quantity, 
  lowStockThreshold = 5,
  restockDate,
  showQuantity = false 
}: InventoryAvailabilityProps) {
  const statusConfig = {
    in_stock: {
      icon: Check,
      label: 'In Stock',
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    low_stock: {
      icon: Clock,
      label: 'Low Stock',
      color: 'text-yellow-600',
      bg: 'bg-yellow-100'
    },
    out_of_stock: {
      icon: XMark,
      label: 'Out of Stock',
      color: 'text-red-600',
      bg: 'bg-red-100'
    },
    backorder: {
      icon: Clock,
      label: 'Backorder',
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    }
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-sm font-medium ${config.bg} ${config.color}`}>
        <Icon className="w-4 h-4" />
        {config.label}
      </span>
      
      {showQuantity && quantity !== undefined && status !== 'out_of_stock' && (
        <span className="text-sm text-gray-500">
          ({quantity} available)
        </span>
      )}
      
      {status === 'low_stock' && quantity !== undefined && (
        <span className="text-sm text-yellow-600">
          Only {quantity} left!
        </span>
      )}
      
      {status === 'backorder' && restockDate && (
        <span className="text-sm text-gray-500">
          Expected {new Date(restockDate).toLocaleDateString()}
        </span>
      )}
    </div>
  )
}
