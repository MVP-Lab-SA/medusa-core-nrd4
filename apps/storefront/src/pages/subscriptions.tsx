import { useSubscriptionPlans, useSubscriptions, useCreateSubscription } from "@/lib/hooks/use-marketplace"
import { SubscriptionPlanCard, SubscriptionStatusCard } from "@/components/ui/subscription-card"
import { useCustomer } from "@/lib/context/customer-context"
import { Check } from "@medusajs/icons"
import { useState } from "react"

interface SubscriptionsPageProps {
  countryCode: string
}

export default function SubscriptionsPage({ countryCode }: SubscriptionsPageProps) {
  const { customer } = useCustomer()
  const { data: plans, isLoading: plansLoading } = useSubscriptionPlans()
  const { data: subscriptions } = useSubscriptions(customer?.id || "")
  const createSubscription = useCreateSubscription()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleSubscribe = async (planId: string) => {
    if (!customer) {
      window.location.href = `/${countryCode}/account/login`
      return
    }

    try {
      await createSubscription.mutateAsync({
        customerId: customer.id,
        planId,
      })
      setSelectedPlan(null)
    } catch (error) {
      console.error("Failed to subscribe:", error)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Subscription Plans</h1>
          <p className="text-purple-100 mt-4 text-lg max-w-2xl mx-auto">
            Subscribe and save on your favorite products. Get exclusive discounts,
            free shipping, and curated selections delivered to your door.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Active Subscriptions */}
        {subscriptions && subscriptions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Your Subscriptions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subscriptions.map((subscription) => (
                <SubscriptionStatusCard
                  key={subscription.id}
                  subscription={subscription}
                  onPause={() => {}}
                  onCancel={() => {}}
                />
              ))}
            </div>
          </div>
        )}

        {/* Available Plans */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Available Plans</h2>
          <p className="text-gray-400 mb-8">Choose the plan that works best for you</p>

          {plansLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-900 border border-gray-800 rounded-xl h-96 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans?.map((plan, index) => (
                <SubscriptionPlanCard
                  key={plan.id}
                  plan={plan}
                  popular={index === 1}
                  selected={selectedPlan === plan.id}
                  onSelect={(planId) => {
                    setSelectedPlan(planId)
                    handleSubscribe(planId)
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Why Subscribe?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Save Money",
                description: "Subscribers save up to 35% compared to one-time purchases",
              },
              {
                title: "Free Shipping",
                description: "All subscription orders ship free, no minimum required",
              },
              {
                title: "Flexibility",
                description: "Pause, skip, or cancel your subscription anytime",
              },
              {
                title: "Exclusive Access",
                description: "Get early access to new products and limited editions",
              },
              {
                title: "Curated Selection",
                description: "Products handpicked by our experts based on your preferences",
              },
              {
                title: "Priority Support",
                description: "Dedicated customer service for all subscribers",
              },
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{benefit.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              {
                q: "Can I cancel my subscription?",
                a: "Yes, you can cancel your subscription at any time from your account settings. Your subscription will remain active until the end of your current billing period.",
              },
              {
                q: "How does the free trial work?",
                a: "If your plan includes a free trial, you won't be charged until the trial period ends. You can cancel anytime during the trial.",
              },
              {
                q: "Can I change my subscription plan?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing date.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and Apple Pay for subscription payments.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h4 className="font-semibold text-white">{item.q}</h4>
                <p className="text-gray-400 mt-2">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
