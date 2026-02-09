import { createFileRoute, Link } from "@tanstack/react-router"
import { Clock, LockClosedSolid, ArrowRight, Check, ArrowDownTray } from "@medusajs/icons"
import { useTrialProducts } from "../../../lib/hooks/use-commerce-models"

export const Route = createFileRoute("/$countryCode/try-before-you-buy/")({
  component: TryBeforeYouBuyPage,
})

function TryBeforeYouBuyPage() {
  const { countryCode } = Route.useParams()
  const { data: products, isLoading } = useTrialProducts()

  return (
    <div className="min-h-screen bg-city-navy">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 to-city-navy" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full mb-6">
              <LockClosedSolid className="w-4 h-4 text-teal-400" />
              <span className="text-teal-400 text-sm font-medium">Risk-Free Trial</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Try Before You Buy
            </h1>
            <p className="text-xl text-city-gray mb-8">
              Experience our smart home devices in your own home for 14 days. 
              Love it? Keep it. Not for you? Return it - no questions asked.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-city-gray">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-400" />
                <span>14-day trial period</span>
              </div>
              <div className="flex items-center gap-2">
                <LockClosedSolid className="w-5 h-5 text-teal-400" />
                <span>Small trial fee only</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowDownTray className="w-5 h-5 text-teal-400" />
                <span>Free return shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8">Available for Trial</h2>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-city-slate/30 rounded-xl h-[450px] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map(product => (
              <Link
                key={product.id}
                to="/$countryCode/try-before-you-buy/$handle"
                params={{ countryCode, handle: product.handle }}
                className="group bg-city-slate/30 border border-city-slate/50 rounded-xl overflow-hidden hover:border-teal-500/50 transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-teal-500 text-white text-xs font-semibold rounded-full">
                    {product.trialDays}-Day Trial
                  </div>
                  {product.available ? (
                    <span className="absolute top-3 right-3 px-3 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full">
                      Available
                    </span>
                  ) : (
                    <span className="absolute top-3 right-3 px-3 py-1 bg-city-slate text-white text-xs font-medium rounded-full">
                      Unavailable
                    </span>
                  )}
                </div>
                
                <div className="p-6">
                  <span className="text-teal-400 text-sm font-medium">{product.category}</span>
                  <h3 className="text-xl font-semibold text-white mt-1 mb-2 group-hover:text-teal-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-city-gray text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Pricing */}
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="text-city-gray text-sm">Try for</div>
                      <div className="text-2xl font-bold text-teal-400">${product.trialFee}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-city-gray text-sm">Full price</div>
                      <div className="text-lg font-semibold text-white">${product.price}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-teal-400 group-hover:gap-3 transition-all">
                    <span className="font-medium">Start Trial</span>
                    <ArrowRight className="w-4 h-4" />
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
          <h2 className="text-2xl font-bold text-white mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Choose & Pay Trial Fee", desc: "Select a product and pay a small trial fee" },
              { step: "2", title: "Try at Home", desc: "Use the product for 14 days in your home" },
              { step: "3", title: "Decide", desc: "Love it? Keep it. Not for you? Return it." },
              { step: "4", title: "Simple Outcome", desc: "Keep: pay the balance. Return: get trial fee back" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-teal-500 text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-city-gray text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Why Try Before You Buy?</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { 
              title: "No Commitment",
              desc: "Test products in your actual environment before making a decision"
            },
            { 
              title: "Full Refund Option",
              desc: "Return within the trial period and get your trial fee refunded"
            },
            { 
              title: "Easy Returns",
              desc: "Free return shipping with prepaid labels included"
            },
          ].map((benefit, i) => (
            <div key={i} className="p-6 bg-city-slate/30 rounded-xl text-center">
              <Check className="w-10 h-10 text-teal-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
              <p className="text-city-gray text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
