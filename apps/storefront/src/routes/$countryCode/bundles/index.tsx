import { createFileRoute } from "@tanstack/react-router"
import { useBundles } from "../../../lib/hooks/use-marketplace"
import { BundleCard } from "../../../components/promotions/BundleCard"

export const Route = createFileRoute("/$countryCode/bundles/")({
  component: BundlesPage,
})

function BundlesPage() {
  const { countryCode } = Route.useParams()
  const { data: bundles, isLoading } = useBundles()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bundle & Save</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get more for less with our curated product bundles
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : bundles && bundles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bundles.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} countryCode={countryCode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No bundles available at the moment</p>
          </div>
        )}
      </div>
    </div>
  )
}
