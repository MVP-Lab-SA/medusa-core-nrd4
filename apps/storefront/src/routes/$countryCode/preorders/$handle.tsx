import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { ArrowLeft, Clock, Check, ChevronDown, ChevronRight } from "@medusajs/icons"
import { usePreorderProduct, useCreatePreorder } from "../../../lib/hooks/use-commerce-models"
import { useCustomer } from "@/lib/context/customer-context"

export const Route = createFileRoute("/$countryCode/preorders/$handle")({
  component: PreorderDetailPage,
})

function PreorderDetailPage() {
  const { countryCode, handle } = Route.useParams()
  const navigate = useNavigate()
  const { data: product, isLoading } = usePreorderProduct(handle)
  const { customer } = useCustomer()
  const createPreorder = useCreatePreorder()
  
  const [isOrdering, setIsOrdering] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

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
          <Link to="/$countryCode/preorders" params={{ countryCode }} className="text-city-cyan hover:underline">
            Back to Pre-Orders
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const handlePreorder = async () => {
    if (!customer) return
    setIsOrdering(true)
    try {
      await createPreorder.mutateAsync({
        customerId: customer.id,
        productId: product.id,
      })
      alert("Pre-order confirmed! Check your email for details.")
      navigate({ to: "/$countryCode/account/preorders", params: { countryCode } })
    } catch (error: any) {
      alert(error.message || "Failed to create pre-order")
    } finally {
      setIsOrdering(false)
    }
  }

  const slotsAvailable = !product.remainingSlots || product.remainingSlots > 0

  return (
    <div className="min-h-screen bg-city-navy">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link
          to="/$countryCode/preorders"
          params={{ countryCode }}
          className="inline-flex items-center gap-2 text-city-gray hover:text-city-cyan mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Pre-Orders
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
              <div className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full">
                Pre-Order
              </div>
            </div>
            
            {/* Features */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-city-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-city-gray">{feature}</span>
                  </li>
                ))}
              </ul>
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

          {/* Order Panel */}
          <div>
            <span className="text-blue-400 text-sm font-medium">{product.category}</span>
            <h1 className="text-3xl font-bold text-white mt-2 mb-4">{product.title}</h1>
            <p className="text-city-gray mb-6">{product.description}</p>

            {/* Release Info */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <Clock className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-white font-medium">Expected Release</div>
                <div className="text-blue-400">{formatDate(product.releaseDate)}</div>
              </div>
            </div>

            {/* Availability */}
            {product.totalSlots && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-city-gray">Pre-order spots remaining</span>
                  <span className={`font-semibold ${product.remainingSlots && product.remainingSlots < 100 ? "text-amber-400" : "text-white"}`}>
                    {product.remainingSlots} of {product.totalSlots}
                  </span>
                </div>
                <div className="h-3 bg-city-slate/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all"
                    style={{
                      width: `${((product.totalSlots - (product.remainingSlots || 0)) / product.totalSlots) * 100}%`
                    }}
                  />
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="bg-city-slate/30 border border-city-slate/50 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-city-gray text-sm">Full Price</div>
                  <div className="text-2xl font-bold text-white">${product.price}</div>
                </div>
                <div className="text-right">
                  <div className="text-city-gray text-sm">Pay Now ({product.depositPercent}%)</div>
                  <div className="text-2xl font-bold text-city-cyan">${product.depositAmount}</div>
                </div>
              </div>
              
              <div className="border-t border-city-slate/50 pt-4 mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-city-gray">Remaining Balance (due at shipping)</span>
                  <span className="text-white font-semibold">${product.price - product.depositAmount}</span>
                </div>
              </div>
            </div>

            {/* Pre-Order Button */}
            {slotsAvailable ? (
              customer ? (
                <button
                  onClick={handlePreorder}
                  disabled={isOrdering || product.status !== "preorder_open"}
                  className="w-full py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {isOrdering ? "Processing..." : `Pre-Order Now - $${product.depositAmount} Deposit`}
                </button>
              ) : (
                <Link
                  to="/$countryCode/account/login"
                  params={{ countryCode }}
                  className="block w-full py-4 bg-blue-500 text-white font-semibold rounded-lg text-center hover:bg-blue-600 transition-colors"
                >
                  Sign In to Pre-Order
                </Link>
              )
            ) : (
              <button
                disabled
                className="w-full py-4 bg-city-slate/50 text-city-gray font-semibold rounded-lg cursor-not-allowed"
              >
                Sold Out
              </button>
            )}

            <p className="text-city-gray text-sm text-center mt-4">
              Cancel anytime before shipping for a full refund
            </p>

            {/* Long Description */}
            <div className="mt-8 prose prose-invert max-w-none">
              <h3 className="text-lg font-semibold text-white mb-4">About This Product</h3>
              <p className="text-city-gray whitespace-pre-line">{product.longDescription}</p>
            </div>

            {/* FAQs */}
            {product.faqs.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {product.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="bg-city-slate/30 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <span className="text-white font-medium">{faq.question}</span>
                        {expandedFaq === i ? (
                          <ChevronRight className="w-5 h-5 text-city-gray" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-city-gray" />
                        )}
                      </button>
                      {expandedFaq === i && (
                        <div className="px-4 pb-4 text-city-gray">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
