import { useState, useEffect } from "react"

interface CountdownTimerProps {
  endDate: string
  variant?: "dark" | "light"
  onComplete?: () => void
}

export function CountdownTimer({ endDate, variant = "dark", onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - Date.now()
      
      if (difference <= 0) {
        onComplete?.()
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)

    return () => clearInterval(timer)
  }, [endDate, onComplete])

  const bgColor = variant === "light" ? "bg-white/20" : "bg-gray-900"
  const textColor = variant === "light" ? "text-white" : "text-white"
  const labelColor = variant === "light" ? "text-white/80" : "text-gray-400"

  return (
    <div className="flex gap-2">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hrs" },
        { value: timeLeft.minutes, label: "Min" },
        { value: timeLeft.seconds, label: "Sec" },
      ].map((item) => (
        <div key={item.label} className={`${bgColor} rounded-lg px-3 py-2 text-center min-w-[50px]`}>
          <div className={`text-xl font-bold ${textColor}`}>
            {String(item.value).padStart(2, "0")}
          </div>
          <div className={`text-xs ${labelColor}`}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}
