import { useState, useEffect, useRef } from "react"
import { Link } from "@tanstack/react-router"
import { clx } from "@medusajs/ui"
import { XMark, ChevronLeft, ChevronRight } from "@medusajs/icons"

interface Announcement {
  id: string
  message: string
  link?: {
    text: string
    href: string
  }
  variant?: "default" | "success" | "warning" | "error"
}

interface AnnouncementBarProps {
  announcements: Announcement[]
  dismissible?: boolean
  autoRotate?: boolean
  rotateInterval?: number
  className?: string
  storageKey?: string
}

const variantStyles = {
  default: "bg-cyan-500 text-black",
  success: "bg-emerald-500 text-white",
  warning: "bg-amber-500 text-black",
  error: "bg-red-500 text-white",
}

export function AnnouncementBar({
  announcements,
  dismissible = true,
  autoRotate = true,
  rotateInterval = 5000,
  className,
  storageKey = "announcement-dismissed",
}: AnnouncementBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (dismissible && storageKey) {
      const dismissed = localStorage.getItem(storageKey)
      if (dismissed) {
        setIsDismissed(true)
      }
    }
  }, [dismissible, storageKey])

  useEffect(() => {
    if (autoRotate && announcements.length > 1 && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length)
      }, rotateInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoRotate, announcements.length, rotateInterval, isPaused])

  const handleDismiss = () => {
    setIsDismissed(true)
    if (storageKey) {
      localStorage.setItem(storageKey, "true")
    }
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length)
  }

  if (isDismissed || announcements.length === 0) return null

  const current = announcements[currentIndex]
  const variant = current.variant || "default"

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={clx(
        "relative py-2.5 px-4",
        variantStyles[variant],
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
        {announcements.length > 1 && (
          <button
            onClick={handlePrev}
            className="p-1 hover:opacity-70 transition-opacity"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        <p className="text-sm font-medium text-center">
          {current.message}
          {current.link && (
            <>
              {" "}
              <Link
                to={current.link.href}
                className="underline underline-offset-2 hover:no-underline font-semibold"
              >
                {current.link.text}
              </Link>
            </>
          )}
        </p>

        {announcements.length > 1 && (
          <button
            onClick={handleNext}
            className="p-1 hover:opacity-70 transition-opacity"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
            aria-label="Dismiss announcement"
          >
            <XMark className="w-4 h-4" />
          </button>
        )}
      </div>

      {announcements.length > 1 && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
          {announcements.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={clx(
                "w-1.5 h-1.5 rounded-full transition-opacity",
                index === currentIndex ? "opacity-100" : "opacity-40",
                variant === "default" ? "bg-black" : "bg-white"
              )}
              aria-label={`Go to announcement ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
