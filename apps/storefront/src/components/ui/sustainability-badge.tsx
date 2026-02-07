import { useState } from "react"
import { Leaf } from "@medusajs/icons"

interface SustainabilityBadgeProps {
  level: "eco" | "sustainable" | "recycled" | "organic" | "vegan" | "fair-trade"
  showDetails?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

const badgeConfig = {
  eco: {
    label: "Eco-Friendly",
    color: "bg-green-100 text-green-700 border-green-200",
    description: "Made with environmentally conscious practices"
  },
  sustainable: {
    label: "Sustainable",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    description: "Produced using sustainable methods and materials"
  },
  recycled: {
    label: "Recycled Materials",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    description: "Made from recycled or upcycled materials"
  },
  organic: {
    label: "Organic",
    color: "bg-lime-100 text-lime-700 border-lime-200",
    description: "Made with certified organic materials"
  },
  vegan: {
    label: "Vegan",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    description: "No animal products or by-products used"
  },
  "fair-trade": {
    label: "Fair Trade",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    description: "Ethically sourced with fair wages"
  }
}

export function SustainabilityBadge({
  level,
  showDetails = true,
  size = "md",
  className = ""
}: SustainabilityBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const config = badgeConfig[level]

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5"
  }

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <span
        className={`inline-flex items-center gap-1 rounded-full border font-medium ${config.color} ${sizeClasses[size]}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Leaf className={iconSizes[size]} />
        {config.label}
      </span>

      {showDetails && showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg z-10">
          {config.description}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      )}
    </div>
  )
}

interface SustainabilityScoreProps {
  score: number
  certifications?: string[]
  impact?: {
    co2Saved?: string
    waterSaved?: string
    wastePrevented?: string
  }
  className?: string
}

export function SustainabilityScore({
  score,
  certifications = [],
  impact,
  className = ""
}: SustainabilityScoreProps) {
  const getScoreColor = () => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-lime-600"
    if (score >= 40) return "text-yellow-600"
    return "text-orange-600"
  }

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Improvement"
  }

  return (
    <div className={`bg-green-50 rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="#E5E7EB"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className={getScoreColor()}
              strokeDasharray={`${(score / 100) * 175.9} 175.9`}
              strokeLinecap="round"
            />
          </svg>
          <span className={`absolute inset-0 flex items-center justify-center text-lg font-bold ${getScoreColor()}`}>
            {score}
          </span>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Sustainability Score</p>
          <p className={`text-sm font-medium ${getScoreColor()}`}>{getScoreLabel()}</p>
        </div>
      </div>

      {certifications.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Certifications</p>
          <div className="flex flex-wrap gap-1">
            {certifications.map((cert, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-white text-green-700 text-xs rounded border border-green-200"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      )}

      {impact && (
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-green-200">
          {impact.co2Saved && (
            <div className="text-center">
              <p className="text-lg font-semibold text-green-700">{impact.co2Saved}</p>
              <p className="text-xs text-green-600">CO2 Saved</p>
            </div>
          )}
          {impact.waterSaved && (
            <div className="text-center">
              <p className="text-lg font-semibold text-blue-700">{impact.waterSaved}</p>
              <p className="text-xs text-blue-600">Water Saved</p>
            </div>
          )}
          {impact.wastePrevented && (
            <div className="text-center">
              <p className="text-lg font-semibold text-amber-700">{impact.wastePrevented}</p>
              <p className="text-xs text-amber-600">Waste Prevented</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
