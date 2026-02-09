import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowLeft, Check, LockClosedSolid, User, ShoppingCart } from "@medusajs/icons"
import { useConsignmentItem } from "../../../lib/hooks/use-commerce-models"

export const Route = createFileRoute("/$countryCode/consignment/$handle")({
  component: ConsignmentItemPage,
})

function ConsignmentItemPage() {
  const { countryCode, handle } = Route.useParams()
  const { data: item, isLoading } = useConsignmentItem(handle)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-city-navy flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-city-cyan border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-city-navy flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Item Not Found</h1>
          <Link to="/$countryCode/consignment" params={{ countryCode }} className="text-city-cyan hover:underline">
            Back to Consignment
          </Link>
        </div>
      </div>
    )
  }

  const handleBuyNow = () => {
    alert("Would proceed to checkout with this consignment item")
  }

  return (
    <div className="min-h-screen bg-city-navy">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link
          to="/$countryCode/consignment"
          params={{ countryCode }}
          className="inline-flex items-center gap-2 text-city-gray hover:text-city-cyan mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Consignment
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-city-slate/30 relative">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {item.verificationStatus === "verified" && (
                <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-full">
                  <Check className="w-4 h-4" />
                  Verified Authentic
                </div>
              )}
            </div>
            
            {/* Specifications */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(item.specifications).map(([key, value]) => (
                  <div key={key} className="bg-city-slate/30 p-4 rounded-lg">
                    <div className="text-city-gray text-sm">{key}</div>
                    <div className="text-white font-medium">{value}</div>
                  </div>
                ))}
                <div className="bg-city-slate/30 p-4 rounded-lg">
                  <div className="text-city-gray text-sm">Condition</div>
                  <div className="text-white font-medium capitalize">{item.condition.replace("_", " ")}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Panel */}
          <div>
            <span className="text-orange-400 text-sm font-medium">{item.category}</span>
            <h1 className="text-3xl font-bold text-white mt-2 mb-4">{item.title}</h1>
            <p className="text-city-gray mb-6">{item.description}</p>

            {/* Verification Badge */}
            {item.verificationStatus === "verified" && (
              <div className="flex items-start gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg mb-6">
                <LockClosedSolid className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <div className="text-green-400 font-semibold">Verified by Our Experts</div>
                  <div className="text-city-gray text-sm">
                    {item.verificationNotes || "This item has been inspected and verified for authenticity and functionality."}
                  </div>
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="bg-city-slate/30 border border-city-slate/50 rounded-xl p-6 mb-6">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-city-gray text-sm">Price</div>
                  <div className="text-3xl font-bold text-white">${item.listedPrice}</div>
                </div>
                {item.askingPrice > item.listedPrice && (
                  <div className="text-right">
                    <div className="text-city-gray text-sm line-through">${item.askingPrice}</div>
                    <div className="text-green-400 font-semibold">
                      Save ${item.askingPrice - item.listedPrice}
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </button>
            </div>

            {/* Seller Info */}
            <div className="p-4 bg-city-slate/30 rounded-lg mb-6">
              <h4 className="text-white font-semibold mb-3">Seller Information</h4>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-city-cyan/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-city-cyan" />
                </div>
                <div>
                  <div className="text-white font-medium">{item.sellerName}</div>
                  <div className="text-city-gray text-sm">
                    Listed {new Date(item.listedDate || item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="space-y-3">
              {[
                "30-day warranty included",
                "Verified authentic and functional",
                "Secure payment processing",
                "Free shipping on this item",
              ].map((guarantee, i) => (
                <div key={i} className="flex items-center gap-3 text-city-gray">
                  <Check className="w-5 h-5 text-orange-400" />
                  <span>{guarantee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
