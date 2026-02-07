import { useState, useRef, useEffect } from "react"
import { GiftSolid } from "@medusajs/icons"

interface ScratchCardProps {
  prize: string
  prizeDescription?: string
  coverImage?: string
  width?: number
  height?: number
  brushSize?: number
  revealThreshold?: number
  onReveal: (prize: string) => void
  className?: string
}

export function ScratchCard({
  prize,
  prizeDescription,
  coverImage,
  width = 300,
  height = 150,
  brushSize = 30,
  revealThreshold = 50,
  onReveal,
  className = ""
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isScratching, setIsScratching] = useState(false)
  const [scratchPercentage, setScratchPercentage] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Fill with cover
    if (coverImage) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height)
      }
      img.src = coverImage
    } else {
      // Gradient cover
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "#6366f1")
      gradient.addColorStop(1, "#8b5cf6")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Add text
      ctx.fillStyle = "white"
      ctx.font = "bold 18px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("Scratch to Reveal!", width / 2, height / 2 + 6)
    }
  }, [coverImage, width, height])

  const calculateScratchPercentage = () => {
    const canvas = canvasRef.current
    if (!canvas) return 0

    const ctx = canvas.getContext("2d")
    if (!ctx) return 0

    const imageData = ctx.getImageData(0, 0, width, height)
    const pixels = imageData.data
    let transparent = 0

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++
    }

    return (transparent / (pixels.length / 4)) * 100
  }

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRevealed) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e 
      ? e.touches[0].clientX - rect.left 
      : e.clientX - rect.left
    const y = "touches" in e 
      ? e.touches[0].clientY - rect.top 
      : e.clientY - rect.top

    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x, y, brushSize, 0, Math.PI * 2)
    ctx.fill()

    const percentage = calculateScratchPercentage()
    setScratchPercentage(percentage)

    if (percentage >= revealThreshold && !isRevealed) {
      setIsRevealed(true)
      onReveal(prize)
    }
  }

  return (
    <div className={`inline-block ${className}`}>
      <div className="relative" style={{ width, height }}>
        {/* Prize Layer */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex flex-col items-center justify-center"
          style={{ width, height }}
        >
          <GiftSolid className="w-10 h-10 text-yellow-600 mb-2" />
          <p className="text-2xl font-bold text-yellow-800">{prize}</p>
          {prizeDescription && (
            <p className="text-sm text-yellow-700">{prizeDescription}</p>
          )}
        </div>

        {/* Scratch Layer */}
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className={`absolute inset-0 rounded-xl ${isScratching ? "cursor-grabbing" : "cursor-grab"}`}
          onMouseDown={() => setIsScratching(true)}
          onMouseUp={() => setIsScratching(false)}
          onMouseLeave={() => setIsScratching(false)}
          onMouseMove={(e) => isScratching && scratch(e)}
          onTouchStart={() => setIsScratching(true)}
          onTouchEnd={() => setIsScratching(false)}
          onTouchMove={scratch}
        />
      </div>

      {isRevealed && (
        <p className="text-center text-sm text-green-600 font-medium mt-2">
          Congratulations! You won {prize}!
        </p>
      )}

      {!isRevealed && (
        <p className="text-center text-xs text-gray-500 mt-2">
          Scratch the card to reveal your prize
        </p>
      )}
    </div>
  )
}
