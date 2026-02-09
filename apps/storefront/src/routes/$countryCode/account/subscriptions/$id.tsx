import { createFileRoute } from "@tanstack/react-router"
import { NextBillingCard, SubscriptionStatus } from "@/components/subscriptions"
import { CubeSolid, Calendar, CreditCard, CogSixTooth, ArrowLeft, PauseSolid, XMark, ArrowPath } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/account/subscriptions/$id")({
  component: SubscriptionDetailPage,
})

function SubscriptionDetailPage() {
  const { id } = Route.useParams()

  // Mock subscription data
  const subscription = {
    id,
    plan: "Premium Monthly Box",
    status: "active",
    startDate: "2023-06-15",
    nextBillingDate: "2024-02-01",
    price: 49.99,
    paymentMethod: "**** **** **** 4242",
    shippingAddress: "123 Main St, Apt 4B, New York, NY 10001",
    orderHistory: [
      { id: "BOX-001", date: "2024-01-01", status: "delivered", total: 49.99 },
      { id: "BOX-002", date: "2023-12-01", status: "delivered", total: 49.99 },
      { id: "BOX-003", date: "2023-11-01", status: "delivered", total: 49.99 },
    ],
    upcomingBox: {
      shipDate: "2024-02-01",
      items: ["Skincare Set", "Wellness Product", "Surprise Item"],
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <a href="/account/subscriptions" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Subscriptions
      </a>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{subscription.plan}</h1>
          <p className="text-gray-400">Subscription ID: {subscription.id}</p>
        </div>
        <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full font-medium capitalize">
          {subscription.status}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Box */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Your Next Box
            </h2>
            <p className="text-white/80 mb-4">Ships on {subscription.upcomingBox.shipDate}</p>
            <div className="space-y-2">
              {subscription.upcomingBox.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subscription Details */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Subscription Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium text-white">{subscription.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Billing</p>
                <p className="font-medium text-white">{subscription.nextBillingDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Cost</p>
                <p className="font-medium text-white">${subscription.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium text-white">{subscription.paymentMethod}</p>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Order History</h2>
            <div className="space-y-3">
              {subscription.orderHistory.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">${order.total}</p>
                    <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Next Billing */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Next Billing
            </h2>
            <p className="text-3xl font-bold text-white mb-2">${subscription.price}</p>
            <p className="text-gray-400 mb-4">on {subscription.nextBillingDate}</p>
            <button className="w-full border border-gray-700 text-gray-300 py-2 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4" />
              Update Payment
            </button>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Shipping Address</h2>
            <p className="text-gray-400 mb-4">{subscription.shippingAddress}</p>
            <button className="w-full border border-gray-700 text-gray-300 py-2 rounded-lg hover:bg-gray-800 text-sm">
              Update Address
            </button>
          </div>

          {/* Actions */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Manage Subscription
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800">
                <RefreshCw className="w-4 h-4" />
                Change Plan
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2 border border-amber-500/50 rounded-lg hover:bg-amber-500/10 text-amber-400">
                <Pause className="w-4 h-4" />
                Pause Subscription
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2 border border-red-500/50 rounded-lg hover:bg-red-500/10 text-red-400">
                <X className="w-4 h-4" />
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
