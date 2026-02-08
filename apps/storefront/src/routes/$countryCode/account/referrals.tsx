import { createFileRoute } from "@tanstack/react-router"
import { useReferralProgram, useReferralStats } from "../../../lib/hooks/use-marketplace"
import { ReferralCard } from "../../../components/promotions/ReferralCard"

export const Route = createFileRoute("/$countryCode/account/referrals")({
  component: ReferralsDashboard,
})

function ReferralsDashboard() {
  const { data: program, isLoading: programLoading } = useReferralProgram()
  const { data: stats, isLoading: statsLoading } = useReferralStats()

  const isLoading = programLoading || statsLoading

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Referrals</h1>

        {isLoading ? (
          <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
        ) : program ? (
          <div className="space-y-6">
            <ReferralCard
              program={program}
              referralCode={stats?.referralCode || "DEMO123"}
              referralCount={stats?.totalReferrals || 0}
              totalEarned={stats?.totalEarned || 0}
            />

            {stats?.referrals && stats.referrals.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Referral History</h2>
                <div className="space-y-3">
                  {stats.referrals.map((ref, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{ref.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(ref.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          +{new Intl.NumberFormat("en", {
                            style: "currency",
                            currency: program.currency,
                          }).format(ref.reward)}
                        </p>
                        <p className={`text-xs ${ref.status === "completed" ? "text-green-600" : "text-yellow-600"}`}>
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
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">Referral program not available</p>
          </div>
        )}
      </div>
    </div>
  )
}
