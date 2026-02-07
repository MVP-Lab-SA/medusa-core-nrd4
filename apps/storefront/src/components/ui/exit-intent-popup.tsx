import * as React from "react"
import { X } from "lucide-react"
import { clx } from "@medusajs/ui"

interface ExitIntentPopupProps {
  title: string
  subtitle?: string
  image?: string
  children: React.ReactNode
  delay?: number
  cookieName?: string
  cookieDays?: number
  className?: string
}

export function ExitIntentPopup({
  title,
  subtitle,
  image,
  children,
  delay = 0,
  cookieName = "exit_intent_shown",
  cookieDays = 7,
  className
}: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [hasTriggered, setHasTriggered] = React.useState(false)

  React.useEffect(() => {
    // Check if popup was already shown
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${cookieName}=`))
    
    if (cookie) {
      setHasTriggered(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        if (delay > 0) {
          setTimeout(() => setIsOpen(true), delay)
        } else {
          setIsOpen(true)
        }
        setHasTriggered(true)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [hasTriggered, delay, cookieName])

  const handleClose = () => {
    setIsOpen(false)
    // Set cookie to prevent showing again
    const expires = new Date()
    expires.setDate(expires.getDate() + cookieDays)
    document.cookie = `${cookieName}=true; expires=${expires.toUTCString()}; path=/`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div
        className={clx(
          "relative w-full max-w-lg rounded-2xl overflow-hidden",
          "bg-zinc-900 border border-zinc-700 shadow-2xl",
          "animate-in fade-in zoom-in-95 duration-300",
          className
        )}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
          </div>
        )}

        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          {subtitle && (
            <p className="text-zinc-400 mb-6">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
