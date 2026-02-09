import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { ArrowRight, Check, LockClosedSolid, User } from "@medusajs/icons"
import { useConsignmentItems } from "../../../lib/hooks/use-commerce-models"

export const Route = createFileRoute("/$countryCode/consignment/")({
  component: ConsignmentPage,
})

function ConsignmentPage() {
  const { countryCode } = Route.useParams()
  const { data: items, isLoading } = useConsignmentItems({ status: "listed" })
  const [category, setCategory] = useState<string>("all")

  const categories = ["all", "Climate Control", "Security", "Lighting", "Smart Home"]

  const filteredItems = items?.filter(item => {
    if (category === "all") return true
    return item.category === category
  })

  return (
    <div className="min-h-screen bg-city-navy">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 to-city-navy" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-6">
              <LockClosedSolid className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 text-sm font-medium">Verified Pre-Owned</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Consignment Marketplace
            </h1>
            <p className="text-xl text-city-gray mb-8">
              Buy verified pre-owned smart home devices at great prices, or sell your 
              devices through our trusted consignment program.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/$countryCode/consignment/sell"
                params={{ countryCode }}
                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Sell Your Devices
              </Link>
              <a
                href="#browse"
                className="px-6 py-3 bg-city-slate/50 text-white font-semibold rounded-lg hover:bg-city-slate transition-colors"
              >
                Browse Items
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-b border-city-slate/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { title: "Verified Authentic", desc: "Every item inspected and verified" },
              { title: "Quality Guaranteed", desc: "30-day warranty on all items" },
              { title: "Secure Payments", desc: "Protected transactions" },
              { title: "Fair Pricing", desc: "Market-rate pricing always" },
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center">
                <Check className="w-8 h-8 text-orange-400 mb-2" />
                <h3 className="text-white font-semibold">{badge.title}</h3>
                <p className="text-city-gray text-sm">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Items */}
      <section id="browse" className="py-16 container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-white">Available Items</h2>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  category === cat
                    ? "bg-orange-500 text-white font-semibold"
                    : "bg-city-slate/30 text-city-gray hover:bg-city-slate/50"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-city-slate/30 rounded-xl h-[400px] animate-pulse" />
            ))}
          </div>
        ) : filteredItems && filteredItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <Link
                key={item.id}
                to="/$countryCode/consignment/$handle"
                params={{ countryCode, handle: item.handle }}
                className="group bg-city-slate/30 border border-city-slate/50 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.verificationStatus === "verified" && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                      <Check className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                  <span className="absolute top-3 right-3 px-3 py-1 bg-city-navy/80 text-white text-xs font-medium rounded-full capitalize">
                    {item.condition.replace("_", " ")}
                  </span>
                </div>
                
                <div className="p-6">
                  <span className="text-orange-400 text-sm font-medium">{item.category}</span>
                  <h3 className="text-xl font-semibold text-white mt-1 mb-2 group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-city-gray text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  
                  {/* Pricing */}
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-white">${item.listedPrice}</div>
                    </div>
                    {item.askingPrice > item.listedPrice && (
                      <div className="text-right">
                        <div className="text-city-gray text-sm line-through">${item.askingPrice}</div>
                        <div className="text-green-400 text-sm">
                          Save ${item.askingPrice - item.listedPrice}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Seller */}
                  <div className="flex items-center justify-between pt-4 border-t border-city-slate/50">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-city-cyan/20 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-city-cyan" />
                      </div>
                      <span className="text-city-gray text-sm">{item.sellerName}</span>
                    </div>
                    <span className="flex items-center gap-1 text-orange-400 text-sm group-hover:gap-2 transition-all">
                      View <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-city-slate/30 rounded-xl">
            <p className="text-city-gray">No items available in this category.</p>
          </div>
        )}
      </section>

      {/* Sell Your Devices */}
      <section className="py-16 bg-city-slate/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Have Devices to Sell?</h2>
            <p className="text-city-gray mb-8">
              Our consignment program makes it easy to sell your pre-owned smart home devices. 
              We handle the listing, verification, and payment - you just ship the item.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { title: "List It", desc: "Submit your device details and photos" },
                { title: "We Verify", desc: "Our experts verify and price your item" },
                { title: "Get Paid", desc: "Receive 85% of the sale price" },
              ].map((step, i) => (
                <div key={i} className="p-6 bg-city-slate/30 rounded-xl">
                  <div className="w-10 h-10 bg-orange-500 text-white font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                  <p className="text-city-gray text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
            <Link
              to="/$countryCode/consignment/sell"
              params={{ countryCode }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Start Selling
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
