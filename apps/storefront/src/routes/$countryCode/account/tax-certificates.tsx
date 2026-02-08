import { createFileRoute } from "@tanstack/react-router"
import { useTaxCertificates } from "../../../lib/hooks/use-erpnext"
import { TaxCertificateUpload } from "../../../components/finance/TaxCertificateUpload"

export const Route = createFileRoute("/$countryCode/account/tax-certificates")({
  component: TaxCertificatesPage,
})

function TaxCertificatesPage() {
  const { data: certificates, isLoading } = useTaxCertificates()

  const handleUpload = (file: File, type: string) => {
    console.log("Upload certificate:", file.name, type)
    alert("Certificate uploaded successfully. It will be reviewed within 2 business days.")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Tax Certificates</h1>

        {isLoading ? (
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <TaxCertificateUpload
              certificates={certificates || []}
              onUpload={handleUpload}
            />
          </div>
        )}
      </div>
    </div>
  )
}
