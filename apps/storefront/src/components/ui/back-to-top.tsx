import { useState, useEffect } from "react"
import { clx } from "@medusajs/ui"
import { ArrowUpMini } from "@medusajs/icons"

interface BackToTopProps {
  threshold?: number
  smooth?: boolean
  className?: string
}

export function BackToTop({
  threshold = 400,
  smooth = true,
  className,
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? "smooth" : "auto",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={clx(
        "fixed bottom-24 right-6 z-40 md:bottom-8",
        "w-12 h-12 flex items-center justify-center",
        "bg-cyan-500 hover:bg-cyan-400 text-black rounded-full",
        "shadow-lg shadow-cyan-500/25",
        "transition-all duration-300",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
        className
      )}
    >
      <ArrowUpMini className="w-5 h-5" />
    </button>
  )
}
