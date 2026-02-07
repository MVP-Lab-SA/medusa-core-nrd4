import { useState, useEffect } from "react"
import { clx } from "@medusajs/ui"

interface CountdownTimerProps {
  targetDate: Date
  onComplete?: () => void
  variant?: "default" | "compact" | "large"
  showLabels?: boolean
  className?: string
  label?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({
  targetDate,
  onComplete,
  variant = "default",
  showLabels = true,
  className,
  label,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft | null => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference <= 0) {
        return null
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)

      if (!newTimeLeft && !isComplete) {
        setIsComplete(true)
        onComplete?.()
        clearInterval(timer)
      }
    }, 1000)

    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [targetDate, onComplete, isComplete])

  if (!timeLeft) {
    return null
  }

  const formatNumber = (num: number) => num.toString().padStart(2, "0")

  const TimeUnit = ({ value, label: unitLabel }: { value: number; label: string }) => {
    if (variant === "compact") {
      return (
        <span className="text-cyan-400 font-mono font-bold">
          {formatNumber(value)}
        </span>
      )
    }

    if (variant === "large") {
      return (
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-24 bg-neutral-800 rounded-xl flex items-center justify-center border border-neutral-700">
              <span className="text-4xl font-bold text-white font-mono">
                {formatNumber(value)}
              </span>
            </div>
            <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-700" />
          </div>
          {showLabels && (
            <span className="text-xs text-neutral-500 mt-2 uppercase tracking-wider">
              {unitLabel}
            </span>
          )}
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-700">
          <span className="text-xl font-bold text-white font-mono">
            {formatNumber(value)}
          </span>
        </div>
        {showLabels && (
          <span className="text-[10px] text-neutral-500 mt-1 uppercase">
            {unitLabel}
          </span>
        )}
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className={clx("flex items-center gap-1 font-mono", className)}>
        {label && <span className="text-neutral-400 mr-2">{label}</span>}
        <TimeUnit value={timeLeft.days} label="d" />
        <span className="text-neutral-600">:</span>
        <TimeUnit value={timeLeft.hours} label="h" />
        <span className="text-neutral-600">:</span>
        <TimeUnit value={timeLeft.minutes} label="m" />
        <span className="text-neutral-600">:</span>
        <TimeUnit value={timeLeft.seconds} label="s" />
      </div>
    )
  }

  return (
    <div className={className}>
      {label && (
        <p className="text-center text-neutral-400 mb-4 text-sm uppercase tracking-wider">
          {label}
        </p>
      )}
      <div className={clx(
        "flex items-center justify-center",
        variant === "large" ? "gap-4" : "gap-2"
      )}>
        <TimeUnit value={timeLeft.days} label="Days" />
        <span className={clx(
          "text-neutral-600 font-bold",
          variant === "large" ? "text-3xl" : "text-xl"
        )}>:</span>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <span className={clx(
          "text-neutral-600 font-bold",
          variant === "large" ? "text-3xl" : "text-xl"
        )}>:</span>
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <span className={clx(
          "text-neutral-600 font-bold",
          variant === "large" ? "text-3xl" : "text-xl"
        )}>:</span>
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  )
}
