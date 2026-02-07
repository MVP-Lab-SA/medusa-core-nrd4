import * as React from "react"
import { clx } from "@medusajs/ui"

interface CountdownTimerProps {
  targetDate: Date
  onComplete?: () => void
  showDays?: boolean
  showLabels?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "compact" | "minimal"
  className?: string
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
  showDays = true,
  showLabels = true,
  size = "md",
  variant = "default",
  className
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isComplete, setIsComplete] = React.useState(false)

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference <= 0) {
        setIsComplete(true)
        onComplete?.()
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete])

  const sizeClasses = {
    sm: { box: "w-12 h-12", number: "text-lg", label: "text-[10px]" },
    md: { box: "w-16 h-16", number: "text-2xl", label: "text-xs" },
    lg: { box: "w-20 h-20", number: "text-3xl", label: "text-sm" }
  }

  const formatNumber = (num: number) => num.toString().padStart(2, "0")

  if (isComplete) {
    return (
      <div className={clx("text-center text-cyan-400 font-bold", className)}>
        Sale Ended
      </div>
    )
  }

  if (variant === "minimal") {
    return (
      <div className={clx("font-mono text-white", className)}>
        {showDays && `${formatNumber(timeLeft.days)}:`}
        {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className={clx("flex items-center gap-1 font-mono", className)}>
        {showDays && (
          <>
            <span className="text-white">{formatNumber(timeLeft.days)}</span>
            <span className="text-zinc-500">d</span>
          </>
        )}
        <span className="text-white">{formatNumber(timeLeft.hours)}</span>
        <span className="text-zinc-500">h</span>
        <span className="text-white">{formatNumber(timeLeft.minutes)}</span>
        <span className="text-zinc-500">m</span>
        <span className="text-white">{formatNumber(timeLeft.seconds)}</span>
        <span className="text-zinc-500">s</span>
      </div>
    )
  }

  const timeUnits = [
    ...(showDays ? [{ value: timeLeft.days, label: "Days" }] : []),
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" }
  ]

  return (
    <div className={clx("flex items-center gap-3", className)}>
      {timeUnits.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center">
            <div
              className={clx(
                "flex items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700",
                sizeClasses[size].box
              )}
            >
              <span className={clx("font-bold text-white font-mono", sizeClasses[size].number)}>
                {formatNumber(unit.value)}
              </span>
            </div>
            {showLabels && (
              <span className={clx("mt-1 text-zinc-500 uppercase tracking-wider", sizeClasses[size].label)}>
                {unit.label}
              </span>
            )}
          </div>
          {index < timeUnits.length - 1 && (
            <span className={clx("text-cyan-500 font-bold self-start mt-3", sizeClasses[size].number)}>
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
