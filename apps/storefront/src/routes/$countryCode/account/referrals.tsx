import { createFileRoute } from "@tanstack/react-router"
import { useReferralProgram, useReferralStats } from "../../../lib/hooks/use-marketplace"
import { ReferralCard } from "../../../components/promotions/ReferralCard"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { Gift, Users, CurrencyDollar } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/account/referrals")({
  component: ReferralsDashboard,
})

function ReferralsDashboard() {
  const { countryCode } = Route.useParams()
  const { data: program, isLoading: programLoading } = useReferralProgram()
  const { data: stats, isLoading: statsLoading } = useReferralStats()

  const isLoading = programLoading || statsLoading

  return (
    <AccountLayout currentPath={`/${countryCode}/account/referrals`}>
      <h1 className="text-2xl font-bold text-white mb-8">My Referrals</h1>

      {isLoading ? (
        <div className="h-64 bg-gray-800 rounded-xl animate-pulse" />
      ) : program ? (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-sm text-gray-400">Total Referrals</span>
              </div>
              <p className="text-2xl font-bold text-white">{stats?.totalReferrals || 0}</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CurrencyDollar className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-sm text-gray-400">Total Earned</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {new Intl.NumberFormat("en", {
                  style: "currency",
                  currency: program.currency,
                }).format(stats?.totalEarned || 0)}
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Gift className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-sm text-gray-400">Reward Per Referral</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {new Intl.NumberFormat("en", {
                  style: "currency",
                  currency: program.currency,
                }).format(program.referrerReward)}
              </p>
            </div>
          </div>

          {/* Referral Code */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Your Referral Code</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-800 rounded-lg px-4 py-3">
                <code className="text-lg font-mono text-cyan-400">{stats?.referralCode || "DEMO123"}</code>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(stats?.referralCode || "DEMO123")}
                className="px-4 py-3 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400"
              >
                Copy
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-3">
              Share this code with friends and you'll both get {new Intl.NumberFormat("en", {
                style: "currency",
                currency: program.currency,
              }).format(program.referrerReward)} when they make their first purchase!
            </p>
          </div>

          {/* Referral History */}
          {stats?.referrals && stats.referrals.length > 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Referral History</h2>
              <div className="space-y-3">
                {stats.referrals.map((ref, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-white">{ref.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(ref.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-400">
                        +{new Intl.NumberFormat("en", {
                          style: "currency",
                          currency: program.currency,
                        }).format(ref.reward)}
                      </p>
                      <p className={`text-xs ${ref.status === "completed" ? "text-green-400" : "text-yellow-400"}`}>
                        {ref.status.charAt(0).toUpperCase() + ref.status.slice(1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
          <p className="text-gray-400">Referral program not available</p>
        </div>
      )}
    </AccountLayout>
  )
}
