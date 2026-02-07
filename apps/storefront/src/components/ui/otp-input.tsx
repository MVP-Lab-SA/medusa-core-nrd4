import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react"
import { clx } from "@medusajs/ui"

interface OTPInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  disabled?: boolean
  className?: string
  label?: string
  error?: string
  autoFocus?: boolean
}

export function OTPInput({
  length = 6,
  value = "",
  onChange,
  onComplete,
  disabled = false,
  className,
  label,
  error,
  autoFocus = true,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(
    value.split("").concat(Array(length - value.length).fill(""))
  )
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [autoFocus])

  useEffect(() => {
    const newOtp = value.split("").concat(Array(length - value.length).fill(""))
    setOtp(newOtp.slice(0, length))
  }, [value, length])

  const focusInput = (index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus()
    }
  }

  const handleChange = (index: number, inputValue: string) => {
    if (disabled) return

    const digit = inputValue.replace(/[^0-9]/g, "").slice(-1)
    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)

    const otpValue = newOtp.join("")
    onChange?.(otpValue)

    if (digit && index < length - 1) {
      focusInput(index + 1)
    }

    if (newOtp.every(d => d !== "") && newOtp.length === length) {
      onComplete?.(otpValue)
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    switch (e.key) {
      case "Backspace":
        e.preventDefault()
        if (otp[index]) {
          const newOtp = [...otp]
          newOtp[index] = ""
          setOtp(newOtp)
          onChange?.(newOtp.join(""))
        } else if (index > 0) {
          focusInput(index - 1)
          const newOtp = [...otp]
          newOtp[index - 1] = ""
          setOtp(newOtp)
          onChange?.(newOtp.join(""))
        }
        break
      case "ArrowLeft":
        e.preventDefault()
        focusInput(index - 1)
        break
      case "ArrowRight":
        e.preventDefault()
        focusInput(index + 1)
        break
      case "Delete":
        e.preventDefault()
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
        onChange?.(newOtp.join(""))
        break
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (disabled) return

    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "")
    const newOtp = [...otp]

    for (let i = 0; i < Math.min(pastedData.length, length); i++) {
      newOtp[i] = pastedData[i]
    }

    setOtp(newOtp)
    const otpValue = newOtp.join("")
    onChange?.(otpValue)

    const nextEmptyIndex = newOtp.findIndex(d => d === "")
    if (nextEmptyIndex !== -1) {
      focusInput(nextEmptyIndex)
    } else {
      focusInput(length - 1)
      if (newOtp.every(d => d !== "")) {
        onComplete?.(otpValue)
      }
    }
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-neutral-300 mb-3 text-center">
          {label}
        </label>
      )}
      
      <div className="flex justify-center gap-3">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            disabled={disabled}
            className={clx(
              "w-12 h-14 text-center text-xl font-semibold",
              "bg-neutral-900 border-2 border-neutral-700 rounded-lg",
              "text-white",
              "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500",
              "transition-all duration-200",
              otp[index] && "border-cyan-500/50",
              disabled && "opacity-50 cursor-not-allowed",
              error && "border-red-500"
            )}
          />
        ))}
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-400 text-center">{error}</p>
      )}
    </div>
  )
}
