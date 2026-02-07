import { useState } from "react"
import { XMark, Cake } from "@medusajs/icons"
import { Button } from "./button"

interface BirthdayPopupProps {
  customerName: string
  discount: string
  discountCode: string
  expiresAt: string
  onClose: () => void
  onApply: () => void
}

export function BirthdayPopup({
  customerName,
  discount,
  discountCode,
  expiresAt,
  onClose,
  onApply
}: BirthdayPopupProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(discountCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
        >
          <XMark className="w-5 h-5 text-gray-500" />
        </button>

        {/* Confetti effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-bounce"
              style={{
                backgroundColor: ["#f43f5e", "#8b5cf6", "#3b82f6", "#22c55e", "#eab308"][i % 5],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 p-8 text-center text-white">
          <Cake className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Happy Birthday, {customerName}!</h2>
          <p className="text-white/90">We have a special gift for you</p>
        </div>

        <div className="p-6 text-center">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Your birthday discount</p>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              {discount}
            </p>
            <p className="text-sm text-gray-600 mt-2">on any purchase</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Use code:</p>
            <div className="flex items-center justify-center gap-2">
              <code className="px-4 py-2 bg-gray-100 rounded-lg font-mono font-bold text-lg">
                {discountCode}
              </code>
              <button
                onClick={handleCopy}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Valid until {expiresAt}
            </p>
          </div>

          <Button onClick={onApply} className="w-full">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  )
}
