import { useLoyaltyAccount, useRedemptionOptions, useRedeemPoints } from "@/lib/hooks/use-payments"
import { LoyaltyCard, LoyaltyTransactions } from "@/components/ui/wallet-card"
import { useCustomer } from "@/lib/context/customer-context"
import { Gift, Star, AcademicCap, StarSolid } from "@medusajs/icons"
import { useState } from "react"

interface AccountLoyaltyPageProps {
  countryCode: string
}

export default function AccountLoyaltyPage({ countryCode }: AccountLoyaltyPageProps) {
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

  const tierIcons = {
    bronze: <Star className="w-6 h-6" />,
    silver: <Star className="w-6 h-6" />,
    gold: <AcademicCap className="w-6 h-6" />,
    platinum: <StarSolid className="w-6 h-6" />,
  }

  if (!customer) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Please log in to view your loyalty rewards.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Loyalty Rewards</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Loyalty Card */}
        <div className="lg:col-span-1">
          {isLoading ? (
            <div className="h-48 bg-gray-200 rounded-xl animate-pulse" />
          ) : account ? (
            <LoyaltyCard account={account} onRedeem={() => setShowRedeem(true)} />
          ) : null}

          {/* Current Tier Benefits */}
          {account && (
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-yellow-500">{tierIcons[account.tier]}</div>
                <h3 className="font-semibold text-gray-900 capitalize">
                  {account.tier} Benefits
                </h3>
              </div>
              <ul className="space-y-2">
                {tierBenefits[account.tier].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Gift className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Transactions */}
        <div className="lg:col-span-2">
          {account && <LoyaltyTransactions transactions={account.transactions} />}
        </div>
      </div>

      {/* Tier Overview */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Membership Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {(["bronze", "silver", "gold", "platinum"] as const).map((tier) => (
            <div
              key={tier}
              className={`bg-white rounded-lg border p-4 ${
                account?.tier === tier ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={
                    tier === "bronze"
                      ? "text-amber-600"
                      : tier === "silver"
                      ? "text-gray-400"
                      : tier === "gold"
                      ? "text-yellow-500"
                      : "text-slate-700"
                  }
                >
                  {tierIcons[tier]}
                </div>
                <h3 className="font-semibold text-gray-900 capitalize">{tier}</h3>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                {tier === "bronze" && "0 - 2,499 lifetime points"}
                {tier === "silver" && "2,500 - 9,999 lifetime points"}
                {tier === "gold" && "10,000 - 24,999 lifetime points"}
                {tier === "platinum" && "25,000+ lifetime points"}
              </p>
              <ul className="space-y-1">
                {tierBenefits[tier].slice(0, 2).map((benefit, i) => (
                  <li key={i} className="text-xs text-gray-600">
                    {benefit}
                  </li>
                ))}
              </ul>
              {account?.tier === tier && (
                <span className="inline-block mt-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                  Current Tier
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Redemption Modal */}
      {showRedeem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-900">Redeem Points</h2>
            <p className="text-gray-500 mt-1">
              You have {account?.points.toLocaleString()} points available
            </p>

            <div className="mt-6 space-y-3">
              {redemptionOptions?.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                    selectedOption === option.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{option.name}</span>
                    <span className="text-sm text-gray-500">
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
                className="flex-1 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRedeem}
                disabled={!selectedOption || redeemMutation.isPending}
                className="flex-1 py-2.5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
              >
                {redeemMutation.isPending ? "Processing..." : "Redeem"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
