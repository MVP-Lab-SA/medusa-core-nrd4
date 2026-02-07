import { useState } from "react"
import { clx } from "@medusajs/ui"
import { BellAlert, Check, Spinner } from "@medusajs/icons"

interface BackInStockProps {
  productId: string
  productTitle: string
  variantId?: string
  variantTitle?: string
  onSubmit: (email: string, productId: string, variantId?: string) => Promise<boolean>
  className?: string
}

export function BackInStock({
  productId,
  productTitle,
  variantId,
  variantTitle,
  onSubmit,
  className,
}: BackInStockProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("Please enter your email")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const success = await onSubmit(email, productId, variantId)
      if (success) {
        setIsSuccess(true)
      } else {
        setError("Failed to subscribe. Please try again.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div
        className={clx(
          "flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl",
          className
        )}
      >
        <div className="w-10 h-10 flex items-center justify-center bg-emerald-500/20 rounded-full">
          <Check className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-emerald-400">You're on the list</p>
          <p className="text-xs text-neutral-400">
            We'll email you when {productTitle} is back in stock
          </p>
        </div>
      </div>
    )
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className={clx(
          "w-full flex items-center justify-center gap-2 px-4 py-3",
          "bg-neutral-800 hover:bg-neutral-700 border border-neutral-700",
          "text-white font-medium rounded-xl transition-colors",
          className
        )}
      >
        <BellAlert className="w-5 h-5" />
        Notify me when available
      </button>
    )
  }

  return (
    <div
      className={clx(
        "p-4 bg-neutral-900 border border-neutral-800 rounded-xl",
        className
      )}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-cyan-500/20 rounded-full flex-shrink-0">
          <BellAlert className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white">Get notified</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Enter your email and we'll let you know when{" "}
            <span className="text-white">{productTitle}</span>
            {variantTitle && (
              <> ({variantTitle})</>
            )} is back in stock.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError(null)
          }}
          placeholder="Enter your email"
          disabled={isLoading}
          className={clx(
            "w-full px-4 py-2.5 bg-neutral-800 border rounded-lg",
            "text-white placeholder-neutral-500 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent",
            "transition-all duration-200",
            error ? "border-red-500" : "border-neutral-700",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        />

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Spinner className="w-4 h-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              "Notify Me"
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsExpanded(false)
              setError(null)
            }}
            className="px-4 py-2.5 text-neutral-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
