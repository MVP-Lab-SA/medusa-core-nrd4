import { createFileRoute } from "@tanstack/react-router"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { ShieldCheck, Plus, ArrowDownTray, ArrowUpRightMini, Check, Clock, XCircle } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/account/credentials")({
  component: CredentialsPage,
})

function CredentialsPage() {
  const { countryCode } = Route.useParams()

  const credentials = [
    {
      id: "cred-1",
      type: "Age Verification",
      issuer: "Dakkah CityOS Platform",
      issuedDate: "2024-01-15",
      expiryDate: "2025-01-15",
      status: "active" as const,
    },
    {
      id: "cred-2",
      type: "Residency Proof",
      issuer: "Dakkah CityOS Platform",
      issuedDate: "2024-01-10",
      expiryDate: "2025-01-10",
      status: "active" as const,
    },
    {
      id: "cred-3",
      type: "KYC Verification",
      issuer: "Dakkah CityOS Platform",
      issuedDate: "2024-01-05",
      expiryDate: null,
      status: "active" as const,
    },
    {
      id: "cred-4",
      type: "Professional License",
      issuer: "Business Registry",
      issuedDate: "2023-06-01",
      expiryDate: "2024-06-01",
      status: "expired" as const,
    },
  ]

  const pendingVerifications = [
    { type: "Driver's License", status: "pending", submittedDate: "2024-01-18" },
  ]

  const statusConfig = {
    active: { label: "Active", color: "bg-green-500/20 text-green-400", icon: Check },
    expired: { label: "Expired", color: "bg-red-500/20 text-red-400", icon: XCircle },
    pending: { label: "Pending", color: "bg-amber-500/20 text-amber-400", icon: Clock },
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/credentials`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">My Credentials</h1>
          <p className="text-gray-400 mt-1">Your verified digital credentials and certificates</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400">
          <Plus className="w-4 h-4" />
          Add Credential
        </button>
      </div>

      {/* Pending Verifications */}
      {pendingVerifications.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Pending Verifications
          </h2>
          <div className="space-y-3">
            {pendingVerifications.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-900 p-4 rounded-lg">
                <div>
                  <p className="font-medium text-white">{item.type}</p>
                  <p className="text-sm text-gray-500">Submitted: {item.submittedDate}</p>
                </div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm">
                  Under Review
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Credentials */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Verified Credentials</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {credentials.filter(c => c.status === "active").map((credential) => (
            <div key={credential.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{credential.type}</h3>
                    <p className="text-sm text-gray-500">Issued by {credential.issuer}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Active
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-500">Issued</p>
                  <p className="font-medium text-white">{credential.issuedDate}</p>
                </div>
                <div>
                  <p className="text-gray-500">Expires</p>
                  <p className="font-medium text-white">{credential.expiryDate || "Never"}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-800">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 text-sm">
                  <ArrowDownTray className="w-4 h-4" />
                  Export
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 text-sm">
                  <ArrowUpRightMini className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expired Credentials */}
      {credentials.some(c => c.status === "expired") && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Expired Credentials</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {credentials.filter(c => c.status === "expired").map((credential) => (
              <div key={credential.id} className="bg-gray-900 border border-red-500/30 rounded-xl p-6 opacity-75">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{credential.type}</h3>
                      <p className="text-sm text-gray-500">Issued by {credential.issuer}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    Expired
                  </span>
                </div>
                <div className="text-sm mb-4">
                  <p className="text-gray-500">Expired on</p>
                  <p className="font-medium text-red-400">{credential.expiryDate}</p>
                </div>
                <button className="w-full py-2 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 text-sm">
                  Renew Credential
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </AccountLayout>
  )
}
