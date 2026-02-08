import { createFileRoute } from "@tanstack/react-router"
import { Gift, User, CurrencyDollar, CheckCircle } from "@medusajs/icons"
import { useReferralProgram } from "../../lib/hooks/use-marketplace"
import { ReferralCard } from "../../components/promotions/ReferralCard"

export const Route = createFileRoute("/$countryCode/referrals")({
  component: ReferralsPage,
})

function ReferralsPage() {
  const { data: program, isLoading } = useReferralProgram()

  const steps = [
    { icon: Gift, title: "Share Your Link", description: "Send your unique referral link to friends" },
    { icon: User, title: "Friend Signs Up", description: "They create an account using your link" },
    { icon: CurrencyDollar, title: "Both Get Rewarded", description: "You both receive rewards when they make a purchase" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Gift className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Refer & Earn</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Share the love and get rewarded! Invite friends and you both earn rewards.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* How it Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="text-center">
                  <div className="relative">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Referral Card */}
        {isLoading ? (
          <div className="max-w-lg mx-auto h-64 bg-gray-200 rounded-xl animate-pulse" />
        ) : program ? (
          <div className="max-w-lg mx-auto">
            <ReferralCard
              program={program}
              referralCode="DEMO123"
              referralCount={5}
              totalEarned={50}
            />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Sign in to access your referral link</p>
          </div>
        )}

        {/* Benefits */}
        <div className="mt-16 bg-white rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Earn $10 for every successful referral",
              "No limit on how many friends you can refer",
              "Your friends get $10 off their first order",
              "Track your referrals in real-time",
              "Rewards never expire",
              "Cash out or use as store credit",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
