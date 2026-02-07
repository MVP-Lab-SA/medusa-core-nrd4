import {
  CartEmpty,
  CartLineItem,
  CartPromo,
  CartSummary,
} from "@/components/cart"
import { Button } from "@/components/ui/button"
import { Loading } from "@/components/ui/loading"
import { useCart } from "@/lib/hooks/use-cart"
import { sortCartItems } from "@/lib/utils/cart"
import { getCountryCodeFromPath } from "@/lib/utils/region"
import { Link, useLocation } from "@tanstack/react-router"
import { useState } from "react"
import { ShieldCheck } from "@medusajs/icons"

const FREE_SHIPPING_THRESHOLD = 100

const Cart = () => {
  const { data: cart, isLoading } = useCart()
  const sortedItems = sortCartItems(cart?.items || [])
  const location = useLocation()
  const countryCode = getCountryCodeFromPath(location.pathname) || "us"
  const [promoCode, setPromoCode] = useState("")
  const [promoStatus, setPromoStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  // Calculate free shipping progress
  const cartTotal = cart?.total ? cart.total / 100 : 0
  const freeShippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0)

  const handlePromoSubmit = async () => {
    if (!promoCode.trim()) return
    setPromoStatus("loading")
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (promoCode.toLowerCase() === "save10") {
      setPromoStatus("success")
    } else {
      setPromoStatus("error")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-city-dark flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  if (!cart || sortedItems.length === 0) {
    return (
      <div className="min-h-screen bg-city-dark">
        <div className="content-container py-12">
          <h1 className="text-3xl font-bold text-city-white mb-8">Shopping Cart</h1>
          <CartEmpty />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-city-dark">
      <div className="content-container py-12">
        <h1 className="text-3xl font-bold text-city-white mb-8">Shopping Cart</h1>

        {/* Free Shipping Progress Bar */}
        <div className="bg-city-navy border border-city-steel/30 rounded-lg p-4 mb-8">
          {freeShippingProgress >= 100 ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-green-400 font-medium">You've unlocked free shipping!</span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-city-gray text-sm">
                  Add <span className="text-city-cyan font-semibold">${amountToFreeShipping.toFixed(2)}</span> more for free shipping
                </span>
                <span className="text-city-muted text-xs">${cartTotal.toFixed(2)} / ${FREE_SHIPPING_THRESHOLD}</span>
              </div>
              <div className="w-full bg-city-slate rounded-full h-2">
                <div 
                  className="bg-city-cyan h-2 rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-city-navy border border-city-steel/30 rounded-lg p-6">
              <div className="divide-y divide-city-steel/30">
                {sortedItems.map((item) => (
                  <CartLineItem key={item.id} item={item} cart={cart} />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/$countryCode/store"
                params={{ countryCode }}
                className="text-city-cyan hover:text-city-cyan-light transition-colors text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-city-navy border border-city-steel/30 rounded-lg p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-city-white mb-6">Order Summary</h2>

              <CartSummary cart={cart} />

              {/* Promo Code Section */}
              <div className="mt-6 pt-6 border-t border-city-steel/30">
                <h3 className="text-sm font-medium text-city-white mb-3">Have a promo code?</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 bg-city-slate border border-city-steel/50 text-city-white rounded focus:outline-none focus:border-city-cyan"
                  />
                  <button 
                    onClick={handlePromoSubmit}
                    disabled={promoStatus === "loading"}
                    className="px-4 py-2 bg-city-slate border border-city-steel/50 text-city-white hover:border-city-cyan transition-colors disabled:opacity-50"
                  >
                    {promoStatus === "loading" ? "..." : "Apply"}
                  </button>
                </div>
                {promoStatus === "success" && (
                  <p className="text-green-400 text-sm mt-2">10% discount applied!</p>
                )}
                {promoStatus === "error" && (
                  <p className="text-red-400 text-sm mt-2">Invalid promo code</p>
                )}
              </div>

              <div className="mt-8">
                <Link to="/$countryCode/checkout" params={{ countryCode }}>
                  <Button className="w-full" variant="primary">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-city-steel/30">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Secure Checkout" },
                    { label: "Free Returns" },
                    { label: "Fast Shipping" },
                    { label: "24/7 Support" },
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-city-muted text-xs">
                      <ShieldCheck className="w-4 h-4 text-city-cyan" />
                      {badge.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
