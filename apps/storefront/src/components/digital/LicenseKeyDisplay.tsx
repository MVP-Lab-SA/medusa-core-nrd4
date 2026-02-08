import { useState } from "react"
import { Eye, EyeSlash, SquareTwoStack } from "@medusajs/icons"
import type { LicenseKey } from "../../lib/mock/marketplace"

interface LicenseKeyDisplayProps {
  license: LicenseKey
}

export function LicenseKeyDisplay({ license }: LicenseKeyDisplayProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  const maskedKey = license.key.replace(/./g, "*").slice(0, 20) + "..."

  const handleCopy = async () => {
    await navigator.clipboard.writeText(license.key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const statusColors = {
    active: "bg-green-100 text-green-700",
    expired: "bg-red-100 text-red-700",
    revoked: "bg-gray-100 text-gray-700",
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900">{license.productName}</h4>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[license.status]}`}>
          {license.status.charAt(0).toUpperCase() + license.status.slice(1)}
        </span>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
        <code className="flex-1 text-sm font-mono text-gray-700 break-all">
          {isVisible ? license.key : maskedKey}
        </code>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="p-2 hover:bg-gray-200 rounded"
          title={isVisible ? "Hide" : "Show"}
        >
          {isVisible ? (
            <EyeSlash className="w-4 h-4 text-gray-500" />
          ) : (
            <Eye className="w-4 h-4 text-gray-500" />
          )}
        </button>
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-gray-200 rounded"
          title="Copy"
        >
          <SquareTwoStack className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {copied && (
        <p className="text-sm text-green-600 mt-2">Copied to clipboard!</p>
      )}

      <div className="mt-3 text-sm text-gray-500">
        <p>Purchased: {new Date(license.purchasedAt).toLocaleDateString()}</p>
        {license.expiresAt && (
          <p>Expires: {new Date(license.expiresAt).toLocaleDateString()}</p>
        )}
        {license.activations !== undefined && license.maxActivations !== undefined && (
          <p>Activations: {license.activations} / {license.maxActivations}</p>
        )}
      </div>
    </div>
  )
}
