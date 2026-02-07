import { useState, ChangeEvent } from "react"
import { clx } from "@medusajs/ui"
import { CreditCard } from "@medusajs/icons"

interface CreditCardInputProps {
  onCardChange?: (data: CardData) => void
  disabled?: boolean
  className?: string
  error?: string
}

interface CardData {
  number: string
  expiry: string
  cvc: string
  complete: boolean
  brand: string
}

const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "")
  const groups = digits.match(/.{1,4}/g) || []
  return groups.join(" ").slice(0, 19)
}

const formatExpiry = (value: string): string => {
  const digits = value.replace(/\D/g, "")
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
  }
  return digits
}

const detectCardBrand = (number: string): string => {
  const digits = number.replace(/\D/g, "")
  if (/^4/.test(digits)) return "visa"
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "mastercard"
  if (/^3[47]/.test(digits)) return "amex"
  if (/^6(?:011|5)/.test(digits)) return "discover"
  return "unknown"
}

const CardBrandIcon = ({ brand }: { brand: string }) => {
  const brandStyles: Record<string, { bg: string; text: string }> = {
    visa: { bg: "bg-blue-600", text: "VISA" },
    mastercard: { bg: "bg-red-600", text: "MC" },
    amex: { bg: "bg-blue-400", text: "AMEX" },
    discover: { bg: "bg-orange-500", text: "DISC" },
    unknown: { bg: "bg-neutral-600", text: "" },
  }
  
  const style = brandStyles[brand] || brandStyles.unknown
  
  if (brand === "unknown") {
    return <CreditCard className="w-6 h-6 text-neutral-500" />
  }
  
  return (
    <span className={clx("px-2 py-0.5 rounded text-[10px] font-bold text-white", style.bg)}>
      {style.text}
    </span>
  )
}

export function CreditCardInput({
  onCardChange,
  disabled = false,
  className,
  error,
}: CreditCardInputProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [brand, setBrand] = useState("unknown")

  const updateCardData = (number: string, exp: string, cvcVal: string) => {
    const cleanNumber = number.replace(/\D/g, "")
    const cleanExpiry = exp.replace(/\D/g, "")
    const cleanCvc = cvcVal.replace(/\D/g, "")
    
    const isComplete =
      cleanNumber.length >= 15 &&
      cleanExpiry.length === 4 &&
      cleanCvc.length >= 3

    onCardChange?.({
      number: cleanNumber,
      expiry: exp,
      cvc: cleanCvc,
      complete: isComplete,
      brand,
    })
  }

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setCardNumber(formatted)
    const newBrand = detectCardBrand(formatted)
    setBrand(newBrand)
    updateCardData(formatted, expiry, cvc)
  }

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value)
    setExpiry(formatted)
    updateCardData(cardNumber, formatted, cvc)
  }

  const handleCvcChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4)
    setCvc(value)
    updateCardData(cardNumber, expiry, value)
  }

  return (
    <div className={className}>
      <div
        className={clx(
          "bg-neutral-900 border border-neutral-700 rounded-xl p-4",
          "focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent",
          "transition-all duration-200",
          disabled && "opacity-50",
          error && "border-red-500"
        )}
      >
        <div className="flex items-center gap-3 mb-4">
          <CardBrandIcon brand={brand} />
          <input
            type="text"
            value={cardNumber}
            onChange={handleNumberChange}
            placeholder="Card number"
            disabled={disabled}
            inputMode="numeric"
            autoComplete="cc-number"
            className="flex-1 bg-transparent text-white placeholder-neutral-500 outline-none text-lg tracking-wider"
          />
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs text-neutral-500 mb-1">Expiry</label>
            <input
              type="text"
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              disabled={disabled}
              inputMode="numeric"
              autoComplete="cc-exp"
              maxLength={5}
              className="w-full bg-transparent text-white placeholder-neutral-500 outline-none"
            />
          </div>
          
          <div className="flex-1">
            <label className="block text-xs text-neutral-500 mb-1">CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={handleCvcChange}
              placeholder="123"
              disabled={disabled}
              inputMode="numeric"
              autoComplete="cc-csc"
              maxLength={4}
              className="w-full bg-transparent text-white placeholder-neutral-500 outline-none"
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  )
}
