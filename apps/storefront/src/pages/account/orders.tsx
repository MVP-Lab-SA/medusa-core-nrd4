import { Link } from "@tanstack/react-router"
import { ShoppingBag, ArrowRight, TruckFast, Check, Clock, XCircle, BuildingStorefront } from "@medusajs/icons"
import { useCustomerOrders } from "@/lib/hooks/use-orders"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountPageHeader,
  AccountCard,
  AccountBadge,
  AccountEmptyState,
  AccountSkeleton,
} from "@/components/account/AccountUI"

interface OrdersPageProps {
  countryCode: string
}

const statusConfig = {
  pending: { icon: Clock, color: "warning" as const, label: "Pending" },
  processing: { icon: BuildingStorefront, color: "info" as const, label: "Processing" },
  shipped: { icon: TruckFast, color: "info" as const, label: "Shipped" },
  delivered: { icon: Check, color: "success" as const, label: "Delivered" },
  canceled: { icon: XCircle, color: "error" as const, label: "Canceled" },
}

export function AccountOrdersPage({ countryCode }: OrdersPageProps) {
  const { data: orders, isLoading } = useCustomerOrders()

  return (
    <AccountLayout currentPath={`/${countryCode}/account/orders`}>
      <AccountPageHeader
        title="My Orders"
        description="View and track all your orders"
        breadcrumbs={[
          { label: "Account", href: `/${countryCode}/account` },
          { label: "Orders" },
        ]}
      />

      {isLoading ? (
        <div className="space-y-4">
          <AccountSkeleton height="h-40" />
          <AccountSkeleton height="h-40" />
          <AccountSkeleton height="h-40" />
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.fulfillment_status as keyof typeof statusConfig] || statusConfig.pending
            const StatusIcon = status.icon

            return (
              <AccountCard key={order.id}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-white font-semibold">Order #{order.display_id}</span>
                        <AccountBadge variant={status.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </AccountBadge>
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
                    {order.items?.slice(0, 4).map((item, index) => (
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
                    {order.items && order.items.length > 4 && (
                      <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-gray-400">+{order.items.length - 4}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <p className="text-sm text-gray-400">
                      {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
                    </p>
                    <Link
                      to={`/${countryCode}/orders/${order.id}`}
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </AccountCard>
            )
          })}
        </div>
      ) : (
        <AccountEmptyState
          icon={<ShoppingBag className="w-12 h-12" />}
          title="No orders yet"
          description="You haven't placed any orders yet. Start shopping to see your orders here."
          action={{
            label: "Start Shopping",
            href: `/${countryCode}/products`,
          }}
        />
      )}
    </AccountLayout>
  )
}
