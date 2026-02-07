import * as React from "react"
import { Clock } from "lucide-react"
import { clx } from "@medusajs/ui"

interface TimePickerProps {
  value?: string
  onChange?: (time: string) => void
  placeholder?: string
  disabled?: boolean
  use24Hour?: boolean
  minuteStep?: number
  className?: string
}

export function TimePicker({
  value,
  onChange,
  placeholder = "Select time",
  disabled = false,
  use24Hour = false,
  minuteStep = 15,
  className
}: TimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const hours = use24Hour
    ? Array.from({ length: 24 }, (_, i) => i)
    : Array.from({ length: 12 }, (_, i) => i + 1)

  const minutes = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep)

  const [selectedHour, setSelectedHour] = React.useState<number | null>(null)
  const [selectedMinute, setSelectedMinute] = React.useState<number | null>(null)
  const [selectedPeriod, setSelectedPeriod] = React.useState<"AM" | "PM">("AM")

  React.useEffect(() => {
    if (value) {
      const [hourStr, minuteStr] = value.split(":")
      let hour = parseInt(hourStr, 10)
      const minute = parseInt(minuteStr, 10)
      
      if (!use24Hour) {
        if (hour >= 12) {
          setSelectedPeriod("PM")
          if (hour > 12) hour -= 12
        } else {
          setSelectedPeriod("AM")
          if (hour === 0) hour = 12
        }
      }
      setSelectedHour(hour)
      setSelectedMinute(minute)
    }
  }, [value, use24Hour])

  const handleSelect = (hour: number, minute: number, period?: "AM" | "PM") => {
    let finalHour = hour
    if (!use24Hour) {
      const p = period || selectedPeriod
      if (p === "PM" && hour !== 12) finalHour += 12
      if (p === "AM" && hour === 12) finalHour = 0
    }
    const timeStr = `${finalHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
    onChange?.(timeStr)
    setIsOpen(false)
  }

  const formatTime = (time: string) => {
    const [hourStr, minuteStr] = time.split(":")
    let hour = parseInt(hourStr, 10)
    const minute = minuteStr

    if (use24Hour) {
      return `${hour.toString().padStart(2, "0")}:${minute}`
    }

    const period = hour >= 12 ? "PM" : "AM"
    if (hour > 12) hour -= 12
    if (hour === 0) hour = 12
    return `${hour}:${minute} ${period}`
  }

  return (
    <div ref={containerRef} className={clx("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={clx(
          "w-full px-4 py-3 text-left rounded-lg border transition-all flex items-center gap-3",
          "bg-zinc-900 border-zinc-700 text-white",
          "hover:border-cyan-500/50 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30",
          disabled && "opacity-50 cursor-not-allowed",
          isOpen && "border-cyan-500 ring-1 ring-cyan-500/30"
        )}
      >
        <Clock className="w-5 h-5 text-zinc-500" />
        <span className={value ? "text-white" : "text-zinc-500"}>
          {value ? formatTime(value) : placeholder}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 font-medium mb-2 text-center">Hour</span>
              <div className="h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">
                {hours.map((hour) => (
                  <button
                    key={hour}
                    type="button"
                    onClick={() => setSelectedHour(hour)}
                    className={clx(
                      "w-12 py-2 text-center rounded-lg transition-colors",
                      selectedHour === hour
                        ? "bg-cyan-500 text-black font-medium"
                        : "text-white hover:bg-zinc-800"
                    )}
                  >
                    {hour.toString().padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 font-medium mb-2 text-center">Min</span>
              <div className="h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">
                {minutes.map((minute) => (
                  <button
                    key={minute}
                    type="button"
                    onClick={() => setSelectedMinute(minute)}
                    className={clx(
                      "w-12 py-2 text-center rounded-lg transition-colors",
                      selectedMinute === minute
                        ? "bg-cyan-500 text-black font-medium"
                        : "text-white hover:bg-zinc-800"
                    )}
                  >
                    {minute.toString().padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>

            {!use24Hour && (
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500 font-medium mb-2 text-center">Period</span>
                <div className="flex flex-col gap-2">
                  {(["AM", "PM"] as const).map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => setSelectedPeriod(period)}
                      className={clx(
                        "w-12 py-2 text-center rounded-lg transition-colors",
                        selectedPeriod === period
                          ? "bg-cyan-500 text-black font-medium"
                          : "text-white hover:bg-zinc-800"
                      )}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              if (selectedHour !== null && selectedMinute !== null) {
                handleSelect(selectedHour, selectedMinute, selectedPeriod)
              }
            }}
            disabled={selectedHour === null || selectedMinute === null}
            className={clx(
              "w-full mt-4 py-2 rounded-lg font-medium transition-colors",
              selectedHour !== null && selectedMinute !== null
                ? "bg-cyan-500 text-black hover:bg-cyan-400"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
            )}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  )
}
