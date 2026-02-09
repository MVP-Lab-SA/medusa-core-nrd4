import { createFileRoute } from "@tanstack/react-router"
import { useLicenseKeys } from "../../../lib/hooks/use-marketplace"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { Key, Check, XCircle, Eye, EyeSlash, SquareTwoStack } from "@medusajs/icons"
import { useState } from "react"

export const Route = createFileRoute("/$countryCode/account/licenses")({
  component: LicensesPage,
})

function LicensesPage() {
  const { countryCode } = Route.useParams()
  const { data: licenses, isLoading } = useLicenseKeys()
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const copyToClipboard = (key: string, id: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const maskKey = (key: string) => {
    if (key.length <= 8) return "*".repeat(key.length)
    return key.substring(0, 4) + "*".repeat(key.length - 8) + key.substring(key.length - 4)
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/licenses`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">My License Keys</h1>
          <p className="text-gray-400 mt-1">Manage your software license keys</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : licenses && licenses.length > 0 ? (
        <div className="space-y-4">
          {licenses.map((license) => {
            const isActive = license.status === "active"
            const isVisible = visibleKeys.has(license.id)
            const isCopied = copiedKey === license.id

            return (
              <div
                key={license.id}
                className={`bg-gray-900 border rounded-xl p-6 ${
                  isActive ? "border-gray-800" : "border-red-500/30"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isActive ? "bg-cyan-500/20" : "bg-red-500/20"
                    }`}>
                      <Key className={`w-5 h-5 ${isActive ? "text-cyan-400" : "text-red-400"}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{license.productName || "Software License"}</h3>
                      <p className="text-sm text-gray-500">
                        Purchased: {license.purchaseDate ? new Date(license.purchaseDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    isActive 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {isActive ? <Check className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {isActive ? "Active" : "Expired"}
                  </span>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <code className="font-mono text-sm text-gray-300">
                      {isVisible ? license.key : maskKey(license.key)}
                    </code>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleKeyVisibility(license.id)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        title={isVisible ? "Hide key" : "Show key"}
                      >
                        {isVisible ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(license.key, license.id)}
                        className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                        title="Copy key"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <SquareTwoStack className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {license.expiresAt && (
                  <p className="text-sm text-gray-500">
                    Expires: {new Date(license.expiresAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800">
          <Key className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No license keys found</p>
          <p className="text-sm text-gray-500 mt-2">
            License keys will appear here after purchasing digital products
          </p>
        </div>
      )}
    </AccountLayout>
  )
}
