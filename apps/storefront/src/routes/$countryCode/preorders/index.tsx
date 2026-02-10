import { createFileRoute, Link } from "@tanstack/react-router"
import { Clock, ArrowRight, Sparkles } from "@medusajs/icons"
import { usePreorderProducts } from "../../../lib/hooks/use-commerce-models"

export const Route = createFileRoute("/$countryCode/preorders/")({
  component: PreordersPage,
})

function PreordersPage() {
  const { countryCode } = Route.useParams()
  const { data: products, isLoading } = usePreorderProducts()

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-city-navy">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-city-navy" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Coming Soon</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pre-Order New Products
            </h1>
            <p className="text-xl text-city-gray mb-8">
              Be first in line for our newest smart home innovations. 
              Reserve now with a deposit and get priority shipping.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-city-gray">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-city-cyan rounded-full" />
                <span>Low deposit to reserve</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-city-cyan rounded-full" />
                <span>Priority shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-city-cyan rounded-full" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8">Available for Pre-Order</h2>
        
        {isLoading ? (
          <div className="space-y-8">
            {[1, 2].map(i => (
              <div key={i} className="bg-city-slate/30 rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {products?.map(product => (
              <Link
                key={product.id}
                to="/$countryCode/preorders/$handle"
                params={{ countryCode, handle: product.handle }}
                className="group block bg-city-slate/30 border border-city-slate/50 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
              >
                <div className="grid md:grid-cols-2">
                  <div className="aspect-video md:aspect-auto relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full">
                      Pre-Order Now
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col justify-center">
                    <span className="text-blue-400 text-sm font-medium">{product.category}</span>
                    <h3 className="text-2xl font-bold text-white mt-2 mb-3 group-hover:text-blue-400 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-city-gray mb-6 line-clamp-3">
                      {product.description}
                    </p>
                    
                    {/* Release Date */}
                    <div className="flex items-center gap-2 text-city-gray mb-4">
                      <Clock className="w-5 h-5" />
                      <span>Expected: {formatDate(product.releaseDate)}</span>
                    </div>
                    
                    {/* Slots */}
                    {product.totalSlots && (
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-city-gray">Pre-orders remaining</span>
                          <span className="text-white font-semibold">
                            {product.remainingSlots} / {product.totalSlots}
                          </span>
                        </div>
                        <div className="h-2 bg-city-navy/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                            style={{
                              width: `${((product.totalSlots - (product.remainingSlots || 0)) / product.totalSlots) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Pricing */}
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-city-gray text-sm">Full Price</div>
                        <div className="text-2xl font-bold text-white">${product.price}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-city-gray text-sm">Deposit ({product.depositPercent}%)</div>
                        <div className="text-xl font-bold text-city-cyan">${product.depositAmount}</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center gap-2 text-blue-400 group-hover:gap-3 transition-all">
                      <span className="font-semibold">Reserve Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="py-16 bg-city-slate/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-12 text-center">How Pre-Orders Work</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Pay Deposit", desc: "Secure your spot with a small deposit" },
              { step: "2", title: "Get Updates", desc: "Receive exclusive development updates" },
              { step: "3", title: "Pay Balance", desc: "Complete payment before shipping" },
              { step: "4", title: "Priority Ship", desc: "Get yours before general release" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-blue-500 text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-city-gray text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
