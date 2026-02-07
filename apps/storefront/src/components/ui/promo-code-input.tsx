import * as React from "react"
import { Tag, X, Check, Loader2 } from "lucide-react"
import { clx } from "@medusajs/ui"

interface PromoCodeInputProps {
  onApply: (code: string) => Promise<boolean>
  appliedCode?: string
  onRemove?: () => void
  discount?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function PromoCodeInput({
  onApply,
  appliedCode,
  onRemove,
  discount,
  placeholder = "Enter promo code",
  disabled = false,
  className
}: PromoCodeInputProps) {
  const [code, setCode] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleApply = async () => {
    if (!code.trim() || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const success = await onApply(code.trim().toUpperCase())
      if (!success) {
        setError("Invalid promo code")
      } else {
        setCode("")
      }
    } catch {
      setError("Failed to apply code")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleApply()
    }
  }

  if (appliedCode) {
    return (
      <div className={clx("space-y-2", className)}>
        <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/30">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-full bg-green-500/20">
              <Check className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">{appliedCode}</p>
              {discount && (
                <p className="text-green-400 text-xs">{discount} off</p>
              )}
            </div>
          </div>
          {onRemove && (
            <button
              onClick={onRemove}
              disabled={disabled}
              className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={clx("space-y-2", className)}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase())
              setError(null)
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            className={clx(
              "w-full pl-10 pr-4 py-3 rounded-lg border transition-all uppercase",
              "bg-zinc-900 text-white placeholder-zinc-500",
              error
                ? "border-red-500 focus:border-red-500"
                : "border-zinc-700 hover:border-cyan-500/50 focus:border-cyan-500",
              "focus:outline-none focus:ring-1",
              error ? "focus:ring-red-500/30" : "focus:ring-cyan-500/30",
              (disabled || isLoading) && "opacity-50 cursor-not-allowed"
            )}
          />
        </div>
        <button
          onClick={handleApply}
          disabled={!code.trim() || disabled || isLoading}
          className={clx(
            "px-6 py-3 rounded-lg font-medium transition-all",
            code.trim() && !disabled && !isLoading
              ? "bg-cyan-500 text-black hover:bg-cyan-400"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Apply"
          )}
        </button>
      </div>
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  )
}
