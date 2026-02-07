import { Link, useParams } from "@tanstack/react-router"
import { ArrowLeft, CheckCircleSolid } from "@medusajs/icons"

// Inline icons since ClockSolid and TruckSolid may not exist
const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
)

const TruckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
  </svg>
)

type OrderStatus = "processing" | "shipped" | "out_for_delivery" | "delivered"

type TimelineEvent = {
  status: OrderStatus
  title: string
  description: string
  date: string
  completed: boolean
  current: boolean
}

// Demo order data
const demoOrder = {
  id: "ORD-2024-78543",
  status: "shipped" as OrderStatus,
  date: "January 15, 2024",
  total: "$547.00",
  subtotal: "$499.00",
  shipping: "$48.00",
  tax: "$0.00",
  paymentMethod: "Visa ending in 4242",
  shippingAddress: {
    name: "John Doe",
    street: "123 Smart City Ave",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "United States"
  },
  items: [
    {
      id: "1",
      title: "Urban Sensor Pro X1",
      variant: "Black / Standard",
      quantity: 2,
      price: "$299.00",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200"
    },
    {
      id: "2",
      title: "Smart Hub Controller",
      variant: "White",
      quantity: 1,
      price: "$149.00",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200"
    }
  ],
  tracking: {
    carrier: "FedEx",
    number: "794644790120"
  }
}

const timelineEvents: TimelineEvent[] = [
  {
    status: "processing",
    title: "Order Placed",
    description: "Your order has been received and is being processed",
    date: "Jan 15, 2024 - 10:30 AM",
    completed: true,
    current: false
  },
  {
    status: "processing",
    title: "Payment Confirmed",
    description: "Payment successfully processed",
    date: "Jan 15, 2024 - 10:32 AM",
    completed: true,
    current: false
  },
  {
    status: "shipped",
    title: "Shipped",
    description: "Package handed to FedEx",
    date: "Jan 16, 2024 - 2:15 PM",
    completed: true,
    current: true
  },
  {
    status: "out_for_delivery",
    title: "Out for Delivery",
    description: "Package is on the delivery vehicle",
    date: "Expected Jan 18, 2024",
    completed: false,
    current: false
  },
  {
    status: "delivered",
    title: "Delivered",
    description: "Package delivered to your address",
    date: "Expected Jan 18, 2024",
    completed: false,
    current: false
  }
]

export function OrderDetailPage() {
  const { orderId } = useParams({ strict: false })
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/us/account" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{demoOrder.id}</h1>
              <p className="text-gray-400 mt-1">Placed on {demoOrder.date}</p>
            </div>
            <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
              Shipped
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Timeline */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-6">Order Timeline</h2>
              <div className="relative">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="flex gap-4 pb-8 last:pb-0">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        event.completed
                          ? "bg-cyan-500"
                          : event.current
                          ? "bg-cyan-500/20 border-2 border-cyan-500"
                          : "bg-gray-800"
                      }`}>
                        {event.completed ? (
                          <CheckCircleSolid className="w-5 h-5 text-black" />
                        ) : event.status === "shipped" ? (
                          <TruckIcon className={`w-5 h-5 ${event.current ? "text-cyan-400" : "text-gray-500"}`} />
                        ) : (
                          <ClockIcon className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      {index < timelineEvents.length - 1 && (
                        <div className={`w-0.5 flex-1 mt-2 ${
                          event.completed ? "bg-cyan-500" : "bg-gray-700"
                        }`} />
                      )}
                    </div>
                    
                    {/* Event Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold ${event.current ? "text-cyan-400" : ""}`}>
                          {event.title}
                        </h3>
                        {event.current && (
                          <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{event.description}</p>
                      <p className="text-gray-500 text-xs mt-2">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-6">Order Items</h2>
              <div className="space-y-4">
                {demoOrder.items.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-800/50 rounded-xl">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.variant}</p>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.price}</p>
                      <p className="text-gray-500 text-sm">each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking Info */}
            {demoOrder.tracking && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">Tracking Information</h2>
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                  <div>
                    <p className="text-gray-400 text-sm">Carrier</p>
                    <p className="font-medium">{demoOrder.tracking.carrier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Tracking Number</p>
                    <p className="font-mono text-cyan-400">{demoOrder.tracking.number}</p>
                  </div>
                </div>
                <button className="w-full mt-4 py-3 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 rounded-lg font-semibold transition-colors">
                  Track Package
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>{demoOrder.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>{demoOrder.shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span>{demoOrder.tax}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-cyan-400">{demoOrder.total}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <span className="text-gray-300">{demoOrder.paymentMethod}</span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <div className="text-gray-300 text-sm space-y-1">
                <p className="font-medium text-white">{demoOrder.shippingAddress.name}</p>
                <p>{demoOrder.shippingAddress.street}</p>
                <p>{demoOrder.shippingAddress.city}, {demoOrder.shippingAddress.state} {demoOrder.shippingAddress.zip}</p>
                <p>{demoOrder.shippingAddress.country}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                to="/us/returns"
                className="block w-full py-3 text-center border border-gray-700 hover:border-gray-600 rounded-lg font-semibold transition-colors"
              >
                Start Return
              </Link>
              <button className="w-full py-3 border border-gray-700 hover:border-gray-600 rounded-lg font-semibold transition-colors">
                Download Invoice
              </button>
              <Link
                to="/us/contact"
                className="block w-full py-3 text-center text-gray-400 hover:text-white transition-colors text-sm"
              >
                Need Help? Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
