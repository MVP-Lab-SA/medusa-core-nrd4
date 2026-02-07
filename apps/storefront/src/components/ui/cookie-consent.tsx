import { useState, useEffect } from "react"
import { clx } from "@medusajs/ui"
import { XMark, GiftSolid } from "@medusajs/icons"
import { Link } from "@tanstack/react-router"

interface CookieConsentProps {
  privacyPolicyUrl?: string
  onAccept?: () => void
  onReject?: () => void
  onManage?: () => void
  variant?: "banner" | "popup" | "minimal"
  position?: "bottom" | "top"
  storageKey?: string
  className?: string
}

export function CookieConsent({
  privacyPolicyUrl = "/privacy",
  onAccept,
  onReject,
  onManage,
  variant = "banner",
  position = "bottom",
  storageKey = "cookie-consent",
  className,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(storageKey)
    if (!consent) {
      setTimeout(() => {
        setIsVisible(true)
        requestAnimationFrame(() => setIsAnimating(true))
      }, 1000)
    }
  }, [storageKey])

  const handleAccept = () => {
    localStorage.setItem(storageKey, "accepted")
    onAccept?.()
    close()
  }

  const handleReject = () => {
    localStorage.setItem(storageKey, "rejected")
    onReject?.()
    close()
  }

  const close = () => {
    setIsAnimating(false)
    setTimeout(() => setIsVisible(false), 300)
  }

  if (!isVisible) return null

  if (variant === "minimal") {
    return (
      <div
        className={clx(
          "fixed z-50 transition-all duration-300",
          position === "bottom" ? "bottom-4 left-4" : "top-4 left-4",
          isAnimating
            ? "opacity-100 translate-y-0"
            : position === "bottom"
            ? "opacity-0 translate-y-4"
            : "opacity-0 -translate-y-4",
          className
        )}
      >
        <div className="flex items-center gap-3 p-4 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl max-w-sm">
          <GiftSolid className="w-6 h-6 text-cyan-400 flex-shrink-0" />
          <p className="text-sm text-neutral-300 flex-1">
            We use cookies to improve your experience.
          </p>
          <button
            onClick={handleAccept}
            className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-medium rounded-lg transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    )
  }

  if (variant === "popup") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={clx(
            "absolute inset-0 bg-black/50 transition-opacity duration-300",
            isAnimating ? "opacity-100" : "opacity-0"
          )}
          onClick={handleReject}
        />
        <div
          className={clx(
            "relative bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl max-w-md w-full p-6 transition-all duration-300",
            isAnimating
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95",
            className
          )}
        >
          <button
            onClick={handleReject}
            className="absolute top-4 right-4 p-2 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <XMark className="w-5 h-5 text-neutral-400" />
          </button>

          <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
            <GiftSolid className="w-6 h-6 text-cyan-400" />
          </div>

          <h3 className="text-lg font-semibold text-white mb-2">Cookie Preferences</h3>
          <p className="text-sm text-neutral-400 mb-6">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleAccept}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors"
            >
              Accept All Cookies
            </button>
            {onManage && (
              <button
                onClick={onManage}
                className="w-full py-3 border border-neutral-700 text-white font-medium rounded-lg hover:border-neutral-500 transition-colors"
              >
                Manage Preferences
              </button>
            )}
            <button
              onClick={handleReject}
              className="w-full py-3 text-neutral-500 hover:text-white font-medium transition-colors"
            >
              Reject All
            </button>
          </div>

          <p className="text-xs text-neutral-500 mt-4 text-center">
            Read our{" "}
            <Link to={privacyPolicyUrl} className="text-cyan-400 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    )
  }

  // Banner variant (default)
  return (
    <div
      className={clx(
        "fixed left-0 right-0 z-50 transition-all duration-300",
        position === "bottom" ? "bottom-0" : "top-0",
        isAnimating
          ? "opacity-100 translate-y-0"
          : position === "bottom"
          ? "opacity-0 translate-y-full"
          : "opacity-0 -translate-y-full",
        className
      )}
    >
      <div className="bg-neutral-900 border-t border-neutral-800 p-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
          <GiftSolid className="w-8 h-8 text-cyan-400 flex-shrink-0 hidden md:block" />
          <p className="flex-1 text-sm text-neutral-300 text-center md:text-left">
            We use cookies to improve your experience on our site. By continuing to browse, you agree to our{" "}
            <Link to={privacyPolicyUrl} className="text-cyan-400 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex items-center gap-3">
            {onManage && (
              <button
                onClick={onManage}
                className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Manage
              </button>
            )}
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm border border-neutral-700 text-white rounded-lg hover:border-neutral-500 transition-colors"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
