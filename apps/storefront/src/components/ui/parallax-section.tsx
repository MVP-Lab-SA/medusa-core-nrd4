import { useEffect, useRef, useState } from "react"

interface ParallaxSectionProps {
  backgroundImage: string
  speed?: number
  height?: string
  overlay?: boolean
  overlayOpacity?: number
  children: React.ReactNode
  className?: string
}

export function ParallaxSection({
  backgroundImage,
  speed = 0.5,
  height = "400px",
  overlay = true,
  overlayOpacity = 0.4,
  children,
  className = ""
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrolled = window.innerHeight - rect.top
      setOffset(scrolled * speed)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(${offset}px)`,
          height: `calc(100% + ${Math.abs(offset) * 2}px)`,
          top: `-${Math.abs(offset)}px`
        }}
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
