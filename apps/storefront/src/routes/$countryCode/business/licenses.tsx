import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { FileText, Upload, CheckCircle, Clock, XCircle, Download, Eye, Plus } from "lucide-react"

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

  const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    active: { label: "Active", color: "bg-green-100 text-green-700", icon: CheckCircle },
    expiring_soon: { label: "Expiring Soon", color: "bg-amber-100 text-amber-700", icon: Clock },
    expired: { label: "Expired", color: "bg-red-100 text-red-700", icon: XCircle },
    pending: { label: "Pending Review", color: "bg-blue-100 text-blue-700", icon: Clock },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Business Licenses</h1>
          <p className="text-gray-600">Manage your business licenses and permits</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Upload License
        </button>
      </div>

      {/* Alerts */}
      {licenses.some(l => l.status === "expiring_soon" || l.status === "expired") && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-amber-800 font-medium">
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
            <div key={license.id} className={`bg-white border rounded-xl p-6 ${
              license.status === "expired" ? "border-red-200" : 
              license.status === "expiring_soon" ? "border-amber-200" : ""
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    license.status === "active" ? "bg-green-100" :
                    license.status === "expiring_soon" ? "bg-amber-100" :
                    "bg-red-100"
                  }`}>
                    <FileText className={`w-6 h-6 ${
                      license.status === "active" ? "text-green-600" :
                      license.status === "expiring_soon" ? "text-amber-600" :
                      "text-red-600"
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{license.type}</h3>
                    <p className="text-sm text-gray-500">{license.number}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${status.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-500">Issuer</p>
                  <p className="font-medium">{license.issuer}</p>
                </div>
                <div>
                  <p className="text-gray-500">Issued Date</p>
                  <p className="font-medium">{license.issuedDate}</p>
                </div>
                <div>
                  <p className="text-gray-500">Expiry Date</p>
                  <p className={`font-medium ${
                    license.status === "expired" ? "text-red-600" :
                    license.status === "expiring_soon" ? "text-amber-600" :
                    ""
                  }`}>
                    {license.expiryDate || "No Expiry"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                {(license.status === "expired" || license.status === "expiring_soon") && (
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Upload New License</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">License Type</label>
                <select className="w-full px-4 py-2 border rounded-lg">
                  <option>Commercial Registration</option>
                  <option>Tax Registration</option>
                  <option>Health & Safety Permit</option>
                  <option>Import/Export License</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">License Number</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter license number" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Upload Document</label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
