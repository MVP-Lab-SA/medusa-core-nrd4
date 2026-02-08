import { ShoppingBag, Check, TruckFast, MapPin, ExclamationCircle } from "@medusajs/icons"

type StatusType = 'pending' | 'processing' | 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception'

interface PackageStatusProps {
  status: StatusType
  statusMessage?: string
  size?: 'sm' | 'md' | 'lg'
}

const statusConfig: Record<StatusType, {
  label: string
  icon: typeof Check
  color: string
  bgColor: string
}> = {
  pending: {
    label: 'Pending',
    icon: ShoppingBag,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100'
  },
  processing: {
    label: 'Processing',
    icon: ShoppingBag,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  shipped: {
    label: 'Shipped',
    icon: TruckFast,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  in_transit: {
    label: 'In Transit',
    icon: TruckFast,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100'
  },
  out_for_delivery: {
    label: 'Out for Delivery',
    icon: MapPin,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  delivered: {
    label: 'Delivered',
    icon: Check,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  exception: {
    label: 'Exception',
    icon: ExclamationCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  }
}

const sizeClasses = {
  sm: {
    container: 'px-2 py-1 text-xs',
    icon: 'w-3 h-3'
  },
  md: {
    container: 'px-3 py-1.5 text-sm',
    icon: 'w-4 h-4'
  },
  lg: {
    container: 'px-4 py-2 text-base',
    icon: 'w-5 h-5'
  }
}

export function PackageStatus({ status, statusMessage, size = 'md' }: PackageStatusProps) {
  const config = statusConfig[status]
  const sizeClass = sizeClasses[size]
  const Icon = config.icon

  return (
    <div className="inline-flex flex-col items-start">
      <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bgColor} ${config.color} ${sizeClass.container}`}>
        <Icon className={sizeClass.icon} />
        {config.label}
      </span>
      {statusMessage && (
        <span className="text-xs text-gray-500 mt-1">{statusMessage}</span>
      )}
    </div>
  )
}
