import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { DocumentText, ArrowUpTray, CheckCircleSolid, Clock, XCircleSolid, ArrowDownTray, Eye, Plus } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/business/licenses")({
  component: BusinessLicensesPage,
})

function BusinessLicensesPage() {
  const [showUploadModal, setShowUploadModal] = useState(false)

  const licenses = [
    {
      id: "lic-1",
      type: "Commercial Registration",
      number: "CR-2024-001234",
      issuer: "Ministry of Commerce",
      issuedDate: "2024-01-01",
      expiryDate: "2025-01-01",
      status: "active",
    },
    {
      id: "lic-2",
      type: "Tax Registration Certificate",
      number: "TAX-2024-5678",
      issuer: "Tax Authority",
      issuedDate: "2024-01-01",
      expiryDate: null,
      status: "active",
    },
    {
      id: "lic-3",
      type: "Health & Safety Permit",
      number: "HS-2023-9012",
      issuer: "Health Department",
      issuedDate: "2023-06-01",
      expiryDate: "2024-06-01",
      status: "expiring_soon",
    },
    {
      id: "lic-4",
      type: "Import License",
      number: "IMP-2022-3456",
      issuer: "Customs Authority",
      issuedDate: "2022-01-01",
      expiryDate: "2024-01-01",
      status: "expired",
    },
  ]

  const statusConfig: Record<string, { label: string; bgColor: string; textColor: string; icon: React.ElementType }> = {
    active: { label: "Active", bgColor: "bg-emerald-500/20", textColor: "text-emerald-400", icon: CheckCircleSolid },
    expiring_soon: { label: "Expiring Soon", bgColor: "bg-amber-500/20", textColor: "text-amber-400", icon: Clock },
    expired: { label: "Expired", bgColor: "bg-red-500/20", textColor: "text-red-400", icon: XCircleSolid },
    pending: { label: "Pending Review", bgColor: "bg-cyan-500/20", textColor: "text-cyan-400", icon: Clock },
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Business Licenses</h1>
            <p className="text-gray-400">Manage your business licenses and permits</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-cyan-500 text-black px-4 py-2 rounded-lg hover:bg-cyan-400 flex items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" />
            Upload License
          </button>
        </div>

        {/* Alerts */}
        {licenses.some(l => l.status === "expiring_soon" || l.status === "expired") && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
            <p className="text-amber-300 font-medium">
              {licenses.filter(l => l.status === "expired").length > 0 && 
                `${licenses.filter(l => l.status === "expired").length} expired license(s) need renewal. `}
              {licenses.filter(l => l.status === "expiring_soon").length > 0 && 
                `${licenses.filter(l => l.status === "expiring_soon").length} license(s) expiring soon.`}
            </p>
          </div>
        )}

        {/* Licenses Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {licenses.map((license) => {
            const status = statusConfig[license.status]
            const StatusIcon = status.icon

            return (
              <div key={license.id} className={`bg-gray-900 border rounded-xl p-6 ${
                license.status === "expired" ? "border-red-500/30" : 
                license.status === "expiring_soon" ? "border-amber-500/30" : "border-gray-800"
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      license.status === "active" ? "bg-emerald-500/20" :
                      license.status === "expiring_soon" ? "bg-amber-500/20" :
                      "bg-red-500/20"
                    }`}>
                      <DocumentText className={`w-6 h-6 ${
                        license.status === "active" ? "text-emerald-400" :
                        license.status === "expiring_soon" ? "text-amber-400" :
                        "text-red-400"
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{license.type}</h3>
                      <p className="text-sm text-gray-500">{license.number}</p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${status.bgColor} ${status.textColor}`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Issuer</p>
                    <p className="font-medium text-white">{license.issuer}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Issued Date</p>
                    <p className="font-medium text-white">{license.issuedDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Expiry Date</p>
                    <p className={`font-medium ${
                      license.status === "expired" ? "text-red-400" :
                      license.status === "expiring_soon" ? "text-amber-400" :
                      "text-white"
                    }`}>
                      {license.expiryDate || "No Expiry"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-800">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 text-sm text-white">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 text-sm text-white">
                    <ArrowDownTray className="w-4 h-4" />
                    Download
                  </button>
                  {(license.status === "expired" || license.status === "expiring_soon") && (
                    <button className="flex-1 px-3 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 text-sm font-medium">
                      Renew
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-white mb-4">Upload New License</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">License Type</label>
                  <select className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg">
                    <option>Commercial Registration</option>
                    <option>Tax Registration</option>
                    <option>Health & Safety Permit</option>
                    <option>Import/Export License</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">License Number</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg" placeholder="Enter license number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Upload Document</label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-gray-600 cursor-pointer">
                    <ArrowUpTray className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Click to upload or drag and drop</p>
                    <input type="file" className="hidden" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-700 text-white rounded-lg hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 font-medium">
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
