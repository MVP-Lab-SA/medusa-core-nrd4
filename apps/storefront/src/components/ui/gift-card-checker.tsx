import * as React from "react"
import { Gift, Loader2, CreditCard } from "lucide-react"
import { clx } from "@medusajs/ui"

interface GiftCardBalance {
  balance: number
  currency: string
  expiresAt?: Date
}

interface GiftCardCheckerProps {
  onCheck: (code: string) => Promise<GiftCardBalance | null>
  onApply?: (code: string) => void
  currencySymbol?: string
  className?: string
}

export function GiftCardChecker({
  onCheck,
  onApply,
  currencySymbol = "$",
  className
}: GiftCardCheckerProps) {
  const [code, setCode] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [balance, setBalance] = React.useState<GiftCardBalance | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isChecked, setIsChecked] = React.useState(false)

  const handleCheck = async () => {
    if (!code.trim() || isLoading) return

    setIsLoading(true)
    setError(null)
    setBalance(null)

    try {
      const result = await onCheck(code.trim().toUpperCase())
      if (result) {
        setBalance(result)
        setIsChecked(true)
      } else {
        setError("Gift card not found")
      }
    } catch {
      setError("Failed to check balance")
    } finally {
      setIsLoading(false)
    }
  }

  const handleApply = () => {
    if (balance && onApply) {
      onApply(code.trim().toUpperCase())
    }
  }

  const handleReset = () => {
    setCode("")
    setBalance(null)
    setError(null)
    setIsChecked(false)
  }

  const formatExpiry = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  return (
    <div className={clx("space-y-4", className)}>
      <div className="flex items-center gap-2 text-zinc-400">
        <Gift className="w-5 h-5" />
        <span className="font-medium">Gift Card</span>
      </div>

      {!isChecked ? (
        <>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase())
                  setError(null)
                }}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                placeholder="Enter gift card code"
                disabled={isLoading}
                className={clx(
                  "w-full pl-10 pr-4 py-3 rounded-lg border transition-all uppercase font-mono",
                  "bg-zinc-900 text-white placeholder-zinc-500",
                  error
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-700 hover:border-cyan-500/50 focus:border-cyan-500",
                  "focus:outline-none focus:ring-1",
                  error ? "focus:ring-red-500/30" : "focus:ring-cyan-500/30",
                  isLoading && "opacity-50 cursor-not-allowed"
                )}
              />
            </div>
            <button
              onClick={handleCheck}
              disabled={!code.trim() || isLoading}
              className={clx(
                "px-6 py-3 rounded-lg font-medium transition-all",
                code.trim() && !isLoading
                  ? "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-800"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Check"
              )}
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
        </>
      ) : balance ? (
        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-zinc-400 text-sm">Gift Card Balance</p>
              <p className="text-3xl font-bold text-white">
                {currencySymbol}{balance.balance.toFixed(2)}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-cyan-500/20">
              <Gift className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          
          <p className="text-zinc-500 text-sm font-mono mb-4">{code}</p>
          
          {balance.expiresAt && (
            <p className="text-zinc-400 text-xs mb-4">
              Expires: {formatExpiry(balance.expiresAt)}
            </p>
          )}
          
          <div className="flex gap-2">
            {onApply && balance.balance > 0 && (
              <button
                onClick={handleApply}
                className="flex-1 py-2 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors"
              >
                Apply to Order
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              Check Another
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
