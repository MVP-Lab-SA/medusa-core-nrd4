import { useState } from "react"
import { ExclamationCircle } from "@medusajs/icons"

interface AgeGateProps {
  minAge: number
  onVerified: () => void
  onDenied: () => void
}

export function AgeGate({ minAge, onVerified, onDenied }: AgeGateProps) {
  const [birthDate, setBirthDate] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleVerify = () => {
    if (!birthDate) {
      setError("Please enter your date of birth")
      return
    }

    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }

    if (age >= minAge) {
      onVerified()
    } else {
      setError(`You must be at least ${minAge} years old to access this content`)
      onDenied()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ExclamationCircle className="w-8 h-8 text-yellow-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Age Verification Required</h2>
        <p className="text-gray-600 mb-6">
          You must be at least {minAge} years old to view this content.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Date of Birth
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => {
              setBirthDate(e.target.value)
              setError(null)
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleVerify}
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Verify My Age
        </button>

        <p className="text-xs text-gray-500 mt-4">
          By clicking verify, you confirm that the information provided is accurate.
        </p>
      </div>
    </div>
  )
}
