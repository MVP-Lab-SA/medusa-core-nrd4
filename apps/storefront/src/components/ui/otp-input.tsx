import * as React from "react"
import { clx } from "@medusajs/ui"

interface OTPInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  disabled?: boolean
  error?: boolean
  className?: string
}

export function OTPInput({
  length = 6,
  value = "",
  onChange,
  onComplete,
  disabled = false,
  error = false,
  className
}: OTPInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const values = React.useMemo(() => {
    const chars = value.split("")
    return Array.from({ length }, (_, i) => chars[i] || "")
  }, [value, length])

  const focusInput = (index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus()
    }
  }

  const handleChange = (index: number, inputValue: string) => {
    if (disabled) return

    const newValue = inputValue.slice(-1)
    
    if (!/^\d*$/.test(newValue)) return

    const newValues = [...values]
    newValues[index] = newValue
    const combinedValue = newValues.join("")
    
    onChange?.(combinedValue)

    if (newValue && index < length - 1) {
      focusInput(index + 1)
    }

    if (combinedValue.length === length) {
      onComplete?.(combinedValue)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    switch (e.key) {
      case "Backspace":
        e.preventDefault()
        if (values[index]) {
          const newValues = [...values]
          newValues[index] = ""
          onChange?.(newValues.join(""))
        } else if (index > 0) {
          focusInput(index - 1)
          const newValues = [...values]
          newValues[index - 1] = ""
          onChange?.(newValues.join(""))
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
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return
    e.preventDefault()
    
    const pastedData = e.clipboardData.getData("text/plain").replace(/\D/g, "")
    const newValues = pastedData.slice(0, length).split("")
    
    while (newValues.length < length) {
      newValues.push("")
    }
    
    const combinedValue = newValues.slice(0, length).join("")
    onChange?.(combinedValue)

    if (combinedValue.length === length) {
      onComplete?.(combinedValue)
    } else {
      focusInput(combinedValue.length)
    }
  }

  return (
    <div className={clx("flex gap-3 justify-center", className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={values[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          className={clx(
            "w-12 h-14 text-center text-2xl font-bold rounded-lg border-2 transition-all",
            "bg-zinc-900 text-white",
            "focus:outline-none",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
              : values[index]
              ? "border-cyan-500"
              : "border-zinc-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      ))}
    </div>
  )
}
