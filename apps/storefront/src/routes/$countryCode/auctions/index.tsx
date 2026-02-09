import { createFileRoute, Link } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { Clock, ArrowRight, EllipsisHorizontal } from "@medusajs/icons"
import { useAuctions } from "../../../lib/hooks/use-commerce-models"

export const Route = createFileRoute("/$countryCode/auctions/")({
  component: AuctionsPage,
})

function CountdownTimer({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endTime).getTime()
      const now = Date.now()
      const diff = end - now

      if (diff <= 0) {
        setTimeLeft("Ended")
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`)
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
      } else {
        setTimeLeft(`${minutes}m ${seconds}s`)
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [endTime])

  return <span>{timeLeft}</span>
}

function AuctionsPage() {
  const { countryCode } = Route.useParams()
  const { data: auctions, isLoading } = useAuctions()
  const [filter, setFilter] = useState<"all" | "active" | "upcoming" | "ended">("all")

  const filteredAuctions = auctions?.filter(a => {
    if (filter === "all") return true
    return a.status === filter
  })

  return (
    <div className="min-h-screen bg-city-navy">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-city-navy" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">Live Bidding</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Smart Home Auctions
            </h1>
            <p className="text-xl text-city-gray mb-8">
              Bid on rare, limited edition, and pre-owned smart home devices. 
              Find deals you won't find anywhere else.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { value: "all", label: "All Auctions" },
            { value: "active", label: "Live Now" },
            { value: "upcoming", label: "Upcoming" },
            { value: "ended", label: "Ended" },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value as typeof filter)}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === f.value
                  ? "bg-city-cyan text-city-navy font-semibold"
                  : "bg-city-slate/30 text-city-gray hover:bg-city-slate/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Auctions Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-city-slate/30 rounded-xl h-[450px] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions?.map(auction => (
              <Link
                key={auction.id}
                to="/$countryCode/auctions/$handle"
                params={{ countryCode, handle: auction.handle }}
                className="group bg-city-slate/30 border border-city-slate/50 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={auction.images[0]}
                    alt={auction.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {auction.status === "active" && (
                    <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                  )}
                  {auction.status === "upcoming" && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                      Upcoming
                    </span>
                  )}
                  {auction.status === "ended" && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-city-slate text-white text-xs font-semibold rounded-full">
                      Ended
                    </span>
                  )}
                  <span className="absolute top-3 right-3 px-3 py-1 bg-city-navy/80 text-white text-xs font-medium rounded-full">
                    {auction.condition === "new" ? "New" : auction.condition === "like_new" ? "Like New" : "Used"}
                  </span>
                </div>
                
                <div className="p-6">
                  <span className="text-purple-400 text-sm font-medium">{auction.category}</span>
                  <h3 className="text-xl font-semibold text-white mt-1 mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                    {auction.title}
                  </h3>
                  
                  {/* Current Bid */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-city-gray text-sm">Current Bid:</span>
                    <span className="text-2xl font-bold text-white">
                      ${auction.currentBid || auction.startingPrice}
                    </span>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-city-gray mb-4">
                    <span>{auction.bidCount} bids</span>
                    <span>{auction.watcherCount} watchers</span>
                  </div>
                  
                  {/* Time Left */}
                  {auction.status === "active" && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 font-medium">
                        <CountdownTimer endTime={auction.endTime} />
                      </span>
                      <span className="text-city-gray">left</span>
                    </div>
                  )}
                  {auction.status === "upcoming" && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-400">
                        Starts {new Date(auction.startTime).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  
                  {/* Buy Now */}
                  {auction.buyNowPrice && auction.status === "active" && (
                    <div className="mt-4 pt-4 border-t border-city-slate/50 flex items-center justify-between">
                      <span className="text-city-gray text-sm">Buy Now:</span>
                      <span className="text-city-cyan font-semibold">${auction.buyNowPrice}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredAuctions?.length === 0 && (
          <div className="text-center py-16">
            <EllipsisHorizontal className="w-12 h-12 text-city-gray mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Auctions Found</h3>
            <p className="text-city-gray">Check back later for new auctions.</p>
          </div>
        )}
      </section>

      {/* How Auctions Work */}
      <section className="py-16 bg-city-slate/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-12 text-center">How Auctions Work</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Find an Auction", desc: "Browse live and upcoming auctions" },
              { step: "2", title: "Place Your Bid", desc: "Enter your bid or set auto-bid max" },
              { step: "3", title: "Win & Pay", desc: "Highest bidder wins when time expires" },
              { step: "4", title: "Receive Item", desc: "Shipped directly to your door" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-purple-500 text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
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
