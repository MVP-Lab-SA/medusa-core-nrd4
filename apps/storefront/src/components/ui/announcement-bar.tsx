import * as React from "react"
import { Link } from "@tanstack/react-router"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { clx } from "@medusajs/ui"

interface Announcement {
  id: string
  text: string
  link?: string
  linkText?: string
}

interface AnnouncementBarProps {
  announcements: Announcement[]
  dismissible?: boolean
  autoRotate?: boolean
  rotateInterval?: number
  className?: string
}

export function AnnouncementBar({
  announcements,
  dismissible = true,
  autoRotate = true,
  rotateInterval = 5000,
  className
}: AnnouncementBarProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isDismissed, setIsDismissed] = React.useState(false)

  React.useEffect(() => {
    if (!autoRotate || announcements.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, rotateInterval)

    return () => clearInterval(interval)
  }, [autoRotate, announcements.length, rotateInterval])

  if (isDismissed || announcements.length === 0) return null

  const currentAnnouncement = announcements[currentIndex]

  const goToPrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? announcements.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length)
  }

  return (
    <div
      className={clx(
        "relative bg-cyan-500 text-black py-2 px-4",
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-center gap-4">
        {announcements.length > 1 && (
          <button
            onClick={goToPrev}
            className="p-1 rounded hover:bg-black/10 transition-colors"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        <div className="flex-1 text-center">
          <span className="text-sm font-medium">
            {currentAnnouncement.text}
          </span>
          {currentAnnouncement.link && (
            <Link
              to={currentAnnouncement.link}
              className="ml-2 text-sm font-bold underline underline-offset-2 hover:no-underline"
            >
              {currentAnnouncement.linkText || "Learn more"}
            </Link>
          )}
        </div>

        {announcements.length > 1 && (
          <button
            onClick={goToNext}
            className="p-1 rounded hover:bg-black/10 transition-colors"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {dismissible && (
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/10 transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {announcements.length > 1 && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1 pb-0.5">
          {announcements.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={clx(
                "w-1.5 h-1.5 rounded-full transition-colors",
                index === currentIndex ? "bg-black" : "bg-black/30"
              )}
              aria-label={`Go to announcement ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
