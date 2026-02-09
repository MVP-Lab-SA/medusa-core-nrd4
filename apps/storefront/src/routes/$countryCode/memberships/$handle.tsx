import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { ArrowLeft, Check, Star, LockClosedSolid } from "@medusajs/icons"
import { useMembershipTier, useCreateMembership, useCustomerMembership } from "../../../lib/hooks/use-commerce-models"
import { useCustomer } from "@/lib/context/customer-context"

export const Route = createFileRoute("/$countryCode/memberships/$handle")({
  component: MembershipDetailPage,
})

function MembershipDetailPage() {
  const { countryCode, handle } = Route.useParams()
  const navigate = useNavigate()
  const { data: tier, isLoading } = useMembershipTier(handle)
  const { customer } = useCustomer()
  const { data: currentMembership } = useCustomerMembership(customer?.id)
  const createMembership = useCreateMembership()
  
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual")
  const [isJoining, setIsJoining] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-city-navy flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-city-cyan border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!tier) {
    return (
      <div className="min-h-screen bg-city-navy flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Membership Not Found</h1>
          <Link to="/$countryCode/memberships" params={{ countryCode }} className="text-city-cyan hover:underline">
            Back to Memberships
          </Link>
        </div>
      </div>
    )
  }

  const price = billingCycle === "monthly" ? tier.monthlyPrice : tier.annualPrice
  const savings = billingCycle === "annual" ? (tier.monthlyPrice * 12 - tier.annualPrice) : 0

  const handleJoin = async () => {
    if (!customer) return
    setIsJoining(true)
    try {
      await createMembership.mutateAsync({
        customerId: customer.id,
        tierId: tier.id,
        billingCycle,
      })
      navigate({ to: "/$countryCode/account/membership", params: { countryCode } })
    } catch (error) {
      alert("Failed to create membership")
    } finally {
      setIsJoining(false)
    }
  }

  return (
    <div className="min-h-screen bg-city-navy">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link
          to="/$countryCode/memberships"
          params={{ countryCode }}
          className="inline-flex items-center gap-2 text-city-gray hover:text-city-cyan mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Memberships
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Tier Info */}
            <div>
              <div className="w-32 h-32 rounded-full overflow-hidden bg-city-slate/30 mb-6">
                <img
                  src={tier.image}
                  alt={tier.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold text-white">{tier.name}</h1>
                {tier.popular && (
                  <span className="px-3 py-1 bg-city-cyan text-city-navy text-sm font-semibold rounded-full">
                    Popular
                  </span>
                )}
                {tier.exclusive && (
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold rounded-full">
                    Exclusive
                  </span>
                )}
              </div>
              
              <p className="text-city-gray text-lg mb-8">{tier.description}</p>

              {/* Benefits */}
              <h3 className="text-lg font-semibold text-white mb-4">Membership Benefits</h3>
              <div className="space-y-4">
                {tier.benefits.map(benefit => (
                  <div key={benefit.id} className="flex items-start gap-4 p-4 bg-city-slate/30 rounded-lg">
                    <div className="w-10 h-10 bg-city-cyan/10 rounded-full flex items-center justify-center flex-shrink-0">
                      {benefit.type === "discount" && <span className="text-city-cyan font-bold">{benefit.value}%</span>}
                      {benefit.type === "service" && <LockClosedSolid className="w-5 h-5 text-city-cyan" />}
                      {benefit.type === "access" && <Star className="w-5 h-5 text-city-cyan" />}
                      {benefit.type === "priority" && <Star className="w-5 h-5 text-city-cyan" />}
                    </div>
                    <div>
                      <div className="text-white font-medium">{benefit.name}</div>
                      <div className="text-city-gray text-sm">{benefit.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signup Form */}
            <div className="lg:sticky lg:top-8 h-fit">
              <div className="bg-city-slate/30 border border-city-slate/50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Join {tier.name}</h2>
                
                {/* Billing Cycle */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">Billing Cycle</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setBillingCycle("monthly")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        billingCycle === "monthly"
                          ? "border-city-cyan bg-city-cyan/10"
                          : "border-city-slate/50 hover:border-city-slate"
                      }`}
                    >
                      <div className="text-white font-semibold">${tier.monthlyPrice}/mo</div>
                      <div className="text-city-gray text-sm">Billed monthly</div>
                    </button>
                    <button
                      onClick={() => setBillingCycle("annual")}
                      className={`p-4 rounded-lg border-2 transition-all relative ${
                        billingCycle === "annual"
                          ? "border-city-cyan bg-city-cyan/10"
                          : "border-city-slate/50 hover:border-city-slate"
                      }`}
                    >
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded-full">
                        Save ${(tier.monthlyPrice * 12 - tier.annualPrice).toFixed(0)}
                      </span>
                      <div className="text-white font-semibold">${tier.annualPrice}/yr</div>
                      <div className="text-city-gray text-sm">Billed annually</div>
                    </button>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-3">Included Features</h3>
                  <ul className="space-y-2">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-city-cyan" />
                        <span className="text-city-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Summary */}
                <div className="bg-city-navy/50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-city-gray">{tier.name} Membership</span>
                    <span className="text-white">${price}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-green-400 text-sm">
                      <span>Annual Savings</span>
                      <span>-${savings.toFixed(0)}</span>
                    </div>
                  )}
                  <div className="border-t border-city-slate/50 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-white font-semibold">Total</span>
                      <span className="text-city-cyan font-bold text-xl">
                        ${price}/{billingCycle === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Join Button */}
                {customer ? (
                  currentMembership?.tierId === tier.id ? (
                    <div className="w-full py-4 bg-city-cyan/20 text-city-cyan font-semibold rounded-lg text-center">
                      This is Your Current Plan
                    </div>
                  ) : tier.exclusive ? (
                    <button
                      disabled
                      className="w-full py-4 bg-city-slate/50 text-city-gray font-semibold rounded-lg cursor-not-allowed"
                    >
                      Invitation Required
                    </button>
                  ) : (
                    <button
                      onClick={handleJoin}
                      disabled={isJoining}
                      className="w-full py-4 bg-city-cyan text-city-navy font-semibold rounded-lg hover:bg-city-cyan/90 transition-colors disabled:opacity-50"
                    >
                      {isJoining ? "Processing..." : currentMembership ? "Upgrade Now" : "Join Now"}
                    </button>
                  )
                ) : (
                  <Link
                    to="/$countryCode/account/login"
                    params={{ countryCode }}
                    className="block w-full py-4 bg-city-cyan text-city-navy font-semibold rounded-lg text-center hover:bg-city-cyan/90 transition-colors"
                  >
                    Sign In to Join
                  </Link>
                )}

                <p className="text-city-gray text-xs text-center mt-4">
                  Cancel anytime. No commitment required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
