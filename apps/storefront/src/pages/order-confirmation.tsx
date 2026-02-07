import { OrderDetails } from "@/components/order"
import { Loading } from "@/components/ui/loading"
import { useOrder } from "@/lib/hooks/use-orders"
import { CheckCircleSolid } from "@medusajs/icons"
import { useLoaderData } from "@tanstack/react-router"

const OrderConfirmation = () => {
  const { orderId } = useLoaderData({
    from: "/$countryCode/order/$orderId/confirmed",
  })
  const { data: order, isLoading } = useOrder(orderId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-city-dark flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-city-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-city-white mb-2">Order not found</h1>
          <p className="text-city-muted">We couldn't find the order you're looking for.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-city-dark">
      <div className="content-container py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-city-cyan/10 mb-6">
            <CheckCircleSolid className="w-8 h-8 text-city-cyan" />
          </div>
          <h1 className="text-3xl font-bold text-city-white mb-2">Order Confirmed</h1>
          <p className="text-city-muted">Thank you for your order. We've received your payment and will begin processing your order shortly.</p>
        </div>

        {/* Order Details */}
        <div className="max-w-3xl mx-auto bg-city-navy border border-city-steel/30 rounded-lg p-8">
          <OrderDetails order={order} />
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
