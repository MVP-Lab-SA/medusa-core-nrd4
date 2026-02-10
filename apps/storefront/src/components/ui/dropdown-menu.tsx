import { clsx } from "clsx"
import { useEffect, useRef, useState } from "react"

interface DropdownMenuItem {
  id: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  danger?: boolean
  onClick?: () => void
}

interface DropdownMenuProps {
  trigger: React.ReactNode
  items: DropdownMenuItem[]
  position?: "bottom-start" | "bottom-end" | "top-start" | "top-end"
  className?: string
}

export const DropdownMenu = ({
  trigger,
  items,
  position = "bottom-start",
  className,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const positionClasses = {
    "bottom-start": "top-full left-0 mt-1",
    "bottom-end": "top-full right-0 mt-1",
    "top-start": "bottom-full left-0 mb-1",
    "top-end": "bottom-full right-0 mb-1",
  }

  const handleItemClick = (item: DropdownMenuItem) => {
    if (item.disabled) return
    item.onClick?.()
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className={clsx(
            "absolute z-50 min-w-[180px] bg-city-navy border border-city-steel/30 rounded-lg shadow-xl py-1 overflow-hidden",
            positionClasses[position],
            className
          )}
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors",
                item.disabled && "opacity-50 cursor-not-allowed",
                item.danger
                  ? "text-rose-400 hover:bg-rose-500/10"
                  : "text-city-gray hover:bg-city-steel/30 hover:text-city-white",
                !item.disabled && "cursor-pointer"
              )}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
