import { useState, useEffect } from "react"
import { Link } from "@tanstack/react-router"
import { Fire, XMark } from "@medusajs/icons"

interface FlashSaleBarProps {
  title: string
  endTime: Date
  link?: string
  linkText?: string
  backgroundColor?: string
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

export function FlashSaleBar({
  title,
  endTime,
  link = "/us/store",
  linkText = "Shop Now",
  backgroundColor = "bg-gradient-to-r from-red-500 to-orange-500",
  dismissible = true,
  onDismiss,
  className = ""
}: FlashSaleBarProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = endTime.getTime()
      const difference = target - now

      if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.()
  }

  if (isDismissed) return null

  const isExpired = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  if (isExpired) return null

  return (
    <div className={`${backgroundColor} text-white py-2 px-4 ${className}`}>
      <div className="container mx-auto flex items-center justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Fire className="w-5 h-5 animate-pulse" />
          <span className="font-semibold">{title}</span>
        </div>

        <div className="flex items-center gap-1 font-mono">
          <TimeUnit value={timeLeft.hours} label="h" />
          <span className="text-white/60">:</span>
          <TimeUnit value={timeLeft.minutes} label="m" />
          <span className="text-white/60">:</span>
          <TimeUnit value={timeLeft.seconds} label="s" />
        </div>

        <Link
          to={link}
          className="px-4 py-1 bg-white text-red-600 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
        >
          {linkText}
        </Link>

        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute right-4 p-1 hover:bg-white/20 rounded-full"
          >
            <XMark className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white/20 rounded px-2 py-0.5">
      <span className="text-lg font-bold">{value.toString().padStart(2, "0")}</span>
      <span className="text-xs opacity-80">{label}</span>
    </div>
  )
}
