import { Link } from "@tanstack/react-router"
import { XMark } from "@medusajs/icons"

interface AffiliateBannerProps {
  partnerName: string
  partnerLogo?: string
  discount: string
  discountCode: string
  link?: string
  backgroundColor?: string
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

export function AffiliateBanner({
  partnerName,
  partnerLogo,
  discount,
  discountCode,
  link = "/us/store",
  backgroundColor = "bg-gradient-to-r from-indigo-600 to-purple-600",
  dismissible = true,
  onDismiss,
  className = ""
}: AffiliateBannerProps) {
  return (
    <div className={`${backgroundColor} text-white py-3 px-4 relative ${className}`}>
      <div className="container mx-auto flex items-center justify-center gap-4 flex-wrap">
        {partnerLogo && (
          <img src={partnerLogo} alt={partnerName} className="h-6" />
        )}
        
        <div className="flex items-center gap-2">
          <span className="text-sm">
            Exclusive for <strong>{partnerName}</strong> members:
          </span>
          <span className="font-bold">{discount} OFF</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">Use code:</span>
          <code className="px-2 py-0.5 bg-white/20 rounded font-mono font-bold">
            {discountCode}
          </code>
        </div>

        <Link
          to={link}
          className="px-4 py-1.5 bg-white text-indigo-600 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
        >
          Shop Now
        </Link>

        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute right-4 p-1 hover:bg-white/20 rounded-full"
          >
            <XMark className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
