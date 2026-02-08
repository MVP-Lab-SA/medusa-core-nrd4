import { createFileRoute } from "@tanstack/react-router"
import { useLicenseKeys } from "../../../lib/hooks/use-marketplace"
import { LicenseKeyDisplay } from "../../../components/digital/LicenseKeyDisplay"

export const Route = createFileRoute("/$countryCode/account/licenses")({
  component: LicensesPage,
})

function LicensesPage() {
  const { data: licenses, isLoading } = useLicenseKeys()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My License Keys</h1>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : licenses && licenses.length > 0 ? (
          <div className="space-y-4">
            {licenses.map((license) => (
              <LicenseKeyDisplay key={license.id} license={license} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No license keys found</p>
          </div>
        )}
      </div>
    </div>
  )
}
