import { useState } from "react"
import { Button } from "./button"

interface FitFinderProps {
  onComplete: (measurements: Record<string, number>, recommendedSize: string) => void
  sizes: Array<{
    name: string
    chest: [number, number]
    waist: [number, number]
    hips: [number, number]
  }>
  unit?: "in" | "cm"
}

export function FitFinder({ onComplete, sizes, unit = "in" }: FitFinderProps) {
  const [measurements, setMeasurements] = useState({
    chest: "",
    waist: "",
    hips: ""
  })
  const [currentUnit, setCurrentUnit] = useState(unit)

  const convertToInches = (value: number, fromUnit: "in" | "cm"): number => {
    return fromUnit === "cm" ? value / 2.54 : value
  }

  const findBestSize = (): string | null => {
    const chest = parseFloat(measurements.chest)
    const waist = parseFloat(measurements.waist)
    const hips = parseFloat(measurements.hips)

    if (isNaN(chest) || isNaN(waist) || isNaN(hips)) return null

    const chestIn = convertToInches(chest, currentUnit)
    const waistIn = convertToInches(waist, currentUnit)
    const hipsIn = convertToInches(hips, currentUnit)

    for (const size of sizes) {
      if (
        chestIn >= size.chest[0] && chestIn <= size.chest[1] &&
        waistIn >= size.waist[0] && waistIn <= size.waist[1] &&
        hipsIn >= size.hips[0] && hipsIn <= size.hips[1]
      ) {
        return size.name
      }
    }

    // Find closest match
    let closestSize = sizes[0].name
    let minDiff = Infinity

    for (const size of sizes) {
      const chestMid = (size.chest[0] + size.chest[1]) / 2
      const waistMid = (size.waist[0] + size.waist[1]) / 2
      const hipsMid = (size.hips[0] + size.hips[1]) / 2

      const diff = Math.abs(chestIn - chestMid) + Math.abs(waistIn - waistMid) + Math.abs(hipsIn - hipsMid)
      
      if (diff < minDiff) {
        minDiff = diff
        closestSize = size.name
      }
    }

    return closestSize
  }

  const handleSubmit = () => {
    const recommendedSize = findBestSize()
    if (recommendedSize) {
      onComplete(
        {
          chest: parseFloat(measurements.chest),
          waist: parseFloat(measurements.waist),
          hips: parseFloat(measurements.hips)
        },
        recommendedSize
      )
    }
  }

  const isValid = measurements.chest && measurements.waist && measurements.hips

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Your Fit</h3>
      <p className="text-sm text-gray-600 mb-6">Enter your measurements for personalized size recommendations</p>

      {/* Unit Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setCurrentUnit("in")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentUnit === "in"
              ? "bg-cyan-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Inches
        </button>
        <button
          onClick={() => setCurrentUnit("cm")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentUnit === "cm"
              ? "bg-cyan-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Centimeters
        </button>
      </div>

      {/* Measurement Inputs */}
      <div className="space-y-4 mb-6">
        {[
          { key: "chest", label: "Chest", hint: "Measure around the fullest part" },
          { key: "waist", label: "Waist", hint: "Measure around your natural waistline" },
          { key: "hips", label: "Hips", hint: "Measure around the fullest part" }
        ].map(({ key, label, hint }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <div className="relative">
              <input
                type="number"
                value={measurements[key as keyof typeof measurements]}
                onChange={(e) => setMeasurements(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                {currentUnit}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{hint}</p>
          </div>
        ))}
      </div>

      {/* How to Measure */}
      <details className="mb-6">
        <summary className="text-sm text-cyan-600 cursor-pointer hover:text-cyan-700">
          How to measure yourself
        </summary>
        <div className="mt-3 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 space-y-2">
          <p><strong>Chest:</strong> Wrap the tape around the fullest part of your chest, keeping it parallel to the floor.</p>
          <p><strong>Waist:</strong> Measure around your natural waistline, which is the narrowest part of your torso.</p>
          <p><strong>Hips:</strong> Stand with feet together and measure around the fullest part of your hips.</p>
        </div>
      </details>

      <Button onClick={handleSubmit} disabled={!isValid} className="w-full">
        Find My Size
      </Button>
    </div>
  )
}
