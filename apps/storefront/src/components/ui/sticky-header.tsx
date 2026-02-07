import * as React from "react"
import { clx } from "@medusajs/ui"

interface StickyHeaderProps {
  children: React.ReactNode
  threshold?: number
  hideOnScrollDown?: boolean
  className?: string
  compactClassName?: string
}

export function StickyHeader({
  children,
  threshold = 100,
  hideOnScrollDown = false,
  className,
  compactClassName
}: StickyHeaderProps) {
  const [isSticky, setIsSticky] = React.useState(false)
  const [isHidden, setIsHidden] = React.useState(false)
  const lastScrollY = React.useRef(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setIsSticky(currentScrollY > threshold)

      if (hideOnScrollDown) {
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
  }, [threshold, hideOnScrollDown])

  return (
    <header
      className={clx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isSticky && "shadow-lg shadow-black/20",
        isSticky && compactClassName,
        isHidden && "-translate-y-full",
        className
      )}
    >
      {children}
    </header>
  )
}

interface StickyHeaderContextValue {
  isSticky: boolean
  isHidden: boolean
}

const StickyHeaderContext = React.createContext<StickyHeaderContextValue>({
  isSticky: false,
  isHidden: false
})

export function useStickyHeader() {
  return React.useContext(StickyHeaderContext)
}

interface StickyHeaderProviderProps {
  children: React.ReactNode
  threshold?: number
  hideOnScrollDown?: boolean
}

export function StickyHeaderProvider({
  children,
  threshold = 100,
  hideOnScrollDown = false
}: StickyHeaderProviderProps) {
  const [isSticky, setIsSticky] = React.useState(false)
  const [isHidden, setIsHidden] = React.useState(false)
  const lastScrollY = React.useRef(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setIsSticky(currentScrollY > threshold)

      if (hideOnScrollDown) {
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
  }, [threshold, hideOnScrollDown])

  return (
    <StickyHeaderContext.Provider value={{ isSticky, isHidden }}>
      {children}
    </StickyHeaderContext.Provider>
  )
}
