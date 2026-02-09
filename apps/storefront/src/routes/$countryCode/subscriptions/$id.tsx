import { createFileRoute } from "@tanstack/react-router"
import { SubscriptionPlanCard, PlanComparison } from "~/components/subscriptions"
import { Check, ArrowLeftMini, Calendar, ShoppingBag, ShieldCheck, Clock } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/subscriptions/$id")({
  component: SubscriptionPlanDetailPage,
})

function SubscriptionPlanDetailPage() {
  const { id } = Route.useParams()

  // Mock plan data
  const plan = {
    id,
    name: "Premium Monthly Box",
    description: "Get a curated selection of premium products delivered to your door every month. Perfect for discovering new favorites.",
    price: 49.99,
    billingCycle: "monthly",
    features: [
      "5-7 full-size products each month",
      "Personalized to your preferences",
      "Free shipping on all boxes",
      "Exclusive member discounts",
      "Early access to new products",
      "Cancel anytime",
    ],
    whatYouGet: [
      { category: "Skincare", items: "2-3 premium items" },
      { category: "Wellness", items: "1-2 curated products" },
      { category: "Lifestyle", items: "1-2 surprise items" },
    ],
    reviews: {
      average: 4.8,
      count: 1250,
    },
  }

  const otherPlans = [
    { id: "basic", name: "Basic Box", price: 29.99, features: ["3-4 products", "Free shipping"] },
    { id: "premium", name: "Premium Box", price: 49.99, features: ["5-7 products", "Exclusive items"], current: true },
    { id: "vip", name: "VIP Box", price: 79.99, features: ["8-10 products", "Limited editions"] },
  ]

  return (
    <div className="min-h-screen bg-city-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <a href="/subscriptions" className="inline-flex items-center gap-2 text-city-gray hover:text-city-white transition-colors mb-6">
          <ArrowLeftMini className="w-4 h-4" />
          Back to Plans
        </a>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero */}
            <div className="bg-gradient-to-br from-city-cyan to-city-cyan-light text-city-dark rounded-xl p-8 mb-8">
              <span className="px-3 py-1 bg-city-dark/20 rounded-full text-sm font-medium">Most Popular</span>
              <h1 className="text-4xl font-bold mt-4 mb-2">{plan.name}</h1>
              <p className="text-city-dark/80 text-lg mb-4">{plan.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">${plan.price}</span>
                <span className="text-city-dark/60">/ month</span>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-city-navy border border-city-steel rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-city-white mb-4">What's Included</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-city-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What You Get */}
            <div className="bg-city-navy border border-city-steel rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-city-white mb-4">What's in Each Box</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {plan.whatYouGet.map((item, index) => (
                  <div key={index} className="p-4 bg-city-slate rounded-lg">
                    <ShoppingBag className="w-8 h-8 text-city-cyan mb-2" />
                    <p className="font-semibold text-city-white">{item.category}</p>
                    <p className="text-sm text-city-gray">{item.items}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-city-navy border border-city-steel rounded-xl p-6">
              <h2 className="text-xl font-semibold text-city-white mb-6">How It Works</h2>
              <div className="space-y-6">
                {[
                  { step: 1, title: "Subscribe", description: "Choose your plan and tell us about your preferences" },
                  { step: 2, title: "We Curate", description: "Our experts hand-pick products tailored just for you" },
                  { step: 3, title: "Receive", description: "Get your box delivered to your door each month" },
                  { step: 4, title: "Enjoy", description: "Discover and enjoy your new favorite products" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-city-cyan/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-city-cyan font-bold">{item.step}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-city-white">{item.title}</p>
                      <p className="text-city-gray">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-city-navy border border-city-steel rounded-xl p-6 sticky top-4">
              <div className="mb-6">
                <p className="text-sm text-city-muted">Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-city-white">${plan.price}</span>
                  <span className="text-city-muted">/month</span>
                </div>
              </div>

              <button className="w-full bg-city-cyan text-city-dark py-3 rounded-lg hover:bg-city-cyan-light transition-colors font-medium mb-4">
                Subscribe Now
              </button>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm text-city-gray">
                  <Calendar className="w-5 h-5 text-city-muted" />
                  <span>Ships on the 1st of each month</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-city-gray">
                  <ShieldCheck className="w-5 h-5 text-city-muted" />
                  <span>Cancel or pause anytime</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-city-gray">
                  <Clock className="w-5 h-5 text-city-muted" />
                  <span>Free returns within 30 days</span>
                </div>
              </div>

              <div className="pt-6 border-t border-city-steel">
                <h3 className="font-semibold text-city-white mb-4">Compare Plans</h3>
                <div className="space-y-3">
                  {otherPlans.map((p) => (
                    <div 
                      key={p.id}
                      className={`p-3 rounded-lg ${p.current ? "bg-city-cyan/10 border-2 border-city-cyan" : "bg-city-slate"}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${p.current ? "text-city-cyan" : "text-city-white"}`}>{p.name}</span>
                        <span className="font-bold text-city-white">${p.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
