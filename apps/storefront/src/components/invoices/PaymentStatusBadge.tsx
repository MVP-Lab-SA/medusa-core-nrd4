import { CheckCircle, Clock, ExclamationCircle, XMark } from "@medusajs/icons"

interface PaymentStatusBadgeProps {
  status: "paid" | "pending" | "overdue" | "failed"
  size?: "sm" | "md" | "lg"
}

export function PaymentStatusBadge({ status, size = "md" }: PaymentStatusBadgeProps) {
  const config = {
    paid: { label: "Paid", color: "bg-green-500/20 text-green-400", icon: CheckCircle },
    pending: { label: "Pending", color: "bg-amber-500/20 text-amber-400", icon: Clock },
    overdue: { label: "Overdue", color: "bg-red-500/20 text-red-400", icon: ExclamationCircle },
    failed: { label: "Failed", color: "bg-red-500/20 text-red-400", icon: XMark },
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  }

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const { label, color, icon: Icon } = config[status]

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${color} ${sizeClasses[size]}`}>
      <Icon className={iconSizes[size]} />
      {label}
    </span>
  )
}
