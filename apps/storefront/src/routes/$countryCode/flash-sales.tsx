import { createFileRoute, Link } from "@tanstack/react-router"
import { Bolt } from "@medusajs/icons"
import { useFlashSales } from "../../lib/hooks/use-marketplace"
import { CountdownTimer } from "../../components/promotions/CountdownTimer"

export const Route = createFileRoute("/$countryCode/flash-sales")({
  component: FlashSalesPage,
})

function FlashSalesPage() {
  const { countryCode } = Route.useParams()
  const { data: sales, isLoading } = useFlashSales()

  const activeSales = sales?.filter((s) => s.status === "active") || []
  const upcomingSales = sales?.filter((s) => s.status === "upcoming") || []

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Bolt className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Flash Sales</h1>
          <p className="text-xl text-white/80">
            Limited time offers with incredible savings. Don't miss out!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-64 bg-gray-900 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Active Sales */}
            {activeSales.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Active Now</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {activeSales.map((sale) => (
                    <div
                      key={sale.id}
                      className="bg-gradient-to-br from-red-600 to-orange-500 rounded-xl p-6 text-white"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Bolt className="w-8 h-8" />
                        <h3 className="text-2xl font-bold">{sale.name}</h3>
                      </div>
                      <p className="text-white/80 mb-4">{sale.description}</p>
                      <div className="mb-4">
                        <p className="text-sm text-white/70 mb-2">Ends in:</p>
                        <CountdownTimer endDate={sale.endTime} variant="light" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold">Up to {sale.discountPercent}% OFF</span>
                        <Link
                          to={`/${countryCode}/collections/${sale.collectionHandle || "sale"}`}
                          className="px-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-900"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Sales */}
            {upcomingSales.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Coming Soon</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {upcomingSales.map((sale) => (
                    <div
                      key={sale.id}
                      className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-white"
                    >
                      <h3 className="text-xl font-bold mb-2">{sale.name}</h3>
                      <p className="text-gray-400 mb-4">{sale.description}</p>
                      <p className="text-sm text-gray-500">
                        Starts: {new Date(sale.startTime).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSales.length === 0 && upcomingSales.length === 0 && (
              <div className="text-center py-12">
                <Bolt className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-400 text-xl">No flash sales at the moment</p>
                <p className="text-gray-500 mt-2">Check back soon for exciting deals!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
