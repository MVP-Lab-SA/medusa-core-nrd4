import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRightMini, CheckCircleSolid } from "@medusajs/icons"
import { clsx } from "clsx"
import { useState } from "react"

interface NewsletterProps {
  variant?: "inline" | "card" | "minimal";
  className?: string;
}

export const Newsletter = ({ variant = "inline", className }: NewsletterProps) => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return
    
    setStatus("loading")
    
    // Simulate API call - in production, connect to your email service
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStatus("success")
      setMessage("Thank you for subscribing!")
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  if (variant === "minimal") {
    return (
      <div className={clsx("", className)}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1"
            disabled={status === "loading" || status === "success"}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading" ? "..." : <ArrowRightMini className="w-5 h-5" />}
          </Button>
        </form>
        {message && (
          <p className={clsx(
            "text-sm mt-2",
            status === "success" ? "text-emerald-400" : "text-red-400"
          )}>
            {message}
          </p>
        )}
      </div>
    )
  }

  if (variant === "card") {
    return (
      <div className={clsx(
        "bg-city-navy border border-city-steel p-8",
        className
      )}>
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-2xl font-bold text-city-white mb-2">
            Stay Connected
          </h3>
          <p className="text-city-gray mb-6">
            Subscribe to receive updates on new products, smart city insights, and exclusive offers.
          </p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-2 text-emerald-400 py-4">
              <CheckCircleSolid className="w-5 h-5" />
              <span>{message}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="text-center"
                disabled={status === "loading"}
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </Button>
              {status === "error" && (
                <p className="text-red-400 text-sm">{message}</p>
              )}
            </form>
          )}
        </div>
      </div>
    )
  }

  // Default inline variant
  return (
    <div className={clsx("", className)}>
      <h4 className="text-city-white font-bold mb-2">Newsletter</h4>
      <p className="text-city-gray text-sm mb-4">
        Get updates on new products and smart city insights.
      </p>

      {status === "success" ? (
        <div className="flex items-center gap-2 text-emerald-400">
          <CheckCircleSolid className="w-4 h-4" />
          <span className="text-sm">{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={status === "loading"}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </Button>
          {status === "error" && (
            <p className="text-red-400 text-sm">{message}</p>
          )}
        </form>
      )}
    </div>
  )
}

// Newsletter popup/modal component
export const NewsletterPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-city-dark/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-city-navy border border-city-steel p-8 max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-city-muted hover:text-city-white transition-colors"
        >
          &times;
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-city-cyan/20 border border-city-cyan/30 flex items-center justify-center">
            <span className="text-3xl">&#9993;</span>
          </div>
          <h3 className="text-2xl font-bold text-city-white mb-2">
            Join Our Network
          </h3>
          <p className="text-city-gray">
            Be the first to know about new smart city solutions and exclusive deals.
          </p>
        </div>

        <Newsletter variant="minimal" />
        
        <p className="text-city-muted text-xs text-center mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}

export default Newsletter
