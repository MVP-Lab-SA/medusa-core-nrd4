import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { ArrowLeft, User, Check, Calendar, Gift } from "@medusajs/icons"
import { useCampaign, useCreateDonation } from "../../../lib/hooks/use-commerce-models"
import { useCustomer } from "@/lib/context/customer-context"

export const Route = createFileRoute("/$countryCode/campaigns/$handle")({
  component: CampaignDetailPage,
})

function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  const percentage = Math.min((raised / goal) * 100, 100)
  return (
    <div className="relative h-3 bg-city-navy/50 rounded-full overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

function CampaignDetailPage() {
  const { countryCode, handle } = Route.useParams()
  const { data: campaign, isLoading } = useCampaign(handle)
  const { customer } = useCustomer()
  const createDonation = useCreateDonation()
  
  const [donationAmount, setDonationAmount] = useState<number | "custom">(50)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedReward, setSelectedReward] = useState<string | null>(null)
  const [anonymous, setAnonymous] = useState(false)
  const [message, setMessage] = useState("")
  const [isDonating, setIsDonating] = useState(false)
  const [activeTab, setActiveTab] = useState<"story" | "updates" | "rewards">("story")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-city-navy flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-city-cyan border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-city-navy flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Campaign Not Found</h1>
          <Link to="/$countryCode/campaigns" params={{ countryCode }} className="text-city-cyan hover:underline">
            Back to Campaigns
          </Link>
        </div>
      </div>
    )
  }

  const amount = donationAmount === "custom" ? parseFloat(customAmount) || 0 : donationAmount
  const daysLeft = Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))

  const handleDonate = async () => {
    if (!customer || amount <= 0) return
    setIsDonating(true)
    try {
      await createDonation.mutateAsync({
        customerId: customer.id,
        campaignId: campaign.id,
        amount,
        rewardId: selectedReward || undefined,
        anonymous,
        message: message || undefined,
      })
      alert("Thank you for your donation!")
    } catch (error) {
      alert("Failed to process donation")
    } finally {
      setIsDonating(false)
    }
  }

  return (
    <div className="min-h-screen bg-city-navy">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link
          to="/$countryCode/campaigns"
          params={{ countryCode }}
          className="inline-flex items-center gap-2 text-city-gray hover:text-city-cyan mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="aspect-video rounded-xl overflow-hidden mb-6">
              <img
                src={campaign.images[0]}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Organizer */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-green-400 text-sm font-medium capitalize">{campaign.category}</span>
                <h1 className="text-3xl font-bold text-white mt-1">{campaign.title}</h1>
              </div>
              {campaign.status === "funded" && (
                <span className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-full">
                  <Check className="w-4 h-4" />
                  Funded
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-city-slate/50">
              <div className="w-10 h-10 bg-city-cyan/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-city-cyan" />
              </div>
              <div>
                <div className="text-white font-medium flex items-center gap-1">
                  {campaign.organizer.name}
                  {campaign.organizer.verified && (
                    <Check className="w-4 h-4 text-city-cyan" />
                  )}
                </div>
                <div className="text-city-gray text-sm">Campaign Organizer</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-city-slate/50">
              {[
                { id: "story", label: "Story" },
                { id: "updates", label: `Updates (${campaign.updates.length})` },
                { id: "rewards", label: `Rewards (${campaign.rewards?.length || 0})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`pb-4 px-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-city-cyan text-city-cyan"
                      : "border-transparent text-city-gray hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "story" && (
              <div className="prose prose-invert max-w-none">
                <p className="text-city-gray whitespace-pre-line">{campaign.longDescription}</p>
              </div>
            )}

            {activeTab === "updates" && (
              <div className="space-y-6">
                {campaign.updates.length > 0 ? (
                  campaign.updates.map(update => (
                    <div key={update.id} className="bg-city-slate/30 rounded-lg p-6">
                      <div className="flex items-center gap-2 text-city-gray text-sm mb-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(update.createdAt).toLocaleDateString()}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{update.title}</h3>
                      <p className="text-city-gray">{update.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-city-gray text-center py-8">No updates yet.</p>
                )}
              </div>
            )}

            {activeTab === "rewards" && (
              <div className="space-y-4">
                {campaign.rewards && campaign.rewards.length > 0 ? (
                  campaign.rewards.map(reward => (
                    <div
                      key={reward.id}
                      onClick={() => {
                        setSelectedReward(reward.id)
                        setDonationAmount("custom")
                        setCustomAmount(reward.minAmount.toString())
                      }}
                      className={`bg-city-slate/30 rounded-lg p-6 cursor-pointer transition-all ${
                        selectedReward === reward.id
                          ? "border-2 border-green-500"
                          : "border border-city-slate/50 hover:border-city-slate"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{reward.title}</h3>
                          <p className="text-green-400 font-semibold">${reward.minAmount}+</p>
                        </div>
                        <Gift className="w-6 h-6 text-city-cyan" />
                      </div>
                      <p className="text-city-gray text-sm mb-3">{reward.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-city-gray">
                          {reward.claimed} / {reward.available} claimed
                        </span>
                        {reward.estimatedDelivery && (
                          <span className="text-city-gray">Est. {reward.estimatedDelivery}</span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-city-gray text-center py-8">No rewards available.</p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Donation Panel */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-city-slate/30 border border-city-slate/50 rounded-xl p-6">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-2xl font-bold text-white">${campaign.raised.toLocaleString()}</span>
                  <span className="text-city-gray">of ${campaign.goal.toLocaleString()}</span>
                </div>
                <ProgressBar raised={campaign.raised} goal={campaign.goal} />
                <div className="text-green-400 text-sm mt-2">
                  {Math.round((campaign.raised / campaign.goal) * 100)}% funded
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-city-navy/50 rounded-lg">
                  <div className="text-xl font-bold text-white">{campaign.backerCount}</div>
                  <div className="text-city-gray text-sm">Backers</div>
                </div>
                <div className="text-center p-3 bg-city-navy/50 rounded-lg">
                  <div className="text-xl font-bold text-white">{daysLeft}</div>
                  <div className="text-city-gray text-sm">Days Left</div>
                </div>
              </div>

              {/* Donation Amount */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-3">Select Amount</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[25, 50, 100].map(amt => (
                    <button
                      key={amt}
                      onClick={() => {
                        setDonationAmount(amt)
                        setSelectedReward(null)
                      }}
                      className={`py-3 rounded-lg font-semibold transition-all ${
                        donationAmount === amt
                          ? "bg-green-500 text-white"
                          : "bg-city-navy/50 text-white hover:bg-city-navy"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-city-gray">$</span>
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={donationAmount === "custom" ? customAmount : ""}
                    onFocus={() => setDonationAmount("custom")}
                    onChange={(e) => {
                      setDonationAmount("custom")
                      setCustomAmount(e.target.value)
                    }}
                    className="w-full pl-8 pr-4 py-3 bg-city-navy/50 border border-city-slate/50 rounded-lg text-white focus:outline-none focus:border-city-cyan"
                  />
                </div>
              </div>

              {/* Anonymous */}
              <label className="flex items-center gap-3 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="w-5 h-5 rounded border-city-slate/50 bg-city-navy/50 text-green-500 focus:ring-green-500"
                />
                <span className="text-city-gray">Donate anonymously</span>
              </label>

              {/* Message */}
              <div className="mb-6">
                <textarea
                  placeholder="Leave a message (optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-city-navy/50 border border-city-slate/50 rounded-lg text-white focus:outline-none focus:border-city-cyan resize-none"
                />
              </div>

              {/* Donate Button */}
              {customer ? (
                <button
                  onClick={handleDonate}
                  disabled={isDonating || amount <= 0 || campaign.status !== "active"}
                  className="w-full py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {isDonating ? "Processing..." : `Donate $${amount}`}
                </button>
              ) : (
                <Link
                  to="/$countryCode/account/login"
                  params={{ countryCode }}
                  className="block w-full py-4 bg-green-500 text-white font-semibold rounded-lg text-center hover:bg-green-600 transition-colors"
                >
                  Sign In to Donate
                </Link>
              )}

              {selectedReward && (
                <p className="text-city-gray text-sm text-center mt-3">
                  Includes: {campaign.rewards?.find(r => r.id === selectedReward)?.title}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
