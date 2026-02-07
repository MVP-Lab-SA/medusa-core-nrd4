import { CheckCircleSolid, ExclamationCircleSolid, InformationCircleSolid, XCircleSolid, XMark } from "@medusajs/icons"
import { clsx } from "clsx"
import { ReactNode, useState } from "react"

interface AlertProps {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const Alert = ({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const variantConfig = {
    info: {
      bg: "bg-blue-500/10 border-blue-500/30",
      icon: <InformationCircleSolid className="w-5 h-5 text-blue-400" />,
      titleColor: "text-blue-400",
    },
    success: {
      bg: "bg-emerald-500/10 border-emerald-500/30",
      icon: <CheckCircleSolid className="w-5 h-5 text-emerald-400" />,
      titleColor: "text-emerald-400",
    },
    warning: {
      bg: "bg-amber-500/10 border-amber-500/30",
      icon: <ExclamationCircleSolid className="w-5 h-5 text-amber-400" />,
      titleColor: "text-amber-400",
    },
    error: {
      bg: "bg-red-500/10 border-red-500/30",
      icon: <XCircleSolid className="w-5 h-5 text-red-400" />,
      titleColor: "text-red-400",
    },
  }

  const config = variantConfig[variant]

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  return (
    <div
      className={clsx(
        "border p-4 flex gap-3",
        config.bg,
        className
      )}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
      <div className="flex-1">
        {title && (
          <h4 className={clsx("font-medium mb-1", config.titleColor)}>
            {title}
          </h4>
        )}
        <div className="text-city-gray text-sm">{children}</div>
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-city-muted hover:text-city-white transition-colors"
          aria-label="Dismiss"
        >
          <XMark className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

export { Alert }
export default Alert
