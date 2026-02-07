import { clsx } from "clsx"
import { useEffect, useRef, useState } from "react"

interface PopoverProps {
  trigger: React.ReactNode
  children: React.ReactNode
  position?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  className?: string
}

export const Popover = ({
  trigger,
  children,
  position = "bottom",
  align = "center",
  className,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
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
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  }

  const alignClasses = {
    start: position === "top" || position === "bottom" ? "left-0" : "top-0",
    center:
      position === "top" || position === "bottom"
        ? "left-1/2 -translate-x-1/2"
        : "top-1/2 -translate-y-1/2",
    end: position === "top" || position === "bottom" ? "right-0" : "bottom-0",
  }

  return (
    <div className="relative inline-block">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          className={clsx(
            "absolute z-50 min-w-[200px] bg-city-navy border border-city-steel/30 rounded-lg shadow-xl p-4",
            positionClasses[position],
            alignClasses[align],
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Popover
