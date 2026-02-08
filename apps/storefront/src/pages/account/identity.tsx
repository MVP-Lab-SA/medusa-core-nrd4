import { useIdentityWallet, useKYCStatus, useConsents, useUpdateConsent } from "@/lib/hooks/use-waltid"
import { CredentialCard, KYCStatusCard, ConsentManager } from "@/components/ui/identity-components"
import { useCustomer } from "@/lib/context/customer-context"
import { LockClosedSolid, CheckCircle, Clock } from "@medusajs/icons"

interface AccountIdentityPageProps {
  countryCode: string
}

export default function AccountIdentityPage({ countryCode }: AccountIdentityPageProps) {
  const { customer } = useCustomer()
  const { data: wallet, isLoading: walletLoading } = useIdentityWallet(customer?.id || "")
  const { data: kycStatus } = useKYCStatus(customer?.id || "")
  const { data: consents } = useConsents(customer?.id || "")
  const updateConsent = useUpdateConsent()

  const handleConsentToggle = async (purpose: string, granted: boolean) => {
    if (!customer) return
    await updateConsent.mutateAsync({
      customerId: customer.id,
      purpose,
      granted,
    })
  }

  if (!customer) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Please log in to manage your identity.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Identity & Verification</h1>

      {/* Identity Overview */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <LockClosedSolid className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Digital Identity</h2>
            {wallet ? (
              <p className="text-blue-100 mt-1 text-sm font-mono">
                DID: {wallet.did.slice(0, 20)}...
              </p>
            ) : (
              <p className="text-blue-100 mt-1">Set up your digital identity</p>
            )}
          </div>
        </div>

        {wallet && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">{wallet.credentials.length}</p>
              <p className="text-sm text-blue-100">Credentials</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">
                {wallet.credentials.filter((c) => c.status === "valid").length}
              </p>
              <p className="text-sm text-blue-100">Verified</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">
                {wallet.credentials.filter((c) => c.status === "expired").length}
              </p>
              <p className="text-sm text-blue-100">Expired</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KYC Status */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">KYC Verification</h2>
          {kycStatus ? (
            <KYCStatusCard kyc={kycStatus} />
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <LockClosedSolid className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900 mt-4">Not Yet Verified</h3>
              <p className="text-sm text-gray-500 mt-1">
                Complete KYC verification to unlock all features
              </p>
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Start Verification
              </button>
            </div>
          )}
        </div>

        {/* Privacy Preferences */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy Preferences</h2>
          {consents ? (
            <ConsentManager consents={consents} onToggle={handleConsentToggle} />
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-500 text-center">Loading preferences...</p>
            </div>
          )}
        </div>
      </div>

      {/* Credentials */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">My Credentials</h2>
        {walletLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : wallet && wallet.credentials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wallet.credentials.map((credential) => (
              <CredentialCard key={credential.id} credential={credential} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900 mt-4">No Credentials Yet</h3>
            <p className="text-sm text-gray-500 mt-1">
              Your verified credentials will appear here
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Request Credential
            </button>
          </div>
        )}
      </div>

      {/* Data Export */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Data</h2>
        <p className="text-sm text-gray-500 mb-4">
          Download a copy of your data or request account deletion
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Download My Data
          </button>
          <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
