import { createFileRoute, Link } from "@tanstack/react-router"
import { Clock, ArrowRight, Spinner } from "@medusajs/icons"
import { useRentalProducts } from "../../../lib/hooks/use-commerce-models"

export const Route = createFileRoute("/$countryCode/rentals/")({
  component: RentalsPage,
})

function RentalsPage() {
  const { countryCode } = Route.useParams()
  const { data: products, isLoading } = useRentalProducts()

  return (
    <div className="min-h-screen bg-city-navy">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-city-slate/50 to-city-navy" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-city-cyan/10 border border-city-cyan/30 rounded-full mb-6">
              <Clock className="w-4 h-4 text-city-cyan" />
              <span className="text-city-cyan text-sm font-medium">Flexible Rental Terms</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Rent Smart Home Devices
            </h1>
            <p className="text-xl text-city-gray mb-8">
              Try before you commit. Rent security cameras, smart displays, and more for events, 
              temporary installations, or extended trials.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-city-gray">
                <Clock className="w-5 h-5 text-city-cyan" />
                <span>Daily, Weekly, or Monthly</span>
              </div>
              <div className="flex items-center gap-2 text-city-gray">
                <Spinner className="w-5 h-5 text-city-cyan" />
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center gap-2 text-city-gray">
                <Clock className="w-5 h-5 text-city-cyan" />
                <span>Refundable Deposits</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8">Available for Rent</h2>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-city-slate/30 rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map(product => (
              <Link
                key={product.id}
                to="/$countryCode/rentals/$handle"
                params={{ countryCode, handle: product.handle }}
                className="group bg-city-slate/30 border border-city-slate/50 rounded-xl overflow-hidden hover:border-city-cyan/50 transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.available ? (
                    <span className="absolute top-3 right-3 px-3 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full">
                      Available
                    </span>
                  ) : (
                    <span className="absolute top-3 right-3 px-3 py-1 bg-red-500/90 text-white text-xs font-medium rounded-full">
                      Unavailable
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-city-cyan text-sm font-medium">{product.category}</span>
                  <h3 className="text-xl font-semibold text-white mt-1 mb-2 group-hover:text-city-cyan transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-city-gray text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-city-navy/50 rounded-lg">
                      <div className="text-white font-semibold">${product.dailyRate}</div>
                      <div className="text-city-gray text-xs">/ day</div>
                    </div>
                    <div className="text-center p-2 bg-city-navy/50 rounded-lg">
                      <div className="text-white font-semibold">${product.weeklyRate}</div>
                      <div className="text-city-gray text-xs">/ week</div>
                    </div>
                    <div className="text-center p-2 bg-city-navy/50 rounded-lg">
                      <div className="text-white font-semibold">${product.monthlyRate}</div>
                      <div className="text-city-gray text-xs">/ month</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-city-gray">
                      Deposit: <span className="text-white">${product.deposit}</span>
                    </span>
                    <span className="flex items-center gap-1 text-city-cyan group-hover:gap-2 transition-all">
                      View Details <ArrowRight className="w-4 h-4" />
                    </span>
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
          <h2 className="text-2xl font-bold text-white mb-12 text-center">How Rentals Work</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Choose Your Device", desc: "Browse our selection and pick the device you need" },
              { step: "2", title: "Select Duration", desc: "Choose daily, weekly, or monthly rental periods" },
              { step: "3", title: "Pay Deposit", desc: "Secure your rental with a refundable deposit" },
              { step: "4", title: "Return & Refund", desc: "Return in good condition and get your deposit back" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-city-cyan text-city-navy font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
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
