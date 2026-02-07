import * as React from "react"
import { CreditCard, Lock } from "lucide-react"
import { clx } from "@medusajs/ui"

interface CreditCardInputProps {
  onCardNumberChange?: (value: string) => void
  onExpiryChange?: (value: string) => void
  onCvcChange?: (value: string) => void
  onNameChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

const CARD_TYPES = {
  visa: /^4/,
  mastercard: /^5[1-5]/,
  amex: /^3[47]/,
  discover: /^6(?:011|5)/,
}

export function CreditCardInput({
  onCardNumberChange,
  onExpiryChange,
  onCvcChange,
  onNameChange,
  disabled = false,
  className
}: CreditCardInputProps) {
  const [cardNumber, setCardNumber] = React.useState("")
  const [expiry, setExpiry] = React.useState("")
  const [cvc, setCvc] = React.useState("")
  const [name, setName] = React.useState("")
  const [cardType, setCardType] = React.useState<string | null>(null)

  const detectCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, "")
    for (const [type, pattern] of Object.entries(CARD_TYPES)) {
      if (pattern.test(cleaned)) {
        return type
      }
    }
    return null
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    const groups = cleaned.match(/.{1,4}/g)
    return groups ? groups.join(" ") : cleaned
  }

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
    }
    return cleaned
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.replace(/\s/g, "").length <= 16) {
      setCardNumber(formatted)
      setCardType(detectCardType(formatted))
      onCardNumberChange?.(formatted.replace(/\s/g, ""))
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace("/", "")
    const formatted = formatExpiry(value)
    if (value.length <= 4) {
      setExpiry(formatted)
      onExpiryChange?.(formatted)
    }
  }

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "")
    const maxLength = cardType === "amex" ? 4 : 3
    if (cleaned.length <= maxLength) {
      setCvc(cleaned)
      onCvcChange?.(cleaned)
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    setName(value)
    onNameChange?.(value)
  }

  const getCardIcon = () => {
    switch (cardType) {
      case "visa":
        return <span className="text-blue-500 font-bold text-sm">VISA</span>
      case "mastercard":
        return <span className="text-orange-500 font-bold text-sm">MC</span>
      case "amex":
        return <span className="text-blue-400 font-bold text-sm">AMEX</span>
      case "discover":
        return <span className="text-orange-400 font-bold text-sm">DISC</span>
      default:
        return <CreditCard className="w-5 h-5 text-zinc-500" />
    }
  }

  const inputClass = clx(
    "w-full px-4 py-3 rounded-lg border transition-all",
    "bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500",
    "hover:border-cyan-500/50 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30",
    disabled && "opacity-50 cursor-not-allowed"
  )

  return (
    <div className={clx("space-y-4", className)}>
      <div className="p-6 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700">
        <div className="flex items-center justify-between mb-6">
          <CreditCard className="w-10 h-10 text-cyan-500" />
          <Lock className="w-5 h-5 text-green-500" />
        </div>
        
        <div className="mb-6">
          <p className="text-zinc-500 text-xs mb-1">Card Number</p>
          <p className="text-white text-xl font-mono tracking-wider">
            {cardNumber || "---- ---- ---- ----"}
          </p>
        </div>
        
        <div className="flex justify-between">
          <div>
            <p className="text-zinc-500 text-xs mb-1">Card Holder</p>
            <p className="text-white text-sm font-mono">
              {name || "YOUR NAME"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-zinc-500 text-xs mb-1">Expires</p>
            <p className="text-white text-sm font-mono">
              {expiry || "MM/YY"}
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-zinc-400 text-sm mb-2">Card Number</label>
        <div className="relative">
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            disabled={disabled}
            className={clx(inputClass, "pr-16")}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {getCardIcon()}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-zinc-400 text-sm mb-2">Cardholder Name</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="JOHN DOE"
          disabled={disabled}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-zinc-400 text-sm mb-2">Expiry Date</label>
          <input
            type="text"
            value={expiry}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            disabled={disabled}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-zinc-400 text-sm mb-2">CVC</label>
          <input
            type="text"
            value={cvc}
            onChange={handleCvcChange}
            placeholder={cardType === "amex" ? "1234" : "123"}
            disabled={disabled}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-zinc-500 text-sm">
        <Lock className="w-4 h-4" />
        <span>Your payment info is secured with SSL encryption</span>
      </div>
    </div>
  )
}
