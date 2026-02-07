import { useState, useEffect, useRef } from "react"
import { clx } from "@medusajs/ui"

interface StickyHeaderProps {
  children: React.ReactNode
  threshold?: number
  hideOnScroll?: boolean
  className?: string
  stickyClassName?: string
}

export function StickyHeader({
  children,
  threshold = 100,
  hideOnScroll = false,
  className,
  stickyClassName,
}: StickyHeaderProps) {
  const [isSticky, setIsSticky] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if sticky
      setIsSticky(currentScrollY > threshold)

      // Hide on scroll down, show on scroll up
      if (hideOnScroll) {
        if (currentScrollY > lastScrollY.current && currentScrollY > threshold) {
          setIsHidden(true)
        } else {
          setIsHidden(false)
        }
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold, hideOnScroll])

  return (
    <header
      ref={headerRef}
      className={clx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isSticky ? stickyClassName || "bg-neutral-900/95 backdrop-blur-lg shadow-lg" : className,
        hideOnScroll && isHidden && "-translate-y-full"
      )}
    >
      {children}
    </header>
  )
}
