import { useState } from "react"
import { BellAlert, Check, Users } from "@medusajs/icons"
import { Button } from "./button"

interface WaitlistSignupProps {
  productTitle: string
  position?: number
  totalWaiting?: number
  onJoin: (email: string) => Promise<{ position: number }>
  className?: string
}

export function WaitlistSignup({
  productTitle,
  position,
  totalWaiting,
  onJoin,
  className = ""
}: WaitlistSignupProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [joinedPosition, setJoinedPosition] = useState<number | null>(position || null)
  const [error, setError] = useState("")

  const handleJoin = async () => {
    if (!email) {
      setError("Please enter your email")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const result = await onJoin(email)
      setJoinedPosition(result.position)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (joinedPosition) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-xl p-6 text-center ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">You're on the list!</h3>
        <p className="text-gray-600 mb-4">
          You're <strong>#{joinedPosition}</strong> on the waitlist for {productTitle}
        </p>
        <p className="text-sm text-gray-500">
          We'll email you as soon as it's available
        </p>
      </div>
    )
  }

  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-xl p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
          <BellAlert className="w-5 h-5 text-cyan-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Join the Waitlist</h3>
          <p className="text-sm text-gray-500">Be first to know when {productTitle} is back</p>
        </div>
      </div>

      {totalWaiting && (
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{totalWaiting.toLocaleString()} people are waiting</span>
        </div>
      )}

      <div className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
            error ? "border-red-300" : "border-gray-200"
          }`}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        
        <Button onClick={handleJoin} disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Joining..." : "Join Waitlist"}
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-3">
        We'll only email you about this product
      </p>
    </div>
  )
}
