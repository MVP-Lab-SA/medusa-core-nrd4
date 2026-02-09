import { createFileRoute, Link } from "@tanstack/react-router"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { useCustomerOrders } from "../../../lib/hooks/use-orders"
import { ShoppingBag, ArrowRight, TruckFast, Check, Clock, XCircle } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/account/orders")({
  component: OrdersPage,
})

function OrdersPage() {
  const { countryCode } = Route.useParams()
  const { data: orders, isLoading } = useCustomerOrders()

  const statusConfig = {
    pending: { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/20", label: "Pending" },
    processing: { icon: TruckFast, color: "text-cyan-400", bg: "bg-cyan-500/20", label: "Processing" },
    shipped: { icon: TruckFast, color: "text-blue-400", bg: "bg-blue-500/20", label: "Shipped" },
    delivered: { icon: Check, color: "text-green-400", bg: "bg-green-500/20", label: "Delivered" },
    canceled: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/20", label: "Canceled" },
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/orders`}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">My Orders</h1>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.fulfillment_status as keyof typeof statusConfig] || statusConfig.pending
            const StatusIcon = status.icon

            return (
              <div
                key={order.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-white font-semibold">Order #{order.display_id}</span>
                      <span className={`flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${status.bg} ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    ${((order.total || 0) / 100).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  {order.items?.slice(0, 3).map((item, index) => (
                    <div
                      key={index}
                      className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden"
                    >
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ShoppingBag className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                  ))}
                  {order.items && order.items.length > 3 && (
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-gray-400">+{order.items.length - 3}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <p className="text-sm text-gray-400">
                    {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
                  </p>
                  <Link
                    to={`/${countryCode}/orders/${order.id}`}
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
          <ShoppingBag className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">You haven't placed any orders yet</p>
          <Link
            to={`/${countryCode}/products`}
            className="px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </AccountLayout>
  )
}
