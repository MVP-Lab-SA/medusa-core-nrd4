import { createFileRoute, Link } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { ArrowLeft, Clock, User, ChevronRight, ShoppingCart } from "@medusajs/icons"
import { useAuction, useAuctionBids, usePlaceBid } from "../../../lib/hooks/use-commerce-models"
import { useCustomer } from "@/lib/context/customer-context"

export const Route = createFileRoute("/$countryCode/auctions/$handle")({
  component: AuctionDetailPage,
})

function CountdownTimer({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endTime).getTime()
      const now = Date.now()
      const diff = end - now

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [endTime])

  return (
    <div className="grid grid-cols-4 gap-3">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Mins" },
        { value: timeLeft.seconds, label: "Secs" },
      ].map((item, i) => (
        <div key={i} className="text-center p-3 bg-city-navy/50 rounded-lg">
          <div className="text-2xl font-bold text-white">{item.value.toString().padStart(2, "0")}</div>
          <div className="text-city-gray text-xs">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

function AuctionDetailPage() {
  const { countryCode, handle } = Route.useParams()
  const { data: auction, isLoading } = useAuction(handle)
  const { data: bids } = useAuctionBids(auction?.id || "")
  const { customer } = useCustomer()
  const placeBid = usePlaceBid()
  
  const [bidAmount, setBidAmount] = useState("")
  const [isBidding, setIsBidding] = useState(false)

  useEffect(() => {
    if (auction) {
      const minBid = (auction.currentBid || auction.startingPrice) + 10
      setBidAmount(minBid.toString())
    }
  }, [auction])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-city-navy flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-city-cyan border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!auction) {
    return (
      <div className="min-h-screen bg-city-navy flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Auction Not Found</h1>
          <Link to="/$countryCode/auctions" params={{ countryCode }} className="text-city-cyan hover:underline">
            Back to Auctions
          </Link>
        </div>
      </div>
    )
  }

  const minBid = (auction.currentBid || auction.startingPrice) + 10
  const isActive = auction.status === "active"

  const handlePlaceBid = async () => {
    if (!customer || !bidAmount) return
    const amount = parseFloat(bidAmount)
    if (amount < minBid) {
      alert(`Minimum bid is $${minBid}`)
      return
    }
    
    setIsBidding(true)
    try {
      await placeBid.mutateAsync({
        auctionId: auction.id,
        customerId: customer.id,
        customerName: `${customer.first_name} ${customer.last_name?.charAt(0)}.`,
        amount,
      })
      setBidAmount((amount + 10).toString())
    } catch (error: any) {
      alert(error.message || "Failed to place bid")
    } finally {
      setIsBidding(false)
    }
  }

  const handleBuyNow = () => {
    alert("Buy Now functionality - would proceed to checkout")
  }

  return (
    <div className="min-h-screen bg-city-navy">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link
          to="/$countryCode/auctions"
          params={{ countryCode }}
          className="inline-flex items-center gap-2 text-city-gray hover:text-city-cyan mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Auctions
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-city-slate/30 relative">
              <img
                src={auction.images[0]}
                alt={auction.title}
                className="w-full h-full object-cover"
              />
              {isActive && (
                <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-full">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE AUCTION
                </div>
              )}
            </div>
            
            {/* Specifications */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Item Details</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(auction.specifications).map(([key, value]) => (
                  <div key={key} className="bg-city-slate/30 p-4 rounded-lg">
                    <div className="text-city-gray text-sm">{key}</div>
                    <div className="text-white font-medium">{value}</div>
                  </div>
                ))}
                <div className="bg-city-slate/30 p-4 rounded-lg">
                  <div className="text-city-gray text-sm">Condition</div>
                  <div className="text-white font-medium capitalize">{auction.condition.replace("_", " ")}</div>
                </div>
                <div className="bg-city-slate/30 p-4 rounded-lg">
                  <div className="text-city-gray text-sm">Shipping</div>
                  <div className="text-white font-medium">
                    {auction.shippingCost === 0 ? "Free Shipping" : `$${auction.shippingCost}`}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Seller Info */}
            <div className="mt-8 p-4 bg-city-slate/30 rounded-lg flex items-center gap-4">
              <div className="w-12 h-12 bg-city-cyan/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-city-cyan" />
              </div>
              <div>
                <div className="text-white font-medium">{auction.sellerName}</div>
                <div className="text-city-gray text-sm">Verified Seller</div>
              </div>
            </div>
          </div>

          {/* Bidding Panel */}
          <div>
            <span className="text-purple-400 text-sm font-medium">{auction.category}</span>
            <h1 className="text-3xl font-bold text-white mt-2 mb-4">{auction.title}</h1>
            <p className="text-city-gray mb-6">{auction.description}</p>

            {/* Time Remaining */}
            {isActive && (
              <div className="mb-6">
                <div className="flex items-center gap-2 text-city-gray mb-3">
                  <Clock className="w-5 h-5" />
                  <span>Time Remaining</span>
                </div>
                <CountdownTimer endTime={auction.endTime} />
              </div>
            )}

            {/* Current Bid */}
            <div className="bg-city-slate/30 border border-city-slate/50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-city-gray">Current Bid</span>
                <span className="text-3xl font-bold text-white">
                  ${auction.currentBid || auction.startingPrice}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-city-gray">
                <span>{auction.bidCount} bids</span>
                <span>{auction.watcherCount} watching</span>
              </div>
              {auction.reservePrice && auction.currentBid && auction.currentBid < auction.reservePrice && (
                <div className="mt-3 text-amber-400 text-sm">
                  Reserve not yet met
                </div>
              )}
            </div>

            {/* Place Bid */}
            {isActive && (
              <div className="mb-6">
                <label className="block text-white font-medium mb-3">Your Bid</label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-city-gray">$</span>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      min={minBid}
                      step={10}
                      className="w-full pl-8 pr-4 py-4 bg-city-slate/30 border border-city-slate/50 rounded-lg text-white text-lg focus:outline-none focus:border-city-cyan"
                    />
                  </div>
                  {customer ? (
                    <button
                      onClick={handlePlaceBid}
                      disabled={isBidding}
                      className="px-8 py-4 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      <ChevronRight className="w-5 h-5" />
                      {isBidding ? "Bidding..." : "Place Bid"}
                    </button>
                  ) : (
                    <Link
                      to="/$countryCode/account/login"
                      params={{ countryCode }}
                      className="px-8 py-4 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
                    >
                      Sign In to Bid
                    </Link>
                  )}
                </div>
                <p className="text-city-gray text-sm mt-2">
                  Minimum bid: ${minBid} (+$10 increment)
                </p>
              </div>
            )}

            {/* Buy Now */}
            {auction.buyNowPrice && isActive && (
              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-city-cyan text-city-navy font-semibold rounded-lg hover:bg-city-cyan/90 transition-colors flex items-center justify-center gap-2 mb-6"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now for ${auction.buyNowPrice}
              </button>
            )}

            {/* Bid History */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Bid History</h3>
              {bids && bids.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {bids.map((bid, i) => (
                    <div
                      key={bid.id}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        i === 0 ? "bg-purple-500/20 border border-purple-500/50" : "bg-city-slate/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-city-navy/50 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-city-gray" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{bid.customerName}</div>
                          <div className="text-city-gray text-sm">
                            {new Date(bid.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${i === 0 ? "text-purple-400" : "text-white"}`}>
                          ${bid.amount}
                        </div>
                        {i === 0 && (
                          <div className="text-purple-400 text-xs font-medium">Leading</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-city-slate/30 rounded-lg">
                  <p className="text-city-gray">No bids yet. Be the first!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
