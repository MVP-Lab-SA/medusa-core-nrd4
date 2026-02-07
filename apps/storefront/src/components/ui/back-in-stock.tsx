import * as React from "react"
import { Bell, Check, Loader2, Mail } from "lucide-react"
import { clx } from "@medusajs/ui"

interface BackInStockNotifyProps {
  productId: string
  productName: string
  variantInfo?: string
  onSubscribe: (email: string, productId: string) => Promise<boolean>
  variant?: "default" | "inline" | "modal"
  className?: string
}

export function BackInStockNotify({
  productId,
  productName,
  variantInfo,
  onSubscribe,
  variant = "default",
  className
}: BackInStockNotifyProps) {
  const [email, setEmail] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSubscribed, setIsSubscribed] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [isExpanded, setIsExpanded] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const success = await onSubscribe(email.trim(), productId)
      if (success) {
        setIsSubscribed(true)
        setEmail("")
      } else {
        setError("Failed to subscribe. Please try again.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubscribed) {
    return (
      <div
        className={clx(
          "flex items-center gap-3 p-4 rounded-xl",
          "bg-green-500/10 border border-green-500/20",
          className
        )}
      >
        <div className="p-2 rounded-full bg-green-500/20">
          <Check className="w-5 h-5 text-green-500" />
        </div>
        <div>
          <p className="text-white font-medium">You're on the list!</p>
          <p className="text-zinc-400 text-sm">
            We'll email you when this item is back in stock.
          </p>
        </div>
      </div>
    )
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={clx("space-y-2", className)}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isLoading}
              className={clx(
                "w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all",
                "bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500",
                "focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30",
                isLoading && "opacity-50"
              )}
            />
          </div>
          <button
            type="submit"
            disabled={!email.trim() || isLoading}
            className={clx(
              "px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2",
              email.trim() && !isLoading
                ? "bg-cyan-500 text-black hover:bg-cyan-400"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Bell className="w-4 h-4" />
                Notify Me
              </>
            )}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>
    )
  }

  // Default variant with expandable form
  return (
    <div className={clx("rounded-xl border border-zinc-700 overflow-hidden", className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 p-4 bg-zinc-900 hover:bg-zinc-800 transition-colors"
      >
        <div className="p-2 rounded-lg bg-cyan-500/10">
          <Bell className="w-5 h-5 text-cyan-500" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-white font-medium">Notify when available</p>
          <p className="text-zinc-500 text-sm">
            {variantInfo || productName}
          </p>
        </div>
      </button>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="p-4 bg-zinc-900/50 border-t border-zinc-800">
          <p className="text-zinc-400 text-sm mb-3">
            Enter your email and we'll notify you when this item is back in stock.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={isLoading}
              className={clx(
                "flex-1 px-4 py-2.5 rounded-lg border transition-all",
                "bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500",
                "focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30",
                isLoading && "opacity-50"
              )}
            />
            <button
              type="submit"
              disabled={!email.trim() || isLoading}
              className={clx(
                "px-6 py-2.5 rounded-lg font-medium transition-all",
                email.trim() && !isLoading
                  ? "bg-cyan-500 text-black hover:bg-cyan-400"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Subscribe"
              )}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </form>
      )}
    </div>
  )
}
