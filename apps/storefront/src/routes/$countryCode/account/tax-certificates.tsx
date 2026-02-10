import { createFileRoute } from "@tanstack/react-router"
import { useTaxCertificates } from "../../../lib/hooks/use-erpnext"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { DocumentText, Plus, Check, Clock, ArrowUpTray, Trash } from "@medusajs/icons"
import { useState } from "react"

export const Route = createFileRoute("/$countryCode/account/tax-certificates")({
  component: TaxCertificatesPage,
})

function TaxCertificatesPage() {
  const { countryCode } = Route.useParams()
  // TODO: Get actual customer ID from auth context
  const customerId = "mock-customer-id"
  const { data: certificates, isLoading } = useTaxCertificates(customerId)
  const [showUpload, setShowUpload] = useState(false)

  const handleUpload = (file: File, type: string) => {
    console.log("Upload certificate:", file.name, type)
    alert("Certificate uploaded successfully. It will be reviewed within 2 business days.")
    setShowUpload(false)
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "approved":
        return { label: "Approved", color: "bg-green-500/20 text-green-400", icon: Check }
      case "pending":
        return { label: "Pending Review", color: "bg-amber-500/20 text-amber-400", icon: Clock }
      case "rejected":
        return { label: "Rejected", color: "bg-red-500/20 text-red-400", icon: Trash }
      default:
        return { label: status, color: "bg-gray-500/20 text-gray-400", icon: Clock }
    }
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/tax-certificates`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Tax Certificates</h1>
          <p className="text-gray-400 mt-1">Upload and manage your tax exemption certificates</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400"
        >
          <Plus className="w-4 h-4" />
          Upload Certificate
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-8">
        <p className="text-cyan-300 text-sm">
          Upload valid tax exemption certificates to qualify for tax-free purchases. 
          Certificates are reviewed within 2 business days.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : certificates && certificates.length > 0 ? (
        <div className="space-y-4">
          {certificates.map((cert) => {
            const status = getStatusConfig(cert.status)
            const StatusIcon = status.icon

            return (
              <div key={cert.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                      <DocumentText className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white capitalize">{cert.type || "Tax Exemption Certificate"}</h3>
                      <p className="text-sm text-gray-500">
                        Uploaded: {cert.createdAt ? new Date(cert.createdAt).toLocaleDateString() : "N/A"}
                      </p>
                      {cert.validUntil && (
                        <p className="text-sm text-gray-500">
                          Expires: {new Date(cert.validUntil).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${status.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                </div>

                {cert.status === "rejected" && (
                  <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-red-400 text-sm">
                      Certificate was rejected. Please upload a new document.
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800">
          <DocumentText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No tax certificates uploaded</p>
          <p className="text-sm text-gray-500 mt-2">
            Upload a tax exemption certificate to qualify for tax-free purchases
          </p>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-white mb-4">Upload Tax Certificate</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Certificate Type</label>
                <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  <option value="">Select type</option>
                  <option value="resale">Resale Certificate</option>
                  <option value="exemption">Tax Exemption Certificate</option>
                  <option value="nonprofit">Non-Profit Certificate</option>
                  <option value="government">Government Entity</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Upload File</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-cyan-500/50 transition-colors">
                  <ArrowUpTray className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    PDF, JPG, PNG up to 10MB
                  </p>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowUpload(false)}
                className="flex-1 py-2.5 text-gray-400 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpload(new File([], "test.pdf"), "exemption")}
                className="flex-1 py-2.5 text-black bg-cyan-500 rounded-lg hover:bg-cyan-400 transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  )
}
