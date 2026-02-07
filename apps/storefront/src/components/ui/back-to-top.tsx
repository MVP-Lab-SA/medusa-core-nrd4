import * as React from "react"
import { ArrowUp } from "lucide-react"
import { clx } from "@medusajs/ui"

interface BackToTopProps {
  threshold?: number
  smooth?: boolean
  className?: string
}

export function BackToTop({
  threshold = 400,
  smooth = true,
  className
}: BackToTopProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
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
      behavior: smooth ? "smooth" : "auto"
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={clx(
        "fixed bottom-24 right-6 z-30 p-3 rounded-full transition-all duration-300",
        "bg-cyan-500 text-black shadow-lg shadow-cyan-500/25",
        "hover:bg-cyan-400 hover:scale-110",
        "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-zinc-900",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
        className
      )}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
