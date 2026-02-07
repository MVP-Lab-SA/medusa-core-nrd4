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

const Cart = () => {
  const { data: cart, isLoading } = useCart()
  const sortedItems = sortCartItems(cart?.items || [])
  const location = useLocation()
  const countryCode = getCountryCodeFromPath(location.pathname) || "us"

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

              <div className="mt-6">
                <CartPromo cart={cart} />
              </div>

              <div className="mt-8">
                <Link to="/$countryCode/checkout" params={{ countryCode }}>
                  <Button className="w-full" variant="primary">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
