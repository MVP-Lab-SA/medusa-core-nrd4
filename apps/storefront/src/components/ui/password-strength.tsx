import { Check, XMark } from "@medusajs/icons"

interface PasswordStrengthProps {
  password: string
  showRequirements?: boolean
  className?: string
}

export function PasswordStrength({
  password,
  showRequirements = true,
  className = ""
}: PasswordStrengthProps) {
  const requirements = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
    { label: "One number", test: (p: string) => /\d/.test(p) },
    { label: "One special character", test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) }
  ]

  const passedRequirements = requirements.filter(req => req.test(password)).length
  const strength = passedRequirements / requirements.length

  const getStrengthLabel = () => {
    if (strength === 0) return ""
    if (strength <= 0.4) return "Weak"
    if (strength <= 0.6) return "Fair"
    if (strength <= 0.8) return "Good"
    return "Strong"
  }

  const getStrengthColor = () => {
    if (strength <= 0.4) return "bg-red-500"
    if (strength <= 0.6) return "bg-yellow-500"
    if (strength <= 0.8) return "bg-blue-500"
    return "bg-green-500"
  }

  if (!password) return null

  return (
    <div className={className}>
      {/* Strength Bar */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getStrengthColor()} transition-all`}
            style={{ width: `${strength * 100}%` }}
          />
        </div>
        <span className={`text-xs font-medium ${
          strength <= 0.4 ? "text-red-500" :
          strength <= 0.6 ? "text-yellow-500" :
          strength <= 0.8 ? "text-blue-500" : "text-green-500"
        }`}>
          {getStrengthLabel()}
        </span>
      </div>

      {/* Requirements */}
      {showRequirements && (
        <ul className="space-y-1">
          {requirements.map((req, idx) => {
            const passed = req.test(password)
            return (
              <li key={idx} className={`flex items-center gap-2 text-xs ${passed ? "text-green-600" : "text-gray-400"}`}>
                {passed ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <XMark className="w-3 h-3" />
                )}
                {req.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
