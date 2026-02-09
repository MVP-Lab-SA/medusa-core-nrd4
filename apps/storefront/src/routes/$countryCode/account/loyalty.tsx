import { createFileRoute } from "@tanstack/react-router"
import { useLoyaltyAccount, useRedemptionOptions, useRedeemPoints } from "../../../lib/hooks/use-payments"
import { useCustomer } from "../../../lib/context/customer-context"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { Gift, Star, Sparkles } from "@medusajs/icons"
import { useState } from "react"

export const Route = createFileRoute("/$countryCode/account/loyalty")({
  head: () => ({
    meta: [{ title: "Loyalty Rewards | Account | Store" }],
  }),
  component: LoyaltyPage,
})

function LoyaltyPage() {
  const { countryCode } = Route.useParams()
  const { customer } = useCustomer()
  const { data: account, isLoading } = useLoyaltyAccount(customer?.id || "")
  const { data: redemptionOptions } = useRedemptionOptions(account?.points || 0)
  const redeemMutation = useRedeemPoints()

  const [showRedeem, setShowRedeem] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleRedeem = async () => {
    if (!customer || !account || !selectedOption) return

    const option = redemptionOptions?.find((o) => o.id === selectedOption)
    if (!option) return

    try {
      await redeemMutation.mutateAsync({
        customerId: customer.id,
        points: option.pointsCost,
        description: `Redeemed for ${option.name}`,
      })
      setShowRedeem(false)
      setSelectedOption(null)
    } catch (error) {
      console.error("Redemption failed:", error)
    }
  }

  const tierBenefits = {
    bronze: ["Earn 1 point per $1 spent", "Birthday reward", "Member-only offers"],
    silver: ["Earn 1.5 points per $1 spent", "Free shipping on orders $50+", "Early access to sales"],
    gold: ["Earn 2 points per $1 spent", "Free shipping on all orders", "Priority customer service"],
    platinum: ["Earn 3 points per $1 spent", "Free expedited shipping", "Exclusive events access"],
  }

  const tierColors = {
    bronze: "from-amber-600 to-amber-800",
    silver: "from-gray-400 to-gray-600",
    gold: "from-yellow-500 to-yellow-700",
    platinum: "from-slate-600 to-slate-800",
  }

  if (!customer) {
    return (
      <AccountLayout currentPath={`/${countryCode}/account/loyalty`}>
        <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
          <p className="text-gray-400">Please log in to view your loyalty rewards.</p>
        </div>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/loyalty`}>
      <h1 className="text-2xl font-bold text-white mb-8">Loyalty Rewards</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Loyalty Card */}
        <div className="lg:col-span-1">
          {isLoading ? (
            <div className="h-48 bg-gray-800 rounded-xl animate-pulse" />
          ) : account ? (
            <div className={`bg-gradient-to-br ${tierColors[account.tier]} rounded-xl p-6 text-white`}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6" />
                <span className="font-medium capitalize">{account.tier} Member</span>
              </div>
              <p className="text-4xl font-bold mb-1">{account.points.toLocaleString()}</p>
              <p className="text-sm opacity-80 mb-4">Available Points</p>
              <button
                onClick={() => setShowRedeem(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Gift className="w-4 h-4" />
                Redeem Points
              </button>
            </div>
          ) : null}

          {/* Current Tier Benefits */}
          {account && (
            <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <h3 className="font-semibold text-white capitalize">
                  {account.tier} Benefits
                </h3>
              </div>
              <ul className="space-y-2">
                {tierBenefits[account.tier].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <Gift className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Transactions */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Points History</h2>
            {account?.transactions && account.transactions.length > 0 ? (
              <div className="space-y-3">
                {account.transactions.map((tx, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-white">{tx.description}</p>
                      <p className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`font-semibold ${tx.type === "earned" ? "text-green-400" : "text-red-400"}`}>
                      {tx.type === "earned" ? "+" : "-"}{tx.points} pts
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No transactions yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Tier Overview */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-white mb-4">Membership Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {(["bronze", "silver", "gold", "platinum"] as const).map((tier) => (
            <div
              key={tier}
              className={`bg-gray-900 rounded-xl border p-4 ${
                account?.tier === tier ? "border-cyan-500 ring-2 ring-cyan-500/20" : "border-gray-800"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tier === "bronze"
                      ? "bg-amber-600"
                      : tier === "silver"
                      ? "bg-gray-400"
                      : tier === "gold"
                      ? "bg-yellow-500"
                      : "bg-slate-600"
                  }`}
                >
                  <Star className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-white capitalize">{tier}</h3>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                {tier === "bronze" && "0 - 2,499 lifetime points"}
                {tier === "silver" && "2,500 - 9,999 lifetime points"}
                {tier === "gold" && "10,000 - 24,999 lifetime points"}
                {tier === "platinum" && "25,000+ lifetime points"}
              </p>
              <ul className="space-y-1">
                {tierBenefits[tier].slice(0, 2).map((benefit, i) => (
                  <li key={i} className="text-xs text-gray-400">
                    {benefit}
                  </li>
                ))}
              </ul>
              {account?.tier === tier && (
                <span className="inline-block mt-2 px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                  Current Tier
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Redemption Modal */}
      {showRedeem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-white">Redeem Points</h2>
            <p className="text-gray-400 mt-1">
              You have {account?.points.toLocaleString()} points available
            </p>

            <div className="mt-6 space-y-3">
              {redemptionOptions?.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                    selectedOption === option.id
                      ? "border-cyan-500 bg-cyan-500/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{option.name}</span>
                    <span className="text-sm text-gray-400">
                      {option.pointsCost.toLocaleString()} pts
                    </span>
                  </div>
                </button>
              ))}

              {(!redemptionOptions || redemptionOptions.length === 0) && (
                <p className="text-center text-gray-500 py-4">
                  You need more points to redeem rewards.
                </p>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setShowRedeem(false)
                  setSelectedOption(null)
                }}
                className="flex-1 py-2.5 text-gray-400 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRedeem}
                disabled={!selectedOption || redeemMutation.isPending}
                className="flex-1 py-2.5 text-black bg-cyan-500 rounded-lg hover:bg-cyan-400 disabled:bg-gray-600 transition-colors"
              >
                {redeemMutation.isPending ? "Processing..." : "Redeem"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  )
}
