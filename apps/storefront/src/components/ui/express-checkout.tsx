import { Button } from "./button"

interface ExpressCheckoutProps {
  onApplePay?: () => void
  onGooglePay?: () => void
  onPayPal?: () => void
  onShopPay?: () => void
  availableMethods?: ("apple" | "google" | "paypal" | "shop")[]
  className?: string
}

export function ExpressCheckout({
  onApplePay,
  onGooglePay,
  onPayPal,
  onShopPay,
  availableMethods = ["apple", "google", "paypal"],
  className = ""
}: ExpressCheckoutProps) {
  return (
    <div className={`${className}`}>
      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-white text-sm text-gray-500">Express checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {availableMethods.includes("apple") && (
          <button
            onClick={onApplePay}
            className="flex items-center justify-center gap-2 h-12 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <span className="font-medium">Pay</span>
          </button>
        )}

        {availableMethods.includes("google") && (
          <button
            onClick={onGooglePay}
            className="flex items-center justify-center gap-2 h-12 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium text-gray-700">Pay</span>
          </button>
        )}

        {availableMethods.includes("paypal") && (
          <button
            onClick={onPayPal}
            className="flex items-center justify-center gap-2 h-12 bg-[#FFC439] rounded-lg hover:bg-[#f5bb35] transition-colors"
          >
            <svg className="w-20 h-5" viewBox="0 0 100 24" fill="none">
              <path fill="#253B80" d="M12.5 3.5h6.8c3.8 0 5.4 1.9 5 4.8-.5 4.2-3.2 6.5-7 6.5h-1.8c-.5 0-.9.4-1 .9l-.9 5.7c0 .3-.3.5-.6.5H9.2c-.4 0-.6-.3-.5-.7l2.8-17.2c.1-.3.4-.5.7-.5h.3z"/>
              <path fill="#179BD7" d="M35.5 3.5h6.8c3.8 0 5.4 1.9 5 4.8-.5 4.2-3.2 6.5-7 6.5h-1.8c-.5 0-.9.4-1 .9l-.9 5.7c0 .3-.3.5-.6.5h-3.8c-.4 0-.6-.3-.5-.7l2.8-17.2c.1-.3.4-.5.7-.5h.3z"/>
              <path fill="#253B80" d="M53 8.7c.2-1.3 0-2.2-.7-3-.8-.9-2.1-1.3-3.9-1.3h-5.1c-.4 0-.7.3-.8.6l-2.1 13.4c0 .3.2.5.5.5h3.7l-.3 1.9c0 .2.2.4.4.4h3c.3 0 .6-.2.6-.5l.8-4.9c.1-.3.3-.5.6-.5h.4c2.8 0 5-1.1 5.6-4.4.3-1.4.1-2.5-.7-3.2z"/>
            </svg>
          </button>
        )}

        {availableMethods.includes("shop") && (
          <button
            onClick={onShopPay}
            className="flex items-center justify-center gap-2 h-12 bg-[#5A31F4] text-white rounded-lg hover:bg-[#4a28cc] transition-colors"
          >
            <svg className="w-16 h-5" viewBox="0 0 64 20" fill="currentColor">
              <path d="M5.4 14.5c-1.3 0-2.3-.4-3-1.1-.7-.7-1.1-1.8-1.1-3.2V5.7h2.3v4.4c0 .8.2 1.4.5 1.8.3.4.8.6 1.4.6.6 0 1.1-.2 1.5-.7.4-.5.6-1.1.6-1.9V5.7h2.3v8.6H7.6v-1.1c-.6.9-1.3 1.3-2.2 1.3zM17.5 5.5c.8 0 1.4.3 2 .8.5.5.8 1.2.8 2.1v5.9h-2.3V8.9c0-.5-.1-.9-.4-1.2-.3-.3-.6-.4-1.1-.4-.5 0-1 .2-1.3.5-.3.4-.5.9-.5 1.5v5h-2.3V.9h2.3v5.8c.5-.8 1.3-1.2 2.8-1.2z"/>
            </svg>
          </button>
        )}
      </div>

      <p className="text-xs text-gray-500 text-center mt-3">
        By using express checkout, you agree to our Terms of Service
      </p>
    </div>
  )
}
