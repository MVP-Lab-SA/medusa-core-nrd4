import { useState } from "react"
import { clx } from "@medusajs/ui"
import { Spinner, GiftSolid } from "@medusajs/icons"

interface GiftCardBalance {
  code: string
  balance: number
  currency: string
  expiresAt?: Date
}

interface GiftCardCheckerProps {
  onCheck: (code: string) => Promise<GiftCardBalance | null>
  className?: string
}

export function GiftCardChecker({ onCheck, className }: GiftCardCheckerProps) {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [balance, setBalance] = useState<GiftCardBalance | null>(null)

  const handleCheck = async () => {
    if (!code.trim()) {
      setError("Please enter a gift card code")
      return
    }

    setIsLoading(true)
    setError(null)
    setBalance(null)

    try {
      const result = await onCheck(code.trim().toUpperCase())
      if (result) {
        setBalance(result)
      } else {
        setError("Gift card not found or invalid")
      }
    } catch {
      setError("Failed to check gift card balance")
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  const handleReset = () => {
    setCode("")
    setBalance(null)
    setError(null)
  }

  return (
    <div className={clx("p-6 bg-neutral-900 border border-neutral-800 rounded-xl", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
          <GiftSolid className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Check Gift Card Balance</h3>
          <p className="text-sm text-neutral-500">Enter your gift card code below</p>
        </div>
      </div>

      {!balance ? (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase())
                setError(null)
              }}
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
              placeholder="XXXX-XXXX-XXXX-XXXX"
              disabled={isLoading}
              className={clx(
                "flex-1 px-4 py-3 bg-neutral-800 border rounded-lg",
                "text-white placeholder-neutral-500 font-mono text-sm tracking-wider",
                "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent",
                "transition-all duration-200",
                error ? "border-red-500" : "border-neutral-700",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            />
            <button
              onClick={handleCheck}
              disabled={isLoading || !code.trim()}
              className={clx(
                "px-5 py-3 bg-cyan-500 text-black font-medium rounded-lg",
                "hover:bg-cyan-400 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center gap-2"
              )}
            >
              {isLoading ? (
                <Spinner className="w-4 h-4 animate-spin" />
              ) : (
                "Check"
              )}
            </button>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-400">{error}</p>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-neutral-800 rounded-lg">
            <p className="text-sm text-neutral-500 mb-1">Available Balance</p>
            <p className="text-3xl font-bold text-cyan-400">
              {formatCurrency(balance.balance, balance.currency)}
            </p>
            <p className="text-xs text-neutral-500 font-mono mt-2">
              Card: {balance.code}
            </p>
            {balance.expiresAt && (
              <p className="text-xs text-neutral-500 mt-1">
                Expires: {balance.expiresAt.toLocaleDateString()}
              </p>
            )}
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2.5 text-sm text-neutral-400 hover:text-white border border-neutral-700 rounded-lg hover:border-neutral-600 transition-colors"
          >
            Check Another Card
          </button>
        </div>
      )}
    </div>
  )
}
