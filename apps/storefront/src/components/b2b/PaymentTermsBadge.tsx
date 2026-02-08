interface PaymentTermsBadgeProps {
  terms: "net_30" | "net_60" | "net_90" | "due_on_receipt"
  size?: "sm" | "md"
}

const termLabels = {
  net_30: "Net 30",
  net_60: "Net 60",
  net_90: "Net 90",
  due_on_receipt: "Due on Receipt",
}

export function PaymentTermsBadge({ terms, size = "md" }: PaymentTermsBadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
  
  return (
    <span className={`inline-flex items-center ${sizeClasses} font-medium bg-blue-100 text-blue-700 rounded-full`}>
      {termLabels[terms]}
    </span>
  )
}
