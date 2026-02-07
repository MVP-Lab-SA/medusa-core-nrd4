import * as React from "react"
import { Users, ShoppingBag, Eye, Clock } from "lucide-react"
import { clx } from "@medusajs/ui"

interface SocialProofProps {
  type: "viewers" | "purchases" | "cart" | "stock"
  count: number
  productName?: string
  timeframe?: string
  animated?: boolean
  className?: string
}

export function SocialProof({
  type,
  count,
  productName,
  timeframe = "in the last 24 hours",
  animated = true,
  className
}: SocialProofProps) {
  const [displayCount, setDisplayCount] = React.useState(animated ? 0 : count)

  React.useEffect(() => {
    if (!animated) return

    const duration = 1000
    const steps = 20
    const increment = count / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= count) {
        setDisplayCount(count)
        clearInterval(timer)
      } else {
        setDisplayCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [count, animated])

  const config = {
    viewers: {
      icon: <Eye className="w-4 h-4" />,
      message: `${displayCount} people are viewing this right now`,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
    },
    purchases: {
      icon: <ShoppingBag className="w-4 h-4" />,
      message: `${displayCount} purchased ${timeframe}`,
      color: "text-green-400 bg-green-500/10 border-green-500/20"
    },
    cart: {
      icon: <Users className="w-4 h-4" />,
      message: `${displayCount} people have this in their cart`,
      color: "text-orange-400 bg-orange-500/10 border-orange-500/20"
    },
    stock: {
      icon: <Clock className="w-4 h-4" />,
      message: `Only ${displayCount} left in stock`,
      color: "text-red-400 bg-red-500/10 border-red-500/20"
    }
  }

  const { icon, message, color } = config[type]

  return (
    <div
      className={clx(
        "inline-flex items-center gap-2 px-3 py-2 rounded-lg border",
        color,
        className
      )}
    >
      {icon}
      <span className="text-sm font-medium">
        {productName ? `${message} - ${productName}` : message}
      </span>
    </div>
  )
}

interface SocialProofNotificationProps {
  purchases: Array<{
    name: string
    location: string
    product: string
    image?: string
    time: string
  }>
  interval?: number
  duration?: number
  className?: string
}

export function SocialProofNotification({
  purchases,
  interval = 5000,
  duration = 4000,
  className
}: SocialProofNotificationProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    if (purchases.length === 0) return

    const showNotification = () => {
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % purchases.length)
        }, 500)
      }, duration)
    }

    showNotification()
    const timer = setInterval(showNotification, interval + duration + 500)

    return () => clearInterval(timer)
  }, [purchases.length, interval, duration])

  if (purchases.length === 0) return null

  const current = purchases[currentIndex]

  return (
    <div
      className={clx(
        "fixed bottom-24 left-4 z-40 max-w-sm transition-all duration-500",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
        className
      )}
    >
      <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl">
        {current.image ? (
          <img
            src={current.image}
            alt={current.product}
            className="w-12 h-12 rounded-lg object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-zinc-500" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">
            {current.name} from {current.location}
          </p>
          <p className="text-zinc-400 text-xs truncate">
            purchased {current.product}
          </p>
          <p className="text-zinc-500 text-xs">{current.time}</p>
        </div>
      </div>
    </div>
  )
}
