import * as React from "react"
import { Shield, Truck, RefreshCw, CreditCard, Lock, Award, Headphones, CheckCircle } from "lucide-react"
import { clx } from "@medusajs/ui"

type BadgeType = 
  | "secure-payment"
  | "free-shipping"
  | "money-back"
  | "ssl-secure"
  | "quality-guarantee"
  | "24-7-support"
  | "verified"
  | "custom"

interface TrustBadge {
  type: BadgeType
  title?: string
  description?: string
  icon?: React.ReactNode
}

interface TrustBadgesProps {
  badges: TrustBadge[]
  variant?: "default" | "compact" | "detailed"
  columns?: 2 | 3 | 4
  className?: string
}

const defaultBadges: Record<BadgeType, { icon: React.ReactNode; title: string; description: string }> = {
  "secure-payment": {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Secure Payment",
    description: "All major credit cards accepted"
  },
  "free-shipping": {
    icon: <Truck className="w-6 h-6" />,
    title: "Free Shipping",
    description: "On orders over $50"
  },
  "money-back": {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Money Back",
    description: "30-day return policy"
  },
  "ssl-secure": {
    icon: <Lock className="w-6 h-6" />,
    title: "SSL Secured",
    description: "Your data is protected"
  },
  "quality-guarantee": {
    icon: <Award className="w-6 h-6" />,
    title: "Quality Guarantee",
    description: "Premium products only"
  },
  "24-7-support": {
    icon: <Headphones className="w-6 h-6" />,
    title: "24/7 Support",
    description: "Always here to help"
  },
  "verified": {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Verified Seller",
    description: "Trusted by thousands"
  },
  "custom": {
    icon: <Shield className="w-6 h-6" />,
    title: "Custom",
    description: ""
  }
}

export function TrustBadges({
  badges,
  variant = "default",
  columns = 4,
  className
}: TrustBadgesProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4"
  }

  if (variant === "compact") {
    return (
      <div className={clx("flex flex-wrap items-center justify-center gap-4", className)}>
        {badges.map((badge, index) => {
          const config = defaultBadges[badge.type]
          return (
            <div
              key={index}
              className="flex items-center gap-2 text-zinc-400"
            >
              <span className="text-cyan-500">
                {badge.icon || config.icon}
              </span>
              <span className="text-sm font-medium">
                {badge.title || config.title}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  if (variant === "detailed") {
    return (
      <div className={clx("grid gap-4", gridCols[columns], className)}>
        {badges.map((badge, index) => {
          const config = defaultBadges[badge.type]
          return (
            <div
              key={index}
              className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-500">
                  {badge.icon || config.icon}
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">
                    {badge.title || config.title}
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    {badge.description || config.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={clx("grid gap-4", gridCols[columns], className)}>
      {badges.map((badge, index) => {
        const config = defaultBadges[badge.type]
        return (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4"
          >
            <div className="p-3 rounded-full bg-zinc-800 text-cyan-500 mb-3">
              {badge.icon || config.icon}
            </div>
            <h3 className="text-white font-medium text-sm mb-1">
              {badge.title || config.title}
            </h3>
            <p className="text-zinc-500 text-xs">
              {badge.description || config.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export function PaymentBadges({ className }: { className?: string }) {
  return (
    <div className={clx("flex items-center gap-3", className)}>
      <span className="text-zinc-500 text-sm">We accept:</span>
      <div className="flex items-center gap-2">
        {["Visa", "MC", "Amex", "PayPal"].map((card) => (
          <div
            key={card}
            className="px-2 py-1 rounded bg-zinc-800 text-zinc-400 text-xs font-medium"
          >
            {card}
          </div>
        ))}
      </div>
    </div>
  )
}
