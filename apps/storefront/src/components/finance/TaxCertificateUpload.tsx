import { useState } from "react"
import { ArrowUpTray, DocumentText, CheckCircle, Clock, XCircle } from "@medusajs/icons"

interface TaxCertificate {
  id: string
  type: string
  status: "pending" | "approved" | "rejected" | "expired"
  expiryDate: string
}

interface TaxCertificateUploadProps {
  certificates: TaxCertificate[]
  onUpload: (file: File, type: string) => void
  isUploading?: boolean
}

const statusConfig = {
  pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-100", label: "Pending Review" },
  approved: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100", label: "Approved" },
  rejected: { icon: XCircle, color: "text-red-500", bg: "bg-red-100", label: "Rejected" },
  expired: { icon: Clock, color: "text-gray-500", bg: "bg-gray-100", label: "Expired" },
}

export function TaxCertificateUpload({ certificates, onUpload, isUploading }: TaxCertificateUploadProps) {
  const [selectedType, setSelectedType] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleUpload = () => {
    if (selectedFile && selectedType) {
      onUpload(selectedFile, selectedType)
      setSelectedFile(null)
      setSelectedType("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Existing Certificates */}
      {certificates.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Your Certificates</h4>
          {certificates.map((cert) => {
            const config = statusConfig[cert.status]
            const Icon = config.icon

            return (
              <div
                key={cert.id}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <DocumentText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">{cert.type}</h5>
                    <p className="text-sm text-gray-500">
                      Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg}`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                  <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Upload New */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <ArrowUpTray className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <h4 className="font-medium text-gray-900 mb-2">Upload Tax Certificate</h4>
          <p className="text-sm text-gray-500 mb-4">
            PDF or image files up to 10MB
          </p>

          <div className="max-w-xs mx-auto space-y-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select certificate type</option>
              <option value="sales_tax_exemption">Sales Tax Exemption</option>
              <option value="reseller_permit">Reseller Permit</option>
              <option value="non_profit">Non-Profit Status</option>
              <option value="government">Government Entity</option>
            </select>

            <label className="block">
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              <span className="w-full inline-block py-2 px-4 border border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50">
                {selectedFile ? selectedFile.name : "Choose File"}
              </span>
            </label>

            <button
              onClick={handleUpload}
              disabled={!selectedFile || !selectedType || isUploading}
              className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Upload Certificate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
