import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { ArrowLeft, Clock, Check, LockClosedSolid, ArrowDownTray } from "@medusajs/icons"
import { useTrialProduct, useCreateTrial } from "../../../lib/hooks/use-commerce-models"
import { useCustomer } from "@/lib/context/customer-context"

export const Route = createFileRoute("/$countryCode/try-before-you-buy/$handle")({
  component: TrialDetailPage,
})

function TrialDetailPage() {
  const { countryCode, handle } = Route.useParams()
  const { data: product, isLoading } = useTrialProduct(handle)
  const { customer } = useCustomer()
  const createTrial = useCreateTrial()
  
  const [isStarting, setIsStarting] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-city-navy flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-city-cyan border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-city-navy flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <Link to="/$countryCode/try-before-you-buy" params={{ countryCode }} className="text-city-cyan hover:underline">
            Back to Try Before You Buy
          </Link>
        </div>
      </div>
    )
  }

  const handleStartTrial = async () => {
    if (!customer) return
    setIsStarting(true)
    try {
      await createTrial.mutateAsync({
        customerId: customer.id,
        productId: product.id,
      })
      alert("Trial started! You'll receive shipping confirmation soon.")
    } catch (error) {
      alert("Failed to start trial")
    } finally {
      setIsStarting(false)
    }
  }

  return (
    <div className="min-h-screen bg-city-navy">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link
          to="/$countryCode/try-before-you-buy"
          params={{ countryCode }}
          className="inline-flex items-center gap-2 text-city-gray hover:text-city-cyan mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Try Before You Buy
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-city-slate/30 relative">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-4 py-2 bg-teal-500 text-white text-sm font-semibold rounded-full">
                {product.trialDays}-Day Trial
              </div>
            </div>
            
            {/* Specifications */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="bg-city-slate/30 p-4 rounded-lg">
                    <div className="text-city-gray text-sm">{key}</div>
                    <div className="text-white font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trial Panel */}
          <div>
            <span className="text-teal-400 text-sm font-medium">{product.category}</span>
            <h1 className="text-3xl font-bold text-white mt-2 mb-4">{product.title}</h1>
            <p className="text-city-gray mb-6">{product.description}</p>

            {/* Trial Info */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-city-slate/30 rounded-lg">
                <Clock className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <div className="text-white font-semibold">{product.trialDays} Days</div>
                <div className="text-city-gray text-sm">Trial Period</div>
              </div>
              <div className="text-center p-4 bg-city-slate/30 rounded-lg">
                <LockClosedSolid className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <div className="text-white font-semibold">${product.trialFee}</div>
                <div className="text-city-gray text-sm">Trial Fee</div>
              </div>
              <div className="text-center p-4 bg-city-slate/30 rounded-lg">
                <ArrowDownTray className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <div className="text-white font-semibold">Free</div>
                <div className="text-city-gray text-sm">Return Shipping</div>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="bg-city-slate/30 border border-city-slate/50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-400 font-semibold">1</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Pay trial fee today</div>
                    <div className="text-city-gray text-sm">Small fee to start your risk-free trial</div>
                    <div className="text-teal-400 font-semibold mt-1">${product.trialFee}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-400 font-semibold">2</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Try for {product.trialDays} days</div>
                    <div className="text-city-gray text-sm">Use it in your home, test all features</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-400 font-semibold">3</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Make your decision</div>
                    <div className="text-city-gray text-sm">
                      <span className="text-green-400">Keep it:</span> Pay remaining ${product.price - product.trialFee}
                    </div>
                    <div className="text-city-gray text-sm">
                      <span className="text-amber-400">Return it:</span> Get ${product.trialFee} trial fee refunded
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-city-slate/50 pt-4 mt-4">
                <div className="flex justify-between">
                  <span className="text-city-gray">Product full price</span>
                  <span className="text-white font-semibold">${product.price}</span>
                </div>
              </div>
            </div>

            {/* Start Trial Button */}
            {customer ? (
              <button
                onClick={handleStartTrial}
                disabled={!product.available || isStarting}
                className="w-full py-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50"
              >
                {isStarting ? "Processing..." : `Start ${product.trialDays}-Day Trial - $${product.trialFee}`}
              </button>
            ) : (
              <Link
                to="/$countryCode/account/login"
                params={{ countryCode }}
                className="block w-full py-4 bg-teal-500 text-white font-semibold rounded-lg text-center hover:bg-teal-600 transition-colors"
              >
                Sign In to Start Trial
              </Link>
            )}

            {/* Return Policy */}
            <div className="mt-8 p-4 bg-city-slate/30 rounded-lg">
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <LockClosedSolid className="w-5 h-5 text-teal-400" />
                Return Policy
              </h4>
              <p className="text-city-gray text-sm">{product.returnPolicy}</p>
            </div>

            {/* Guarantees */}
            <div className="mt-6 space-y-3">
              {[
                "No obligation to buy",
                "Free return shipping label included",
                "Full trial fee refund on returns",
                "No restocking fees",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-city-gray">
                  <Check className="w-5 h-5 text-teal-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
