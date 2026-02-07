import { useState, useEffect } from "react"
import { clx } from "@medusajs/ui"
import { ShoppingBag, Eye, Star } from "@medusajs/icons"

interface SocialProofEvent {
  id: string
  type: "purchase" | "view" | "review"
  productName: string
  productImage?: string
  location?: string
  time: string
  rating?: number
}

interface SocialProofProps {
  events: SocialProofEvent[]
  autoPlay?: boolean
  interval?: number
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right"
  className?: string
}

export function SocialProof({
  events,
  autoPlay = true,
  interval = 5000,
  position = "bottom-left",
  className,
}: SocialProofProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    if (!autoPlay || events.length === 0 || isDismissed) return

    const showNotification = () => {
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % events.length)
        }, 500)
      }, interval - 1000)
    }

    // Initial delay before showing first notification
    const initialTimeout = setTimeout(showNotification, 3000)

    const timer = setInterval(showNotification, interval + 2000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(timer)
    }
  }, [autoPlay, events.length, interval, isDismissed])

  if (events.length === 0 || isDismissed) return null

  const currentEvent = events[currentIndex]

  const positionClasses = {
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
  }

  const getIcon = () => {
    switch (currentEvent.type) {
      case "purchase":
        return <ShoppingBag className="w-4 h-4 text-emerald-400" />
      case "view":
        return <Eye className="w-4 h-4 text-cyan-400" />
      case "review":
        return <Star className="w-4 h-4 text-amber-400" />
    }
  }

  const getMessage = () => {
    switch (currentEvent.type) {
      case "purchase":
        return "just purchased"
      case "view":
        return "is viewing"
      case "review":
        return "left a review for"
    }
  }

  return (
    <div
      className={clx(
        "fixed z-40 transition-all duration-500",
        positionClasses[position],
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
        className
      )}
    >
      <div className="flex items-start gap-3 p-4 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl max-w-sm">
        {currentEvent.productImage && (
          <img
            src={currentEvent.productImage}
            alt={currentEvent.productName}
            className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {getIcon()}
            <span className="text-xs text-neutral-500">{currentEvent.time}</span>
          </div>
          <p className="text-sm text-neutral-300">
            {currentEvent.location && (
              <span className="text-white font-medium">
                Someone in {currentEvent.location}
              </span>
            )}{" "}
            {getMessage()}
          </p>
          <p className="text-sm text-white font-medium truncate mt-0.5">
            {currentEvent.productName}
          </p>
          {currentEvent.type === "review" && currentEvent.rating && (
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={clx(
                    "w-3 h-3",
                    i < currentEvent.rating! ? "text-amber-400" : "text-neutral-600"
                  )}
                />
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 hover:bg-neutral-800 rounded transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <span className="text-neutral-600 text-xs">x</span>
        </button>
      </div>
    </div>
  )
}
