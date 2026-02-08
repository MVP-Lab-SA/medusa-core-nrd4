import { createFileRoute, Link } from "@tanstack/react-router"
import { useSubscriptions } from "../../../lib/hooks/use-marketplace"
import { SubscriptionStatus } from "../../../components/subscriptions/SubscriptionStatus"

export const Route = createFileRoute("/$countryCode/account/subscriptions")({
  component: SubscriptionsPage,
})

function SubscriptionsPage() {
  const { countryCode } = Route.useParams()
  const { data: subscriptions, isLoading } = useSubscriptions()

  const handlePause = (id: string) => {
    console.log("Pause:", id)
  }

  const handleResume = (id: string) => {
    console.log("Resume:", id)
  }

  const handleCancel = (id: string) => {
    console.log("Cancel:", id)
  }

  const active = subscriptions?.filter((s) => s.status === "active" || s.status === "trialing") || []
  const paused = subscriptions?.filter((s) => s.status === "paused") || []
  const canceled = subscriptions?.filter((s) => s.status === "canceled") || []

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Subscriptions</h1>
          <Link
            to={`/${countryCode}/subscriptions`}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Browse Plans
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {active.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Subscriptions</h2>
                <div className="space-y-4">
                  {active.map((sub) => (
                    <SubscriptionStatus
                      key={sub.id}
                      subscription={sub}
                      onPause={() => handlePause(sub.id)}
                      onCancel={() => handleCancel(sub.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {paused.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Paused</h2>
                <div className="space-y-4">
                  {paused.map((sub) => (
                    <SubscriptionStatus
                      key={sub.id}
                      subscription={sub}
                      onResume={() => handleResume(sub.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {canceled.length > 0 && (
              <div className="opacity-70">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Canceled</h2>
                <div className="space-y-4">
                  {canceled.map((sub) => (
                    <SubscriptionStatus key={sub.id} subscription={sub} />
                  ))}
                </div>
              </div>
            )}

            {subscriptions?.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500 mb-4">No active subscriptions</p>
                <Link
                  to={`/${countryCode}/subscriptions`}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                >
                  Browse Subscription Plans
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
