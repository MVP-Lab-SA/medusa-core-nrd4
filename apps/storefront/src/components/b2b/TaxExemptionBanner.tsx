import { CheckCircle, ExclamationCircle } from "@medusajs/icons"

interface TaxExemptionBannerProps {
  isExempt: boolean
  certificateExpiry?: string
  onUploadCertificate?: () => void
}

export function TaxExemptionBanner({ isExempt, certificateExpiry, onUploadCertificate }: TaxExemptionBannerProps) {
  const isExpired = certificateExpiry ? new Date(certificateExpiry) < new Date() : false
  const isExpiringSoon = certificateExpiry 
    ? new Date(certificateExpiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) 
    : false

  if (!isExempt) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ExclamationCircle className="w-5 h-5 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">Tax Exemption Not Active</p>
            <p className="text-sm text-gray-500">Upload a valid tax exemption certificate</p>
          </div>
        </div>
        {onUploadCertificate && (
          <button
            onClick={onUploadCertificate}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Upload Certificate
          </button>
        )}
      </div>
    )
  }

  if (isExpired) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ExclamationCircle className="w-5 h-5 text-red-500" />
          <div>
            <p className="font-medium text-red-900">Tax Certificate Expired</p>
            <p className="text-sm text-red-600">
              Expired on {new Date(certificateExpiry!).toLocaleDateString()}
            </p>
          </div>
        </div>
        {onUploadCertificate && (
          <button
            onClick={onUploadCertificate}
            className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Renew Certificate
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={`${isExpiringSoon ? "bg-yellow-50 border-yellow-200" : "bg-green-50 border-green-200"} border rounded-lg p-4 flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        <CheckCircle className={`w-5 h-5 ${isExpiringSoon ? "text-yellow-500" : "text-green-500"}`} />
        <div>
          <p className={`font-medium ${isExpiringSoon ? "text-yellow-900" : "text-green-900"}`}>
            Tax Exempt {isExpiringSoon && "(Expiring Soon)"}
          </p>
          {certificateExpiry && (
            <p className={`text-sm ${isExpiringSoon ? "text-yellow-600" : "text-green-600"}`}>
              Valid until {new Date(certificateExpiry).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
