import { LoyaltyPoints, PointsHistory } from "@/components/ui/loyalty-points"
import { TierProgress } from "@/components/ui/tier-progress"
import { ReferralWidget } from "@/components/ui/referral-widget"
import { Button } from "@/components/ui/button"
import { GiftSolid, Star, Users, ShoppingBag } from "@medusajs/icons"

interface LoyaltyPageProps {
  countryCode: string
}

export default function LoyaltyPage({ countryCode }: LoyaltyPageProps) {
  const tiers = [
    {
      id: "bronze",
      name: "Bronze",
      minPoints: 0,
      benefits: ["Earn 1 point per $1 spent", "Birthday bonus points"],
      color: "from-orange-400 to-orange-500"
    },
    {
      id: "silver",
      name: "Silver",
      minPoints: 500,
      benefits: ["Earn 1.5 points per $1 spent", "Free shipping on orders $50+", "Early access to sales"],
      color: "from-gray-400 to-gray-500"
    },
    {
      id: "gold",
      name: "Gold",
      minPoints: 2000,
      benefits: ["Earn 2 points per $1 spent", "Free shipping on all orders", "Exclusive member events", "Priority support"],
      color: "from-yellow-400 to-yellow-500"
    },
    {
      id: "platinum",
      name: "Platinum",
      minPoints: 5000,
      benefits: ["Earn 3 points per $1 spent", "Free expedited shipping", "Personal account manager", "VIP early access", "Annual gift"],
      color: "from-purple-400 to-purple-500"
    }
  ]

  const pointsHistory = [
    { id: "1", description: "Purchase - Order #12345", points: 150, type: "earned" as const, date: "Jan 15, 2026" },
    { id: "2", description: "Redeemed $10 reward", points: 1000, type: "redeemed" as const, date: "Jan 10, 2026" },
    { id: "3", description: "Purchase - Order #12340", points: 89, type: "earned" as const, date: "Jan 5, 2026" },
    { id: "4", description: "Birthday bonus", points: 200, type: "earned" as const, date: "Jan 1, 2026" },
    { id: "5", description: "Referral bonus", points: 500, type: "earned" as const, date: "Dec 28, 2025" }
  ]

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">CityOS Rewards</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Earn points on every purchase and unlock exclusive benefits
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Points Card */}
          <div className="lg:col-span-1">
            <LoyaltyPoints
              points={1750}
              pointsValue={17.50}
              tier="Silver"
              nextTier="Gold"
              pointsToNextTier={250}
              expiringPoints={{ amount: 200, date: "Mar 31, 2026" }}
            />
          </div>

          {/* Tier Progress */}
          <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 p-6">
            <TierProgress
              tiers={tiers}
              currentPoints={1750}
              currentTier="silver"
            />
          </div>
        </div>

        {/* Referral Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ReferralWidget
            referralCode="CITYOS25"
            referralLink="https://cityos.store/ref/abc123"
            reward="$25"
            friendReward="$25"
            referralsCount={3}
            pendingRewards="$75"
          />

          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <PointsHistory items={pointsHistory} />
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <ShoppingBag className="w-8 h-8" />,
                title: "Shop",
                description: "Earn points on every purchase you make"
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Earn",
                description: "Collect points and level up your tier"
              },
              {
                icon: <GiftSolid className="w-8 h-8" />,
                title: "Redeem",
                description: "Use points for discounts and rewards"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Refer",
                description: "Invite friends and earn bonus points"
              }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Catalog */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Redeem Your Points</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { points: 500, value: "$5 off", description: "Any purchase" },
              { points: 1000, value: "$10 off", description: "Any purchase" },
              { points: 2500, value: "$25 off", description: "Any purchase" },
              { points: 5000, value: "$50 off", description: "Any purchase" },
              { points: 2000, value: "Free Shipping", description: "1 year unlimited" },
              { points: 10000, value: "VIP Event", description: "Exclusive access" }
            ].map((reward, idx) => (
              <div key={idx} className="bg-gray-900 rounded-xl border border-gray-800 p-6 text-center">
                <p className="text-3xl font-bold text-cyan-400 mb-2">{reward.value}</p>
                <p className="text-gray-400 mb-4">{reward.description}</p>
                <p className="text-sm text-gray-500 mb-4">{reward.points.toLocaleString()} points</p>
                <Button variant="secondary" size="fit" className="w-full">
                  Redeem
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
