import { clx } from "@medusajs/ui"
import { LockClosedSolid, ArrowPath, CreditCard, ShieldCheck } from "@medusajs/icons"

interface TrustBadge {
  icon: React.ReactNode
  title: string
  description?: string
}

interface TrustBadgesProps {
  variant?: "inline" | "grid" | "compact"
  showDescriptions?: boolean
  className?: string
  badges?: TrustBadge[]
}

const defaultBadges: TrustBadge[] = [
  {
    icon: <LockClosedSolid className="w-5 h-5" />,
    title: "Secure Checkout",
    description: "SSL encrypted payment",
  },
  {
    icon: <ArrowPath className="w-5 h-5" />,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: "Safe Payment",
    description: "Multiple payment options",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Buyer Protection",
    description: "Full purchase protection",
  },
]

export function TrustBadges({
  variant = "inline",
  showDescriptions = true,
  className,
  badges = defaultBadges,
}: TrustBadgesProps) {
  if (variant === "compact") {
    return (
      <div className={clx("flex flex-wrap items-center gap-4", className)}>
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-neutral-400"
          >
            <span className="text-cyan-400">{badge.icon}</span>
            <span className="text-xs font-medium">{badge.title}</span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === "grid") {
    return (
      <div className={clx("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 bg-neutral-900 border border-neutral-800 rounded-xl"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-cyan-500/10 rounded-full mb-3 text-cyan-400">
              {badge.icon}
            </div>
            <h4 className="text-sm font-medium text-white mb-1">{badge.title}</h4>
            {showDescriptions && badge.description && (
              <p className="text-xs text-neutral-500">{badge.description}</p>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Inline variant (default)
  return (
    <div className={clx("flex flex-wrap justify-center gap-6 md:gap-8", className)}>
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-neutral-800 rounded-lg text-cyan-400">
            {badge.icon}
          </div>
          <div>
            <h4 className="text-sm font-medium text-white">{badge.title}</h4>
            {showDescriptions && badge.description && (
              <p className="text-xs text-neutral-500">{badge.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
