import { ChevronDownMini } from "@medusajs/icons"
import { useState } from "react"

interface Material {
  name: string
  percentage: number
  description?: string
  properties?: string[]
  icon?: React.ReactNode
}

interface MaterialInfoProps {
  materials: Material[]
  careInstructions?: string[]
  sustainability?: {
    score: number
    certifications?: string[]
    description?: string
  }
  className?: string
}

export function MaterialInfo({
  materials,
  careInstructions,
  sustainability,
  className = ""
}: MaterialInfoProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`bg-gray-50 rounded-xl p-4 ${className}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full"
      >
        <h3 className="font-medium text-gray-900">Materials & Care</h3>
        <ChevronDownMini
          className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div className="mt-4 space-y-6">
          {/* Material Composition */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Composition</h4>
            <div className="space-y-3">
              {materials.map((material, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-900">{material.name}</span>
                    <span className="text-sm font-medium text-gray-700">{material.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-cyan-500 h-2 rounded-full"
                      style={{ width: `${material.percentage}%` }}
                    />
                  </div>
                  {material.description && (
                    <p className="text-xs text-gray-500 mt-1">{material.description}</p>
                  )}
                  {material.properties && material.properties.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {material.properties.map((prop, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-white text-xs text-gray-600 rounded"
                        >
                          {prop}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Care Instructions */}
          {careInstructions && careInstructions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Care Instructions</h4>
              <div className="flex flex-wrap gap-3">
                {careInstructions.map((instruction, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg"
                  >
                    <CareIcon instruction={instruction} />
                    <span className="text-sm text-gray-600">{instruction}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sustainability */}
          {sustainability && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Sustainability</h4>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#E5E7EB"
                        strokeWidth="4"
                        fill="none"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#22C55E"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${(sustainability.score / 100) * 125.6} 125.6`}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-green-600">
                      {sustainability.score}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Eco Score</p>
                    <p className="text-sm text-green-600">
                      {sustainability.score >= 80
                        ? "Excellent"
                        : sustainability.score >= 60
                        ? "Good"
                        : "Average"}
                    </p>
                  </div>
                </div>

                {sustainability.description && (
                  <p className="text-sm text-green-700 mb-3">{sustainability.description}</p>
                )}

                {sustainability.certifications && sustainability.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {sustainability.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CareIcon({ instruction }: { instruction: string }) {
  const lower = instruction.toLowerCase()
  
  if (lower.includes("wash")) {
    return (
      <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 12h12l3-12M3 6h18M7 6V4a2 2 0 012-2h6a2 2 0 012 2v2" />
      </svg>
    )
  }
  if (lower.includes("dry")) {
    return (
      <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
        <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
      </svg>
    )
  }
  if (lower.includes("iron")) {
    return (
      <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 14h16l-2 6H6l-2-6zm4-4V6a2 2 0 012-2h4a2 2 0 012 2v4" />
      </svg>
    )
  }
  if (lower.includes("bleach")) {
    return (
      <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l2 7h7l-5.5 4 2 7-5.5-4-5.5 4 2-7L3 9h7l2-7z" />
      </svg>
    )
  }
  
  return (
    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
    </svg>
  )
}
