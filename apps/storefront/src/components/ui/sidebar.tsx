import * as React from "react"
import { X } from "lucide-react"
import { clx } from "@medusajs/ui"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  position?: "left" | "right"
  width?: string
  title?: string
  children: React.ReactNode
  className?: string
}

export function Sidebar({
  isOpen,
  onClose,
  position = "left",
  width = "w-80",
  title,
  children,
  className
}: SidebarProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={clx(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={clx(
          "fixed inset-y-0 z-50 flex flex-col bg-zinc-900 border-zinc-700 transition-transform duration-300 ease-out",
          width,
          position === "left" ? "left-0 border-r" : "right-0 border-l",
          position === "left"
            ? isOpen ? "translate-x-0" : "-translate-x-full"
            : isOpen ? "translate-x-0" : "translate-x-full",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          {title && <h2 className="text-lg font-semibold text-white">{title}</h2>}
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors ml-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </aside>
    </>
  )
}

interface SidebarSectionProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function SidebarSection({ title, children, className }: SidebarSectionProps) {
  return (
    <div className={clx("p-4 border-b border-zinc-800", className)}>
      {title && (
        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

interface SidebarItemProps {
  icon?: React.ReactNode
  label: string
  badge?: string | number
  active?: boolean
  onClick?: () => void
  className?: string
}

export function SidebarItem({
  icon,
  label,
  badge,
  active = false,
  onClick,
  className
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={clx(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left",
        active
          ? "bg-cyan-500/10 text-cyan-400"
          : "text-zinc-300 hover:bg-zinc-800 hover:text-white",
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-1 truncate">{label}</span>
      {badge !== undefined && (
        <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-xs">
          {badge}
        </span>
      )}
    </button>
  )
}
