import { clsx } from "clsx"
import { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "cyan";
  size?: "sm" | "md";
  className?: string;
}

const Badge = ({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) => {
  const variantClasses = {
    default: "bg-city-steel text-city-gray",
    success: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    error: "bg-red-500/20 text-red-400 border border-red-500/30",
    info: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    cyan: "bg-city-cyan/20 text-city-cyan border border-city-cyan/30",
  }

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
  }

  return (
    <span
      className={clsx(
        "inline-flex items-center font-medium rounded",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  )
}

// Status badge with dot indicator
const StatusBadge = ({
  status,
  label,
}: {
  status: "online" | "offline" | "pending" | "error";
  label?: string;
}) => {
  const statusConfig = {
    online: { color: "bg-emerald-400", text: "Online" },
    offline: { color: "bg-city-muted", text: "Offline" },
    pending: { color: "bg-amber-400", text: "Pending" },
    error: { color: "bg-red-400", text: "Error" },
  }

  const config = statusConfig[status]

  return (
    <span className="inline-flex items-center gap-2 text-sm text-city-gray">
      <span className={clsx("w-2 h-2 rounded-full", config.color)} />
      {label || config.text}
    </span>
  )
}

export { Badge, StatusBadge }
export default Badge
