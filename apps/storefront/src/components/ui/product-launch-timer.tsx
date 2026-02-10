import { useState, useEffect } from "react"
import { BellAlert, Check } from "@medusajs/icons"
import { Button } from "./button"

interface ProductLaunchTimerProps {
  launchDate: Date
  productTitle: string
  productImage?: string
  onNotify: (email: string) => Promise<void>
  className?: string
}

export function ProductLaunchTimer({
  launchDate,
  productTitle,
  productImage,
  onNotify,
  className = ""
}: ProductLaunchTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [email, setEmail] = useState("")
  const [isNotified, setIsNotified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = launchDate.getTime()
      const difference = target - now

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [launchDate])

  const handleNotify = async () => {
    if (!email) return
    setIsSubmitting(true)
    try {
      await onNotify(email)
      setIsNotified(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl overflow-hidden ${className}`}>
      {productImage && (
        <div className="h-48 bg-black/20 flex items-center justify-center">
          <img src={productImage} alt={productTitle} className="max-h-full object-contain" />
        </div>
      )}

      <div className="p-6 text-white text-center">
        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
          Coming Soon
        </span>
        <h2 className="text-2xl font-bold mb-2">{productTitle}</h2>
        <p className="text-white/70 mb-6">Launching {launchDate.toLocaleDateString()}</p>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Mins" },
            { value: timeLeft.seconds, label: "Secs" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/10 rounded-lg p-3">
              <p className="text-3xl font-bold">{item.value.toString().padStart(2, "0")}</p>
              <p className="text-xs text-white/60">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Notify Form */}
        {isNotified ? (
          <div className="flex items-center justify-center gap-2 text-green-400">
            <Check className="w-5 h-5" />
            <span>We'll notify you when it launches!</span>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <Button
              onClick={handleNotify}
              disabled={isSubmitting || !email}
              className="bg-white text-purple-900 hover:bg-white/90"
            >
              <BellAlert className="w-4 h-4 mr-2" />
              Notify Me
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
