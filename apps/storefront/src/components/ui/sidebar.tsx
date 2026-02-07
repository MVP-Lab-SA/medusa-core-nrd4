import { useState, useEffect } from "react"
import { clx } from "@medusajs/ui"
import { XMark } from "@medusajs/icons"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  position?: "left" | "right"
  width?: string
  title?: string
  children: React.ReactNode
  className?: string
  showOverlay?: boolean
}

export function Sidebar({
  isOpen,
  onClose,
  position = "left",
  width = "320px",
  title,
  children,
  className,
  showOverlay = true,
}: SidebarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
    } else {
      setIsAnimating(false)
      const timeout = setTimeout(() => {
        setIsVisible(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50">
      {showOverlay && (
        <div
          className={clx(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            isAnimating ? "opacity-100" : "opacity-0"
          )}
          onClick={onClose}
        />
      )}

      <aside
        style={{ width }}
        className={clx(
          "absolute top-0 bottom-0 bg-neutral-900 border-neutral-700 shadow-2xl",
          "flex flex-col transition-transform duration-300 ease-out",
          position === "left" ? "left-0 border-r" : "right-0 border-l",
          position === "left"
            ? isAnimating
              ? "translate-x-0"
              : "-translate-x-full"
            : isAnimating
            ? "translate-x-0"
            : "translate-x-full",
          className
        )}
      >
        {title && (
          <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <XMark className="w-5 h-5 text-neutral-400" />
            </button>
          </header>
        )}

        <div className="flex-1 overflow-y-auto">{children}</div>
      </aside>
    </div>
  )
}
