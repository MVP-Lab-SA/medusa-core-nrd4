import { createFileRoute } from "@tanstack/react-router"
import { NextBillingCard, SubscriptionStatus } from "~/components/subscriptions"
import { Package, Calendar, CreditCard, Settings, ArrowLeft, Pause, X, RefreshCw } from "lucide-react"

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
      <a href="/account/subscriptions" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Subscriptions
      </a>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{subscription.plan}</h1>
          <p className="text-gray-600">Subscription ID: {subscription.id}</p>
        </div>
        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium capitalize">
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
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Subscription Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">{subscription.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Billing</p>
                <p className="font-medium">{subscription.nextBillingDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Cost</p>
                <p className="font-medium">${subscription.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">{subscription.paymentMethod}</p>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Order History</h2>
            <div className="space-y-3">
              {subscription.orderHistory.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total}</p>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full capitalize">
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
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Next Billing
            </h2>
            <p className="text-3xl font-bold mb-2">${subscription.price}</p>
            <p className="text-gray-600 mb-4">on {subscription.nextBillingDate}</p>
            <button className="w-full border py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4" />
              Update Payment
            </button>
          </div>

          {/* Shipping Address */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <p className="text-gray-600 mb-4">{subscription.shippingAddress}</p>
            <button className="w-full border py-2 rounded-lg hover:bg-gray-50 text-sm">
              Update Address
            </button>
          </div>

          {/* Actions */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Manage Subscription
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-50">
                <RefreshCw className="w-4 h-4" />
                Change Plan
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-amber-50 text-amber-600 border-amber-200">
                <Pause className="w-4 h-4" />
                Pause Subscription
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-red-50 text-red-600 border-red-200">
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
