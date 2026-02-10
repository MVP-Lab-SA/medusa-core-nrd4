import { Check, ExclamationCircle, Clock } from "@medusajs/icons"

interface DigitalBadgeProps {
  type: 'verified' | 'pending' | 'expired' | 'premium' | 'trusted'
  label?: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

const badgeConfig = {
  verified: {
    icon: Check,
    label: 'Verified',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    iconColor: 'text-green-500'
  },
  pending: {
    icon: Clock,
    label: 'Pending',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
    iconColor: 'text-yellow-500'
  },
  expired: {
    icon: ExclamationCircle,
    label: 'Expired',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
    iconColor: 'text-red-500'
  },
  premium: {
    icon: Check,
    label: 'Premium',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    iconColor: 'text-purple-500'
  },
  trusted: {
    icon: Check,
    label: 'Trusted',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    iconColor: 'text-blue-500'
  }
}

const sizeConfig = {
  sm: { container: 'px-1.5 py-0.5 text-xs gap-1', icon: 'w-3 h-3' },
  md: { container: 'px-2 py-1 text-sm gap-1.5', icon: 'w-4 h-4' },
  lg: { container: 'px-3 py-1.5 text-base gap-2', icon: 'w-5 h-5' }
}

export function DigitalBadge({ type, label, size = 'md', showLabel = true }: DigitalBadgeProps) {
  const config = badgeConfig[type]
  const sizeClass = sizeConfig[size]
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${config.bgColor} ${config.textColor} ${sizeClass.container}`}>
      <Icon className={`${sizeClass.icon} ${config.iconColor}`} />
      {showLabel && <span>{label || config.label}</span>}
    </span>
  )
}
