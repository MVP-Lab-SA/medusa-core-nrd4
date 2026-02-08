import { Check } from "@medusajs/icons"

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg'
  tooltip?: string
  className?: string
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
}

export function VerifiedBadge({ size = 'md', tooltip = 'Verified', className = '' }: VerifiedBadgeProps) {
  return (
    <span 
      className={`inline-flex items-center justify-center rounded-full bg-blue-500 text-white ${sizes[size]} ${className}`}
      title={tooltip}
    >
      <Check className={size === 'sm' ? 'w-2.5 h-2.5' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} />
    </span>
  )
}
