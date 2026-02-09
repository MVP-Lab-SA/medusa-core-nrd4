import { useIdentityWallet, useKYCStatus, useConsents, useUpdateConsent } from "@/lib/hooks/use-waltid"
import { useCustomer } from "@/lib/context/customer-context"
import { LockClosedSolid, CheckCircle, ShieldCheck } from "@medusajs/icons"
import { AccountLayout } from "@/components/account/AccountSidebar"

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
      <AccountLayout currentPath={`/${countryCode}/account/identity`}>
        <div className="text-center py-12">
          <p className="text-gray-400">Please log in to manage your identity.</p>
        </div>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/identity`}>
      <h1 className="text-2xl font-bold text-white mb-6">Identity & Verification</h1>

      {/* Identity Overview */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
            <LockClosedSolid className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Digital Identity</h2>
            {wallet ? (
              <p className="text-purple-200 mt-1 text-sm font-mono">
                DID: {wallet.did.slice(0, 20)}...
              </p>
            ) : (
              <p className="text-purple-200 mt-1">Set up your digital identity</p>
            )}
          </div>
        </div>

        {wallet && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-white">{wallet.credentials.length}</p>
              <p className="text-sm text-purple-200">Credentials</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-white">
                {wallet.credentials.filter((c) => c.status === "valid").length}
              </p>
              <p className="text-sm text-purple-200">Verified</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-white">
                {wallet.credentials.filter((c) => c.status === "expired").length}
              </p>
              <p className="text-sm text-purple-200">Expired</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* KYC Status */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">KYC Verification</h2>
          {kycStatus ? (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  kycStatus.status === "verified" ? "bg-green-500/20" : "bg-amber-500/20"
                }`}>
                  <ShieldCheck className={`w-6 h-6 ${
                    kycStatus.status === "verified" ? "text-green-400" : "text-amber-400"
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-white capitalize">{kycStatus.status}</p>
                  <p className="text-sm text-gray-500">Level {kycStatus.level}</p>
                </div>
              </div>
              <div className="space-y-2">
                {kycStatus.documents?.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300 text-sm">{doc.type}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      doc.verified ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                    }`}>
                      {doc.verified ? "Verified" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <LockClosedSolid className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="font-medium text-white mt-4">Not Yet Verified</h3>
              <p className="text-sm text-gray-500 mt-1">
                Complete KYC verification to unlock all features
              </p>
              <button className="mt-4 px-6 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors font-medium">
                Start Verification
              </button>
            </div>
          )}
        </div>

        {/* Privacy Preferences */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Privacy Preferences</h2>
          {consents ? (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
              {consents.map((consent) => (
                <div key={consent.purpose} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="font-medium text-white text-sm">{consent.purpose}</p>
                    <p className="text-xs text-gray-500">{consent.description}</p>
                  </div>
                  <button
                    onClick={() => handleConsentToggle(consent.purpose, !consent.granted)}
                    className={`w-11 h-6 rounded-full transition-colors ${
                      consent.granted ? "bg-cyan-500" : "bg-gray-600"
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      consent.granted ? "translate-x-5" : "translate-x-0.5"
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
              <p className="text-gray-500">Loading preferences...</p>
            </div>
          )}
        </div>
      </div>

      {/* Credentials */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-white mb-4">My Credentials</h2>
        {walletLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : wallet && wallet.credentials.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {wallet.credentials.map((credential) => (
              <div key={credential.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      credential.status === "valid" ? "bg-green-500/20" : "bg-gray-500/20"
                    }`}>
                      <CheckCircle className={`w-5 h-5 ${
                        credential.status === "valid" ? "text-green-400" : "text-gray-500"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-white">{credential.type}</p>
                      <p className="text-xs text-gray-500">{credential.issuer}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    credential.status === "valid" ? "bg-green-500/20 text-green-400" :
                    credential.status === "expired" ? "bg-red-500/20 text-red-400" :
                    "bg-gray-500/20 text-gray-400"
                  }`}>
                    {credential.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Expires: {new Date(credential.expirationDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
            <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7 text-gray-500" />
            </div>
            <h3 className="font-medium text-white mt-4">No Credentials Yet</h3>
            <p className="text-sm text-gray-500 mt-1">
              Your verified credentials will appear here
            </p>
            <button className="mt-4 px-6 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors font-medium">
              Request Credential
            </button>
          </div>
        )}
      </div>

      {/* Data Export */}
      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-2">Your Data</h2>
        <p className="text-sm text-gray-400 mb-4">
          Download a copy of your data or request account deletion
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
            Download My Data
          </button>
          <button className="px-4 py-2 text-sm font-medium text-red-400 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </AccountLayout>
  )
}
