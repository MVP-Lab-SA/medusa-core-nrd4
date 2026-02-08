import { createFileRoute } from "@tanstack/react-router"
import { CredentialCard, VerificationStatus } from "~/components/identity"
import { Shield, Plus, Download, Share2, CheckCircle, Clock, XCircle } from "lucide-react"

export const Route = createFileRoute("/$countryCode/account/credentials")({
  component: CredentialsPage,
})

function CredentialsPage() {
  const credentials = [
    {
      id: "cred-1",
      type: "Age Verification",
      issuer: "City Commerce Platform",
      issuedDate: "2024-01-15",
      expiryDate: "2025-01-15",
      status: "active",
      icon: "shield",
    },
    {
      id: "cred-2",
      type: "Residency Proof",
      issuer: "City Commerce Platform",
      issuedDate: "2024-01-10",
      expiryDate: "2025-01-10",
      status: "active",
      icon: "home",
    },
    {
      id: "cred-3",
      type: "KYC Verification",
      issuer: "City Commerce Platform",
      issuedDate: "2024-01-05",
      expiryDate: null,
      status: "active",
      icon: "user-check",
    },
    {
      id: "cred-4",
      type: "Professional License",
      issuer: "Business Registry",
      issuedDate: "2023-06-01",
      expiryDate: "2024-06-01",
      status: "expired",
      icon: "briefcase",
    },
  ]

  const pendingVerifications = [
    { type: "Driver's License", status: "pending", submittedDate: "2024-01-18" },
  ]

  const statusConfig = {
    active: { label: "Active", color: "text-green-600 bg-green-100", icon: CheckCircle },
    expired: { label: "Expired", color: "text-red-600 bg-red-100", icon: XCircle },
    pending: { label: "Pending", color: "text-amber-600 bg-amber-100", icon: Clock },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Credentials</h1>
          <p className="text-gray-600">Your verified digital credentials and certificates</p>
        </div>
        <a
          href="/verify"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Credential
        </a>
      </div>

      {/* Pending Verifications */}
      {pendingVerifications.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            Pending Verifications
          </h2>
          <div className="space-y-3">
            {pendingVerifications.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg">
                <div>
                  <p className="font-medium">{item.type}</p>
                  <p className="text-sm text-gray-500">Submitted: {item.submittedDate}</p>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                  Under Review
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Credentials */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Verified Credentials</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {credentials.filter(c => c.status === "active").map((credential) => (
            <div key={credential.id} className="bg-white border rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{credential.type}</h3>
                    <p className="text-sm text-gray-500">Issued by {credential.issuer}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Active
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-500">Issued</p>
                  <p className="font-medium">{credential.issuedDate}</p>
                </div>
                <div>
                  <p className="text-gray-500">Expires</p>
                  <p className="font-medium">{credential.expiryDate || "Never"}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                  <Share2 className="w-4 h-4" />
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
          <h2 className="text-lg font-semibold mb-4">Expired Credentials</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {credentials.filter(c => c.status === "expired").map((credential) => (
              <div key={credential.id} className="bg-white border border-red-200 rounded-xl p-6 opacity-75">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{credential.type}</h3>
                      <p className="text-sm text-gray-500">Issued by {credential.issuer}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    Expired
                  </span>
                </div>
                <div className="text-sm mb-4">
                  <p className="text-gray-500">Expired on</p>
                  <p className="font-medium text-red-600">{credential.expiryDate}</p>
                </div>
                <button className="w-full py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 text-sm">
                  Renew Credential
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
