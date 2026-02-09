import { createFileRoute, Link } from "@tanstack/react-router"
import { Check, Star, Sparkles, ArrowRight } from "@medusajs/icons"
import { useMembershipTiers, useCustomerMembership } from "../../../lib/hooks/use-commerce-models"
import { useCustomer } from "@/lib/context/customer-context"

export const Route = createFileRoute("/$countryCode/memberships/")({
  component: MembershipsPage,
})

function MembershipsPage() {
  const { countryCode } = Route.useParams()
  const { data: tiers, isLoading } = useMembershipTiers()
  const { customer } = useCustomer()
  const { data: membership } = useCustomerMembership(customer?.id)

  return (
    <div className="min-h-screen bg-city-navy">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-city-navy to-city-navy" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Exclusive Benefits</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Premium Memberships
            </h1>
            <p className="text-xl text-city-gray mb-8">
              Unlock exclusive discounts, priority support, free installations, and VIP access 
              to the latest smart home technology.
            </p>
            {membership && (
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-city-cyan/10 border border-city-cyan/30 rounded-full">
                <Sparkles className="w-5 h-5 text-city-cyan" />
                <span className="text-city-cyan">
                  You're a {membership.tier.name} member
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 container mx-auto px-4">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-city-slate/30 rounded-xl h-[600px] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers?.map(tier => (
              <div
                key={tier.id}
                className={`relative bg-city-slate/30 border rounded-xl overflow-hidden ${
                  tier.popular 
                    ? "border-city-cyan shadow-lg shadow-city-cyan/20" 
                    : tier.exclusive 
                    ? "border-amber-500/50"
                    : "border-city-slate/50"
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-city-cyan text-city-navy text-center py-1 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                {tier.exclusive && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-center py-1 text-sm font-semibold">
                    Invitation Only
                  </div>
                )}
                
                <div className={`p-6 ${tier.popular || tier.exclusive ? "pt-10" : ""}`}>
                  {/* Tier Image */}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-city-navy/50">
                    <img
                      src={tier.image}
                      alt={tier.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white text-center mb-2">{tier.name}</h3>
                  <p className="text-city-gray text-sm text-center mb-6">{tier.description}</p>
                  
                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-white">
                      ${tier.monthlyPrice}
                      <span className="text-lg font-normal text-city-gray">/mo</span>
                    </div>
                    <div className="text-city-gray text-sm">
                      or ${tier.annualPrice}/year (save {Math.round((1 - tier.annualPrice / (tier.monthlyPrice * 12)) * 100)}%)
                    </div>
                  </div>
                  
                  {/* Member Count */}
                  {tier.maxMembers ? (
                    <div className="text-center text-sm mb-6">
                      <span className="text-amber-400">{tier.currentMembers}/{tier.maxMembers}</span>
                      <span className="text-city-gray"> spots filled</span>
                    </div>
                  ) : (
                    <div className="text-center text-sm text-city-gray mb-6">
                      {tier.currentMembers.toLocaleString()} members
                    </div>
                  )}
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-city-cyan flex-shrink-0 mt-0.5" />
                        <span className="text-city-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA */}
                  {tier.exclusive ? (
                    <button
                      disabled
                      className="w-full py-3 bg-city-slate/50 text-city-gray font-semibold rounded-lg cursor-not-allowed"
                    >
                      Request Invitation
                    </button>
                  ) : membership?.tierId === tier.id ? (
                    <div className="w-full py-3 bg-city-cyan/20 text-city-cyan font-semibold rounded-lg text-center">
                      Current Plan
                    </div>
                  ) : (
                    <Link
                      to="/$countryCode/memberships/$handle"
                      params={{ countryCode, handle: tier.handle }}
                      className="block w-full py-3 bg-city-cyan text-city-navy font-semibold rounded-lg text-center hover:bg-city-cyan/90 transition-colors"
                    >
                      {membership ? "Upgrade" : "Join Now"}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-city-slate/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-12 text-center">Member Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { 
                title: "Exclusive Discounts",
                desc: "Save up to 20% on every purchase as a premium member",
                icon: "discount"
              },
              { 
                title: "Priority Support",
                desc: "Get help faster with dedicated support channels",
                icon: "support"
              },
              { 
                title: "Free Installations",
                desc: "Professional installation included with membership",
                icon: "install"
              },
              { 
                title: "Early Access",
                desc: "Be first to try new products before public release",
                icon: "early"
              },
              { 
                title: "Extended Warranty",
                desc: "Get up to lifetime warranty on all purchases",
                icon: "warranty"
              },
              { 
                title: "VIP Events",
                desc: "Exclusive invitations to launches and demonstrations",
                icon: "events"
              },
            ].map((benefit, i) => (
              <div key={i} className="text-center p-6 bg-city-slate/30 rounded-xl">
                <div className="w-12 h-12 bg-city-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-city-cyan" />
                </div>
                <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                <p className="text-city-gray text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            { q: "Can I cancel my membership?", a: "Yes, you can cancel anytime. Your benefits continue until the end of your billing period." },
            { q: "Can I upgrade or downgrade?", a: "Absolutely! You can change your plan at any time. Upgrades take effect immediately, downgrades at the next billing cycle." },
            { q: "Do benefits stack with other promotions?", a: "Member discounts can be combined with most promotions unless otherwise noted." },
            { q: "How do I get invited to Platinum?", a: "Platinum membership is offered to our most engaged Gold members based on purchase history and engagement." },
          ].map((faq, i) => (
            <div key={i} className="bg-city-slate/30 border border-city-slate/50 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
              <p className="text-city-gray text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
