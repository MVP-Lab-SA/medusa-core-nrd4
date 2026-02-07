import { useState } from "react"
import { clx } from "@medusajs/ui"
import { Check, XMark, Spinner } from "@medusajs/icons"

interface PromoCodeInputProps {
  onApply: (code: string) => Promise<boolean>
  onRemove?: () => void
  appliedCode?: string
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function PromoCodeInput({
  onApply,
  onRemove,
  appliedCode,
  placeholder = "Enter promo code",
  className,
  disabled = false,
}: PromoCodeInputProps) {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleApply = async () => {
    if (!code.trim()) {
      setError("Please enter a code")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const success = await onApply(code.trim().toUpperCase())
      if (success) {
        setCode("")
        setIsExpanded(false)
      } else {
        setError("Invalid promo code")
      }
    } catch {
      setError("Failed to apply code")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemove = () => {
    onRemove?.()
    setCode("")
    setError(null)
  }

  if (appliedCode) {
    return (
      <div className={clx("flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg", className)}>
        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-emerald-400 font-medium">Promo code applied</p>
          <p className="text-xs text-neutral-400 font-mono">{appliedCode}</p>
        </div>
        <button
          onClick={handleRemove}
          disabled={disabled}
          className="p-1.5 hover:bg-neutral-800 rounded-lg transition-colors"
          aria-label="Remove promo code"
        >
          <XMark className="w-4 h-4 text-neutral-400" />
        </button>
      </div>
    )
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        disabled={disabled}
        className={clx(
          "w-full text-left text-sm text-cyan-400 hover:text-cyan-300 transition-colors",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        + Add promo code
      </button>
    )
  }

  return (
    <div className={className}>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase())
            setError(null)
          }}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          className={clx(
            "flex-1 px-4 py-2.5 bg-neutral-900 border rounded-lg",
            "text-white placeholder-neutral-500 font-mono text-sm uppercase tracking-wider",
            "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent",
            "transition-all duration-200",
            error ? "border-red-500" : "border-neutral-700",
            (disabled || isLoading) && "opacity-50 cursor-not-allowed"
          )}
        />
        <button
          onClick={handleApply}
          disabled={disabled || isLoading || !code.trim()}
          className={clx(
            "px-4 py-2.5 bg-cyan-500 text-black font-medium rounded-lg",
            "hover:bg-cyan-400 transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center gap-2"
          )}
        >
          {isLoading ? (
            <Spinner className="w-4 h-4 animate-spin" />
          ) : (
            "Apply"
          )}
        </button>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
      
      <button
        onClick={() => {
          setIsExpanded(false)
          setCode("")
          setError(null)
        }}
        className="mt-2 text-xs text-neutral-500 hover:text-neutral-400 transition-colors"
      >
        Cancel
      </button>
    </div>
  )
}
