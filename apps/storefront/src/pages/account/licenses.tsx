import { useState } from "react"
import { Key, Eye, EyeSlash, SquareTwoStack, Check, ArrowPath } from "@medusajs/icons"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountPageHeader,
  AccountCard,
  AccountButton,
  AccountEmptyState,
  AccountSkeleton,
  AccountBadge,
} from "@/components/account/AccountUI"

interface LicensesPageProps {
  countryCode: string
}

// Mock data - replace with real hook
const mockLicenses = [
  {
    id: "lic_1",
    productName: "Premium Software Suite",
    licenseKey: "XXXX-XXXX-XXXX-XXXX-1234",
    status: "active",
    activations: 2,
    maxActivations: 5,
    expiresAt: "2025-12-31",
    purchasedAt: "2024-01-15",
  },
  {
    id: "lic_2",
    productName: "Design Tools Pro",
    licenseKey: "YYYY-YYYY-YYYY-YYYY-5678",
    status: "active",
    activations: 1,
    maxActivations: 3,
    expiresAt: null,
    purchasedAt: "2024-03-20",
  },
  {
    id: "lic_3",
    productName: "Photo Editor",
    licenseKey: "ZZZZ-ZZZZ-ZZZZ-ZZZZ-9012",
    status: "expired",
    activations: 1,
    maxActivations: 1,
    expiresAt: "2024-06-01",
    purchasedAt: "2023-06-01",
  },
]

export function AccountLicensesPage({ countryCode }: LicensesPageProps) {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const isLoading = false
  const licenses = mockLicenses

  const toggleKeyVisibility = (licenseId: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev)
      if (next.has(licenseId)) {
        next.delete(licenseId)
      } else {
        next.add(licenseId)
      }
      return next
    })
  }

  const copyToClipboard = async (licenseId: string, key: string) => {
    await navigator.clipboard.writeText(key)
    setCopiedKey(licenseId)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const getMaskedKey = (key: string, isVisible: boolean) => {
    if (isVisible) return key
    return key.replace(/[A-Z0-9]/g, (char, index) => {
      // Show last 4 characters
      if (index >= key.length - 4) return char
      return "*"
    })
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/licenses`}>
      <AccountPageHeader
        title="License Keys"
        description="Manage your software licenses"
        breadcrumbs={[
          { label: "Account", href: `/${countryCode}/account` },
          { label: "Licenses" },
        ]}
      />

      {isLoading ? (
        <div className="space-y-4">
          <AccountSkeleton height="h-32" />
          <AccountSkeleton height="h-32" />
          <AccountSkeleton height="h-32" />
        </div>
      ) : licenses && licenses.length > 0 ? (
        <div className="space-y-4">
          {licenses.map((license) => {
            const isVisible = visibleKeys.has(license.id)
            const isCopied = copiedKey === license.id

            return (
              <AccountCard key={license.id}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                        <Key className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{license.productName}</h3>
                        <p className="text-sm text-gray-500">
                          Purchased {new Date(license.purchasedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <AccountBadge 
                      variant={license.status === "active" ? "success" : "error"}
                    >
                      {license.status === "active" ? "Active" : "Expired"}
                    </AccountBadge>
                  </div>

                  {/* License Key */}
                  <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <code className="text-sm font-mono text-cyan-400">
                        {getMaskedKey(license.licenseKey, isVisible)}
                      </code>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleKeyVisibility(license.id)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                          title={isVisible ? "Hide key" : "Show key"}
                        >
                          {isVisible ? (
                            <EyeSlash className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => copyToClipboard(license.id, license.licenseKey)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                          title="Copy key"
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <SquareTwoStack className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* License Details */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Activations</p>
                      <p className="text-white font-medium">
                        {license.activations} / {license.maxActivations}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Expires</p>
                      <p className="text-white font-medium">
                        {license.expiresAt 
                          ? new Date(license.expiresAt).toLocaleDateString() 
                          : "Never"}
                      </p>
                    </div>
                    <div className="text-right">
                      {license.status === "expired" && (
                        <AccountButton size="sm" variant="secondary">
                          <ArrowPath className="w-4 h-4 mr-2" />
                          Renew
                        </AccountButton>
                      )}
                    </div>
                  </div>
                </div>
              </AccountCard>
            )
          })}
        </div>
      ) : (
        <AccountEmptyState
          icon={<Key className="w-12 h-12" />}
          title="No licenses yet"
          description="Purchase software to see your license keys here"
          action={{
            label: "Browse Software",
            href: `/${countryCode}/products?type=software`,
          }}
        />
      )}
    </AccountLayout>
  )
}
