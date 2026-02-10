import { useState } from "react"
import { Users, DocumentText, Check, Gift, CurrencyDollar, SquareTwoStack } from "@medusajs/icons"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountPageHeader,
  AccountCard,
  AccountCardHeader,
  AccountButton,
  AccountEmptyState,
  AccountSkeleton,
  AccountBadge,
  AccountStatCard,
} from "@/components/account/AccountUI"

interface ReferralsPageProps {
  countryCode: string
}

// Mock data
const referralData = {
  code: "FRIEND-ABC123",
  link: "https://store.com/ref/ABC123",
  reward: "$10",
  friendReward: "15% off",
  stats: {
    totalReferrals: 12,
    pendingReferrals: 3,
    totalEarned: 90,
    availableCredit: 30,
  },
  referrals: [
    { id: "ref_1", email: "j***@email.com", status: "completed", reward: 10, date: "2024-03-15" },
    { id: "ref_2", email: "s***@email.com", status: "completed", reward: 10, date: "2024-03-10" },
    { id: "ref_3", email: "m***@email.com", status: "pending", reward: 10, date: "2024-03-18" },
    { id: "ref_4", email: "a***@email.com", status: "pending", reward: 10, date: "2024-03-17" },
  ],
}

export function AccountReferralsPage({ countryCode }: ReferralsPageProps) {
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const isLoading = false

  const copyToClipboard = async (text: string, type: "code" | "link") => {
    await navigator.clipboard.writeText(text)
    if (type === "code") {
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } else {
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Get a discount!",
          text: `Use my referral code ${referralData.code} to get ${referralData.friendReward} your first order!`,
          url: referralData.link,
        })
      } catch {
        // User cancelled share
      }
    } else {
      copyToClipboard(referralData.link, "link")
    }
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/referrals`}>
      <AccountPageHeader
        title="Refer & Earn"
        description="Invite friends and earn rewards"
        breadcrumbs={[
          { label: "Account", href: `/${countryCode}/account` },
          { label: "Referrals" },
        ]}
      />

      {isLoading ? (
        <div className="space-y-6">
          <AccountSkeleton height="h-48" />
          <div className="grid grid-cols-4 gap-4">
            <AccountSkeleton height="h-24" />
            <AccountSkeleton height="h-24" />
            <AccountSkeleton height="h-24" />
            <AccountSkeleton height="h-24" />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Referral Code Card */}
          <AccountCard className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/20">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Share Your Code</h3>
                  <p className="text-gray-400">
                    You get <span className="text-cyan-400 font-semibold">{referralData.reward}</span> and your friend gets{" "}
                    <span className="text-cyan-400 font-semibold">{referralData.friendReward}</span>
                  </p>
                </div>
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-cyan-400" />
                </div>
              </div>

              {/* Referral Code */}
              <div className="bg-gray-900/50 rounded-xl p-4 mb-4">
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
                  Your Referral Code
                </label>
                <div className="flex items-center justify-between">
                  <code className="text-2xl font-bold text-white tracking-wider">
                    {referralData.code}
                  </code>
                  <AccountButton
                    variant="secondary"
                    size="sm"
                    onClick={() => copyToClipboard(referralData.code, "code")}
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <SquareTwoStack className="w-4 h-4 mr-2" />
                        Copy Code
                      </>
                    )}
                  </AccountButton>
                </div>
              </div>

              {/* Share Actions */}
              <div className="flex items-center gap-3">
                <AccountButton onClick={shareReferral} className="flex-1">
                  <SquareTwoStack className="w-4 h-4 mr-2" />
                  Share Link
                </AccountButton>
                <AccountButton 
                  variant="secondary" 
                  onClick={() => copyToClipboard(referralData.link, "link")}
                >
                  {copiedLink ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <SquareTwoStack className="w-4 h-4" />
                  )}
                </AccountButton>
              </div>
            </div>
          </AccountCard>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AccountStatCard
              title="Total Referrals"
              value={referralData.stats.totalReferrals.toString()}
              icon={<Users className="w-5 h-5" />}
            />
            <AccountStatCard
              title="Pending"
              value={referralData.stats.pendingReferrals.toString()}
              icon={<Users className="w-5 h-5" />}
              trend="neutral"
            />
            <AccountStatCard
              title="Total Earned"
              value={`$${referralData.stats.totalEarned}`}
              icon={<CurrencyDollar className="w-5 h-5" />}
              trend="up"
            />
            <AccountStatCard
              title="Available Credit"
              value={`$${referralData.stats.availableCredit}`}
              icon={<Gift className="w-5 h-5" />}
            />
          </div>

          {/* Referral History */}
          <AccountCard>
            <AccountCardHeader
              title="Referral History"
              description="Track your referral progress"
            />
            <div className="divide-y divide-gray-800">
              {referralData.referrals.length > 0 ? (
                referralData.referrals.map((referral) => (
                  <div key={referral.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{referral.email}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(referral.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400 font-medium">+${referral.reward}</span>
                      <AccountBadge 
                        variant={referral.status === "completed" ? "success" : "warning"}
                      >
                        {referral.status === "completed" ? "Completed" : "Pending"}
                      </AccountBadge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No referrals yet. Share your code to get started!</p>
                </div>
              )}
            </div>
          </AccountCard>

          {/* How It Works */}
          <AccountCard>
            <AccountCardHeader
              title="How It Works"
              description="Three simple steps to earn rewards"
            />
            <div className="p-6 pt-0">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { step: 1, title: "Share Your Code", description: "Send your unique referral code to friends" },
                  { step: 2, title: "Friend Makes Purchase", description: "They get a discount on their first order" },
                  { step: 3, title: "You Get Rewarded", description: "Receive store credit when they complete checkout" },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-cyan-400 font-bold">{item.step}</span>
                    </div>
                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </AccountCard>
        </div>
      )}
    </AccountLayout>
  )
}
