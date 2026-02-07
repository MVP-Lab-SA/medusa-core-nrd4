import { useState, useEffect } from "react"
import { XMark, GiftSolid, Check } from "@medusajs/icons"
import { Button } from "./button"

interface WelcomeDiscountProps {
  discount: string
  discountCode: string
  delay?: number
  onClose: () => void
  onSubmit: (email: string) => Promise<void>
  className?: string
}

export function WelcomeDiscount({
  discount,
  discountCode,
  delay = 3000,
  onClose,
  onSubmit,
  className = ""
}: WelcomeDiscountProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("welcomePopupSeen")
      if (!hasSeenPopup) {
        setIsVisible(true)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("welcomePopupSeen", "true")
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Please enter your email")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      await onSubmit(email)
      setIsSubmitted(true)
      localStorage.setItem("welcomePopupSeen", "true")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      
      <div className={`relative bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl ${className}`}>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
        >
          <XMark className="w-5 h-5 text-gray-500" />
        </button>

        {/* Decorative header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-center text-white">
          <GiftSolid className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">{discount} OFF</h2>
          <p className="text-white/90">Your first order</p>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">You're all set!</h3>
              <p className="text-gray-600 mb-4">
                Use code <strong className="text-cyan-600">{discountCode}</strong> at checkout
              </p>
              <Button onClick={handleClose} className="w-full">
                Start Shopping
              </Button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                Welcome to CityOS!
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Sign up for our newsletter and get {discount} off your first order
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      error ? "border-red-300" : "border-gray-200"
                    }`}
                  />
                  {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Subscribing..." : "Get My Discount"}
                </Button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                By signing up, you agree to receive marketing emails. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
