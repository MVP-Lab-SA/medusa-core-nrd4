import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowRight, Check, Spinner } from "@medusajs/icons"
import { useTradeInPrograms } from "../../../lib/hooks/use-commerce-models"

export const Route = createFileRoute("/$countryCode/trade-in/")({
  component: TradeInPage,
})

function TradeInPage() {
  const { countryCode } = Route.useParams()
  const { data: programs, isLoading } = useTradeInPrograms()

  return (
    <div className="min-h-screen bg-city-navy">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 to-city-navy" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6">
              <Spinner className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Sustainable Upgrade</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trade In Your Old Devices
            </h1>
            <p className="text-xl text-city-gray mb-8">
              Get credit toward new purchases when you trade in your old smart home devices. 
              Good for your wallet, good for the planet.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-city-gray">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>Instant quote</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>Free shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>Store credit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trade-In Programs */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8">Trade-In Programs</h2>
        
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-city-slate/30 rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {programs?.map(program => (
              <Link
                key={program.id}
                to="/$countryCode/trade-in/$handle"
                params={{ countryCode, handle: program.handle }}
                className="group bg-city-slate/30 border border-city-slate/50 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-city-navy to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                      Up to ${program.maxValue} credit
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <span className="text-emerald-400 text-sm font-medium">{program.category}</span>
                  <h3 className="text-xl font-semibold text-white mt-1 mb-2 group-hover:text-emerald-400 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-city-gray text-sm mb-4">
                    {program.description}
                  </p>
                  
                  {/* Eligible Products */}
                  <div className="mb-4">
                    <div className="text-city-gray text-xs mb-2">Accepts:</div>
                    <div className="flex flex-wrap gap-1">
                      {program.eligibleProducts.slice(0, 3).map((product, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-city-navy/50 text-city-gray text-xs rounded"
                        >
                          {product}
                        </span>
                      ))}
                      {program.eligibleProducts.length > 3 && (
                        <span className="px-2 py-1 text-city-gray text-xs">
                          +{program.eligibleProducts.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-emerald-400 group-hover:gap-3 transition-all">
                    <span className="font-medium">Get Quote</span>
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
          <h2 className="text-2xl font-bold text-white mb-12 text-center">How Trade-In Works</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Get a Quote", desc: "Tell us about your device and condition" },
              { step: "2", title: "Ship It Free", desc: "Use our prepaid shipping label" },
              { step: "3", title: "We Inspect", desc: "Our team verifies the device" },
              { step: "4", title: "Get Credit", desc: "Receive store credit for your purchase" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-emerald-500 text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-city-gray text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Guide */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Trade-In Value Guide</h2>
        <div className="max-w-2xl mx-auto">
          <div className="bg-city-slate/30 rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 bg-city-slate/50 text-sm font-semibold text-white">
              <div>Condition</div>
              <div className="text-center">Description</div>
              <div className="text-center">Value</div>
              <div className="text-center">Example</div>
            </div>
            {[
              { condition: "Excellent", desc: "Like new, minimal use", value: "100%", color: "text-green-400" },
              { condition: "Good", desc: "Light wear, fully functional", value: "75%", color: "text-emerald-400" },
              { condition: "Fair", desc: "Visible wear, works well", value: "50%", color: "text-amber-400" },
              { condition: "Poor", desc: "Heavy wear, still works", value: "25%", color: "text-orange-400" },
            ].map((tier, i) => (
              <div key={i} className="grid grid-cols-4 gap-4 p-4 border-t border-city-slate/50 text-sm">
                <div className={`font-semibold ${tier.color}`}>{tier.condition}</div>
                <div className="text-city-gray text-center">{tier.desc}</div>
                <div className={`text-center font-semibold ${tier.color}`}>{tier.value}</div>
                <div className="text-city-gray text-center">
                  {tier.condition === "Excellent" && "Up to $150"}
                  {tier.condition === "Good" && "Up to $112"}
                  {tier.condition === "Fair" && "Up to $75"}
                  {tier.condition === "Poor" && "Up to $37"}
                </div>
              </div>
            ))}
          </div>
          <p className="text-city-gray text-sm text-center mt-4">
            * Values shown are examples based on max $150 trade-in value. Actual values vary by device.
          </p>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-16 bg-emerald-500/10 border-y border-emerald-500/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Make a Difference</h2>
          <p className="text-city-gray max-w-2xl mx-auto mb-8">
            Every trade-in helps reduce electronic waste. Devices in good condition are refurbished 
            and resold. Others are responsibly recycled, keeping harmful materials out of landfills.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">2,500+</div>
              <div className="text-city-gray">Devices traded in</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">1.2 tons</div>
              <div className="text-city-gray">E-waste prevented</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">$125K</div>
              <div className="text-city-gray">Credit issued</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
