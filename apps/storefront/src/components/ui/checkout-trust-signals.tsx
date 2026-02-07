import { LockClosedSolid, ShieldCheck, ArrowPath, CreditCard } from "@medusajs/icons"

interface CheckoutTrustSignalsProps {
  layout?: "horizontal" | "vertical" | "compact"
  className?: string
}

export function CheckoutTrustSignals({
  layout = "horizontal",
  className = ""
}: CheckoutTrustSignalsProps) {
  const signals = [
    {
      icon: <LockClosedSolid className="w-5 h-5" />,
      title: "Secure Checkout",
      description: "256-bit SSL encryption"
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Money Back Guarantee",
      description: "30-day return policy"
    },
    {
      icon: <ArrowPath className="w-5 h-5" />,
      title: "Free Returns",
      description: "Easy hassle-free returns"
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Safe Payment",
      description: "All major cards accepted"
    }
  ]

  if (layout === "compact") {
    return (
      <div className={`flex items-center justify-center gap-4 py-3 ${className}`}>
        {signals.slice(0, 3).map((signal, idx) => (
          <div key={idx} className="flex items-center gap-1 text-gray-500">
            {signal.icon}
            <span className="text-xs">{signal.title}</span>
          </div>
        ))}
      </div>
    )
  }

  if (layout === "vertical") {
    return (
      <div className={`space-y-3 ${className}`}>
        {signals.map((signal, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-green-600">{signal.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-900">{signal.title}</p>
              <p className="text-xs text-gray-500">{signal.description}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Horizontal layout
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {signals.map((signal, idx) => (
        <div key={idx} className="text-center">
          <div className="w-10 h-10 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            {signal.icon}
          </div>
          <p className="text-sm font-medium text-gray-900">{signal.title}</p>
          <p className="text-xs text-gray-500">{signal.description}</p>
        </div>
      ))}
    </div>
  )
}

interface SecureCheckoutHeaderProps {
  className?: string
}

export function SecureCheckoutHeader({ className = "" }: SecureCheckoutHeaderProps) {
  return (
    <div className={`flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg ${className}`}>
      <div className="flex items-center gap-2">
        <LockClosedSolid className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium text-gray-700">Secure Checkout</span>
      </div>
      <div className="flex items-center gap-3">
        <img src="https://cdn.jsdelivr.net/gh/nicepay-dev/nicepay-images/visa.svg" alt="Visa" className="h-5" />
        <img src="https://cdn.jsdelivr.net/gh/nicepay-dev/nicepay-images/mastercard.svg" alt="Mastercard" className="h-5" />
        <img src="https://cdn.jsdelivr.net/gh/nicepay-dev/nicepay-images/amex.svg" alt="Amex" className="h-5" />
      </div>
    </div>
  )
}
