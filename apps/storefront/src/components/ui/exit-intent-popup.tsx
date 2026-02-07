import { useState, useEffect, useCallback } from "react"
import { clx } from "@medusajs/ui"
import { XMark } from "@medusajs/icons"

interface ExitIntentPopupProps {
  children: React.ReactNode
  onClose?: () => void
  storageKey?: string
  delay?: number
  sensitivity?: number
  className?: string
  overlayClassName?: string
}

export function ExitIntentPopup({
  children,
  onClose,
  storageKey = "exit-popup-shown",
  delay = 0,
  sensitivity = 20,
  className,
  overlayClassName,
}: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  const handleClose = useCallback(() => {
    setIsVisible(false)
    onClose?.()
    if (storageKey) {
      sessionStorage.setItem(storageKey, "true")
    }
  }, [onClose, storageKey])

  useEffect(() => {
    // Check if already shown this session
    if (storageKey && sessionStorage.getItem(storageKey)) {
      setHasTriggered(true)
      return
    }

    let timeout: NodeJS.Timeout | null = null

    const handleMouseLeave = (e: MouseEvent) => {
      if (hasTriggered) return
      
      // Only trigger when mouse leaves through the top
      if (e.clientY <= sensitivity) {
        if (delay > 0) {
          timeout = setTimeout(() => {
            setIsVisible(true)
            setHasTriggered(true)
          }, delay)
        } else {
          setIsVisible(true)
          setHasTriggered(true)
        }
      }
    }

    const handleMouseEnter = () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [hasTriggered, delay, sensitivity, storageKey])

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={clx(
          "absolute inset-0 bg-black/70 backdrop-blur-sm",
          overlayClassName
        )}
        onClick={handleClose}
      />
      <div
        className={clx(
          "relative bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl max-w-lg w-full",
          "animate-in zoom-in-95 fade-in duration-300",
          className
        )}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-neutral-800 rounded-lg transition-colors z-10"
          aria-label="Close popup"
        >
          <XMark className="w-5 h-5 text-neutral-400" />
        </button>
        {children}
      </div>
    </div>
  )
}
