import { useEffect, useRef } from "react"

interface FocusTrapProps {
  children: React.ReactNode
  active?: boolean
  initialFocus?: boolean
  returnFocus?: boolean
}

export function FocusTrap({
  children,
  active = true,
  initialFocus = true,
  returnFocus = true
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<Element | null>(null)

  useEffect(() => {
    if (!active) return

    previousActiveElement.current = document.activeElement

    const container = containerRef.current
    if (!container) return

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    if (initialFocus && firstElement) {
      firstElement.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    container.addEventListener("keydown", handleKeyDown)

    return () => {
      container.removeEventListener("keydown", handleKeyDown)
      
      if (returnFocus && previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus()
      }
    }
  }, [active, initialFocus, returnFocus])

  return <div ref={containerRef}>{children}</div>
}
