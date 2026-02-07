import * as React from "react"
import { Link } from "@tanstack/react-router"
import { Cookie, X, Settings } from "lucide-react"
import { clx } from "@medusajs/ui"

interface CookieConsentProps {
  privacyPolicyUrl?: string
  cookiePolicyUrl?: string
  onAcceptAll?: () => void
  onRejectAll?: () => void
  onSavePreferences?: (preferences: CookiePreferences) => void
  variant?: "banner" | "modal" | "minimal"
  position?: "bottom" | "top"
  className?: string
}

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

const COOKIE_NAME = "cookie_consent"
const COOKIE_DAYS = 365

export function CookieConsent({
  privacyPolicyUrl = "/privacy",
  cookiePolicyUrl,
  onAcceptAll,
  onRejectAll,
  onSavePreferences,
  variant = "banner",
  position = "bottom",
  className
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [showSettings, setShowSettings] = React.useState(false)
  const [preferences, setPreferences] = React.useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  })

  React.useEffect(() => {
    const consent = getCookie(COOKIE_NAME)
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date()
    expires.setDate(expires.getDate() + days)
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
  }

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    }
    setCookie(COOKIE_NAME, JSON.stringify(allAccepted), COOKIE_DAYS)
    onAcceptAll?.()
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    }
    setCookie(COOKIE_NAME, JSON.stringify(onlyNecessary), COOKIE_DAYS)
    onRejectAll?.()
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    setCookie(COOKIE_NAME, JSON.stringify(preferences), COOKIE_DAYS)
    onSavePreferences?.(preferences)
    setIsVisible(false)
  }

  if (!isVisible) return null

  if (variant === "minimal") {
    return (
      <div
        className={clx(
          "fixed left-4 right-4 z-50 p-4 rounded-xl",
          "bg-zinc-900 border border-zinc-700 shadow-xl",
          position === "bottom" ? "bottom-4" : "top-4",
          "md:left-auto md:right-4 md:max-w-md",
          className
        )}
      >
        <div className="flex items-center gap-4">
          <p className="text-zinc-300 text-sm flex-1">
            We use cookies to improve your experience.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleRejectAll}
              className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Reject
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-3 py-1.5 text-sm rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (variant === "modal" || showSettings) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <div
          className={clx(
            "relative w-full max-w-lg rounded-2xl overflow-hidden",
            "bg-zinc-900 border border-zinc-700 shadow-2xl",
            className
          )}
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <Cookie className="w-6 h-6 text-cyan-500" />
              </div>
              <h2 className="text-xl font-bold text-white">Cookie Preferences</h2>
            </div>

            <p className="text-zinc-400 text-sm mb-6">
              We use cookies and similar technologies to help personalize content, 
              tailor and measure ads, and provide a better experience. By clicking 
              "Accept All", you agree to this use of cookies.
            </p>

            <div className="space-y-4 mb-6">
              <CookieToggle
                label="Necessary"
                description="Required for the website to function properly"
                checked={preferences.necessary}
                disabled
              />
              <CookieToggle
                label="Analytics"
                description="Help us understand how visitors interact with our site"
                checked={preferences.analytics}
                onChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, analytics: checked }))
                }
              />
              <CookieToggle
                label="Marketing"
                description="Used to deliver personalized advertisements"
                checked={preferences.marketing}
                onChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, marketing: checked }))
                }
              />
              <CookieToggle
                label="Preferences"
                description="Remember your settings and preferences"
                checked={preferences.preferences}
                onChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, preferences: checked }))
                }
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRejectAll}
                className="flex-1 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleSavePreferences}
                className="flex-1 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 py-2.5 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors"
              >
                Accept All
              </button>
            </div>

            <p className="text-zinc-500 text-xs text-center mt-4">
              Read our{" "}
              <Link to={privacyPolicyUrl} className="text-cyan-400 hover:underline">
                Privacy Policy
              </Link>
              {cookiePolicyUrl && (
                <>
                  {" and "}
                  <Link to={cookiePolicyUrl} className="text-cyan-400 hover:underline">
                    Cookie Policy
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Banner variant
  return (
    <div
      className={clx(
        "fixed left-0 right-0 z-50 p-4",
        position === "bottom" ? "bottom-0" : "top-0",
        "bg-zinc-900 border-t border-zinc-700 shadow-xl",
        className
      )}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-medium mb-1">We value your privacy</p>
            <p className="text-zinc-400 text-sm">
              We use cookies to enhance your browsing experience and analyze our traffic.
              By clicking "Accept All", you consent to our use of cookies.{" "}
              <Link to={privacyPolicyUrl} className="text-cyan-400 hover:underline">
                Learn more
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Customize
          </button>
          <button
            onClick={handleRejectAll}
            className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            Reject All
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-6 py-2 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}

interface CookieToggleProps {
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

function CookieToggle({ label, description, checked, disabled, onChange }: CookieToggleProps) {
  return (
    <label className={clx("flex items-start gap-4", disabled && "opacity-60")}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 w-5 h-5 rounded border-zinc-700 bg-zinc-900 text-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed"
      />
      <div>
        <p className="text-white font-medium">{label}</p>
        <p className="text-zinc-500 text-sm">{description}</p>
      </div>
    </label>
  )
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? match[2] : null
}
