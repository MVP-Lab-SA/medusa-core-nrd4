import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { ArrowLeft, Check, Camera, ArrowRight } from "@medusajs/icons"
import { useTradeInProgram, useSubmitTradeIn } from "../../../lib/hooks/use-commerce-models"
import { useCustomer } from "@/lib/context/customer-context"

export const Route = createFileRoute("/$countryCode/trade-in/$handle")({
  component: TradeInDetailPage,
})

function TradeInDetailPage() {
  const { countryCode, handle } = Route.useParams()
  const { data: program, isLoading } = useTradeInProgram(handle)
  const { customer } = useCustomer()
  const submitTradeIn = useSubmitTradeIn()
  
  const [step, setStep] = useState(1)
  const [productName, setProductName] = useState("")
  const [productModel, setProductModel] = useState("")
  const [condition, setCondition] = useState<"excellent" | "good" | "fair" | "poor">("good")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-city-navy flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-city-cyan border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-city-navy flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Program Not Found</h1>
          <Link to="/$countryCode/trade-in" params={{ countryCode }} className="text-city-cyan hover:underline">
            Back to Trade-In
          </Link>
        </div>
      </div>
    )
  }

  const conditionMultiplier = { excellent: 1, good: 0.75, fair: 0.5, poor: 0.25 }
  const calculatedValue = Math.round(program.maxValue * conditionMultiplier[condition])

  const handleGetQuote = () => {
    setEstimatedValue(calculatedValue)
    setStep(2)
  }

  const handleSubmit = async () => {
    if (!customer) return
    setIsSubmitting(true)
    try {
      await submitTradeIn.mutateAsync({
        customerId: customer.id,
        programId: program.id,
        productName,
        productModel,
        condition,
        images: [], // Would normally upload images
        description,
      })
      setStep(3)
    } catch (error) {
      alert("Failed to submit trade-in")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-city-navy">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link
          to="/$countryCode/trade-in"
          params={{ countryCode }}
          className="inline-flex items-center gap-2 text-city-gray hover:text-city-cyan mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Trade-In Programs
        </Link>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-emerald-400 text-sm font-medium">{program.category}</span>
            <h1 className="text-3xl font-bold text-white mt-2 mb-4">{program.title}</h1>
            <p className="text-city-gray">{program.description}</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[
              { num: 1, label: "Device Details" },
              { num: 2, label: "Review Quote" },
              { num: 3, label: "Confirmation" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s.num
                      ? "bg-emerald-500 text-white"
                      : "bg-city-slate/30 text-city-gray"
                  }`}
                >
                  {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                </div>
                <span
                  className={`ml-2 text-sm hidden sm:inline ${
                    step >= s.num ? "text-white" : "text-city-gray"
                  }`}
                >
                  {s.label}
                </span>
                {i < 2 && (
                  <div
                    className={`w-12 h-0.5 mx-4 ${
                      step > s.num ? "bg-emerald-500" : "bg-city-slate/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Device Details */}
          {step === 1 && (
            <div className="bg-city-slate/30 border border-city-slate/50 rounded-xl p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Tell Us About Your Device</h2>
              
              {/* Product Selection */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-3">What device are you trading in?</label>
                <select
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-3 bg-city-navy/50 border border-city-slate/50 rounded-lg text-white focus:outline-none focus:border-city-cyan"
                >
                  <option value="">Select a device type</option>
                  {program.eligibleProducts.map((product, i) => (
                    <option key={i} value={product}>{product}</option>
                  ))}
                </select>
              </div>

              {/* Model */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-3">Model / Version</label>
                <input
                  type="text"
                  value={productModel}
                  onChange={(e) => setProductModel(e.target.value)}
                  placeholder="e.g., 3rd Generation, Model X, etc."
                  className="w-full px-4 py-3 bg-city-navy/50 border border-city-slate/50 rounded-lg text-white focus:outline-none focus:border-city-cyan"
                />
              </div>

              {/* Condition */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-3">Condition</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: "excellent", label: "Excellent", desc: "Like new", percent: 100 },
                    { value: "good", label: "Good", desc: "Light wear", percent: 75 },
                    { value: "fair", label: "Fair", desc: "Visible wear", percent: 50 },
                    { value: "poor", label: "Poor", desc: "Heavy wear", percent: 25 },
                  ].map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setCondition(c.value as typeof condition)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        condition === c.value
                          ? "border-emerald-500 bg-emerald-500/10"
                          : "border-city-slate/50 hover:border-city-slate"
                      }`}
                    >
                      <div className="text-white font-semibold">{c.label}</div>
                      <div className="text-city-gray text-sm">{c.desc}</div>
                      <div className="text-emerald-400 text-sm mt-1">{c.percent}% value</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-3">Additional Details (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe any issues, included accessories, etc."
                  rows={3}
                  className="w-full px-4 py-3 bg-city-navy/50 border border-city-slate/50 rounded-lg text-white focus:outline-none focus:border-city-cyan resize-none"
                />
              </div>

              {/* Estimated Value Preview */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-city-gray">Estimated Credit Value</span>
                  <span className="text-2xl font-bold text-emerald-400">Up to ${calculatedValue}</span>
                </div>
              </div>

              <button
                onClick={handleGetQuote}
                disabled={!productName || !productModel}
                className="w-full py-4 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Get Quote
              </button>
            </div>
          )}

          {/* Step 2: Review Quote */}
          {step === 2 && (
            <div className="bg-city-slate/30 border border-city-slate/50 rounded-xl p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Your Trade-In Quote</h2>
              
              {/* Quote Summary */}
              <div className="bg-city-navy/50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-city-gray text-sm">Device</div>
                    <div className="text-white font-medium">{productName}</div>
                  </div>
                  <div>
                    <div className="text-city-gray text-sm">Model</div>
                    <div className="text-white font-medium">{productModel}</div>
                  </div>
                  <div>
                    <div className="text-city-gray text-sm">Condition</div>
                    <div className="text-white font-medium capitalize">{condition}</div>
                  </div>
                  <div>
                    <div className="text-city-gray text-sm">Program</div>
                    <div className="text-white font-medium">{program.title}</div>
                  </div>
                </div>
                
                <div className="border-t border-city-slate/50 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Estimated Credit Value</span>
                    <span className="text-3xl font-bold text-emerald-400">${estimatedValue}</span>
                  </div>
                  <p className="text-city-gray text-sm mt-2">
                    Final value may vary after inspection
                  </p>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4">What happens next?</h3>
                <ul className="space-y-3">
                  {[
                    "We'll send you a free prepaid shipping label",
                    "Pack your device securely and ship it to us",
                    "Our team will inspect the device within 2-3 business days",
                    "You'll receive store credit once inspection is complete",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-city-gray">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-city-slate/50 text-white font-semibold rounded-lg hover:bg-city-slate transition-colors"
                >
                  Edit Details
                </button>
                {customer ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Accept & Continue"}
                  </button>
                ) : (
                  <Link
                    to="/$countryCode/account/login"
                    params={{ countryCode }}
                    className="flex-1 py-4 bg-emerald-500 text-white font-semibold rounded-lg text-center hover:bg-emerald-600 transition-colors"
                  >
                    Sign In to Continue
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="bg-city-slate/30 border border-city-slate/50 rounded-xl p-8 text-center">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">Trade-In Request Submitted!</h2>
              <p className="text-city-gray mb-8">
                We've received your trade-in request. Check your email for the shipping label 
                and next steps.
              </p>

              <div className="bg-city-navy/50 rounded-lg p-6 mb-8 text-left">
                <h3 className="text-white font-semibold mb-4">Your Trade-In Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-city-gray">Device</span>
                    <span className="text-white">{productName} - {productModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-city-gray">Condition</span>
                    <span className="text-white capitalize">{condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-city-gray">Estimated Credit</span>
                    <span className="text-emerald-400 font-semibold">${estimatedValue}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  to="/$countryCode/trade-in"
                  params={{ countryCode }}
                  className="flex-1 py-4 bg-city-slate/50 text-white font-semibold rounded-lg hover:bg-city-slate transition-colors"
                >
                  Trade In Another Device
                </Link>
                <Link
                  to="/$countryCode/store"
                  params={{ countryCode }}
                  className="flex-1 py-4 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                >
                  Continue Shopping
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
