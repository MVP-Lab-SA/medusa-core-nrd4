import { Link } from "@tanstack/react-router"
import { User, ShoppingBag } from "@medusajs/icons"
import { Button } from "./button"

interface GuestCheckoutPromptProps {
  onContinueAsGuest: () => void
  onSignIn: () => void
  benefits?: string[]
  className?: string
}

export function GuestCheckoutPrompt({
  onContinueAsGuest,
  onSignIn,
  benefits = [
    "Track your orders easily",
    "Save addresses for faster checkout",
    "Access exclusive member discounts",
    "Earn loyalty points on purchases"
  ],
  className = ""
}: GuestCheckoutPromptProps) {
  return (
    <div className={`${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">How would you like to checkout?</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Guest Checkout */}
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Guest Checkout</h3>
          <p className="text-gray-600 mb-6">
            Continue without creating an account. You can always create one later.
          </p>
          <Button onClick={onContinueAsGuest} variant="outline" className="w-full">
            Continue as Guest
          </Button>
        </div>

        {/* Sign In */}
        <div className="border-2 border-cyan-200 bg-cyan-50 rounded-xl p-6">
          <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-cyan-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sign In or Create Account</h3>
          <ul className="space-y-2 mb-6">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-cyan-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
          <Button onClick={onSignIn} className="w-full">
            Sign In
          </Button>
          <p className="text-xs text-gray-500 text-center mt-3">
            Don't have an account?{" "}
            <Link to="/us/account/register" className="text-cyan-600 hover:text-cyan-700">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
