import { createFileRoute, Link } from "@tanstack/react-router"
import { useSubscriptions } from "../../../lib/hooks/use-marketplace"
import { SubscriptionStatus } from "../../../components/subscriptions/SubscriptionStatus"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { Plus } from "@medusajs/icons"

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
    <AccountLayout currentPath={`/${countryCode}/account/subscriptions`}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">My Subscriptions</h1>
        <Link
          to={`/${countryCode}/subscriptions`}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400"
        >
          <Plus className="w-4 h-4" />
          Browse Plans
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {active.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Active Subscriptions</h2>
              <div className="space-y-4">
                {active.map((sub) => (
                  <div key={sub.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{sub.planName}</h3>
                        <p className="text-sm text-gray-400">{sub.interval} billing</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
                        {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mb-4">
                      <p>Next billing: {new Date(sub.nextBillingDate).toLocaleDateString()}</p>
                      <p className="text-lg font-semibold text-white mt-1">${sub.price}/{sub.interval}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePause(sub.id)}
                        className="px-3 py-1.5 text-sm bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
                      >
                        Pause
                      </button>
                      <button
                        onClick={() => handleCancel(sub.id)}
                        className="px-3 py-1.5 text-sm bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {paused.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Paused</h2>
              <div className="space-y-4">
                {paused.map((sub) => (
                  <div key={sub.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4 opacity-70">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{sub.planName}</h3>
                        <p className="text-sm text-gray-400">{sub.interval} billing</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400">
                        Paused
                      </span>
                    </div>
                    <button
                      onClick={() => handleResume(sub.id)}
                      className="px-3 py-1.5 text-sm bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
                    >
                      Resume
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {canceled.length > 0 && (
            <div className="opacity-50">
              <h2 className="text-lg font-semibold text-white mb-4">Canceled</h2>
              <div className="space-y-4">
                {canceled.map((sub) => (
                  <div key={sub.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{sub.planName}</h3>
                        <p className="text-sm text-gray-400">Canceled</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-500/20 text-red-400">
                        Canceled
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {subscriptions?.length === 0 && (
            <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
              <p className="text-gray-400 mb-4">No active subscriptions</p>
              <Link
                to={`/${countryCode}/subscriptions`}
                className="px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400"
              >
                Browse Subscription Plans
              </Link>
            </div>
          )}
        </>
      )}
    </AccountLayout>
  )
}
