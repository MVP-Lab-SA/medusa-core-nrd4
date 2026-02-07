import { useState, useRef } from "react"
import { Button } from "./button"

interface WheelSegment {
  id: string
  label: string
  value: string
  color: string
  probability: number
}

interface SpinWheelProps {
  segments: WheelSegment[]
  onResult: (segment: WheelSegment) => void
  title?: string
  buttonText?: string
  className?: string
}

export function SpinWheel({
  segments,
  onResult,
  title = "Spin to Win!",
  buttonText = "Spin Now",
  className = ""
}: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<WheelSegment | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  const spin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)

    // Weighted random selection
    const totalProbability = segments.reduce((sum, s) => sum + s.probability, 0)
    let random = Math.random() * totalProbability
    let selectedSegment = segments[0]

    for (const segment of segments) {
      random -= segment.probability
      if (random <= 0) {
        selectedSegment = segment
        break
      }
    }

    const segmentIndex = segments.indexOf(selectedSegment)
    const segmentAngle = 360 / segments.length
    const targetAngle = 360 - (segmentIndex * segmentAngle) - (segmentAngle / 2)
    const spins = 5 + Math.random() * 3
    const finalRotation = rotation + (spins * 360) + targetAngle

    setRotation(finalRotation)

    setTimeout(() => {
      setIsSpinning(false)
      setResult(selectedSegment)
      onResult(selectedSegment)
    }, 4000)
  }

  const segmentAngle = 360 / segments.length

  return (
    <div className={`text-center ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

      <div className="relative inline-block mb-6">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-red-500" />
        </div>

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-72 h-72 rounded-full relative overflow-hidden border-4 border-gray-800 shadow-xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none"
          }}
        >
          {segments.map((segment, idx) => {
            const startAngle = idx * segmentAngle
            const skewY = 90 - segmentAngle

            return (
              <div
                key={segment.id}
                className="absolute w-1/2 h-1/2 origin-bottom-right"
                style={{
                  transform: `rotate(${startAngle}deg) skewY(-${skewY}deg)`,
                  backgroundColor: segment.color
                }}
              >
                <span
                  className="absolute text-white font-bold text-xs whitespace-nowrap"
                  style={{
                    transform: `skewY(${skewY}deg) rotate(${segmentAngle / 2}deg)`,
                    left: "50%",
                    top: "30%"
                  }}
                >
                  {segment.label}
                </span>
              </div>
            )
          })}
          {/* Center */}
          <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-800 rounded-full" />
          </div>
        </div>
      </div>

      {result ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
          <p className="text-lg font-bold text-green-800">Congratulations!</p>
          <p className="text-green-700">You won: <strong>{result.value}</strong></p>
        </div>
      ) : (
        <Button onClick={spin} disabled={isSpinning} size="lg" className="mb-4">
          {isSpinning ? "Spinning..." : buttonText}
        </Button>
      )}
    </div>
  )
}
