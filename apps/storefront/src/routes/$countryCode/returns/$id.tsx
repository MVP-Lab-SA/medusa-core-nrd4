import { createFileRoute } from "@tanstack/react-router"
import { CubeSolid, ArrowPath, CheckCircleSolid, MapPin, Calendar, CurrencyDollar, ArrowDownTray, ArrowLeft } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/returns/$id")({
  component: ReturnDetailPage,
})

function ReturnDetailPage() {
  const { id } = Route.useParams()

  // Mock return data
  const returnData = {
    id,
    orderId: "ORD-2024-001",
    status: "shipped",
    createdDate: "2024-01-15",
    shippedDate: "2024-01-17",
    items: [
      { name: "Premium T-Shirt", size: "L", price: 45, quantity: 1 },
      { name: "Casual Pants", size: "32", price: 65, quantity: 1 },
    ],
    refundAmount: 110,
    reason: "Item doesn't fit",
    method: "pickup",
    trackingNumber: "RET-TRK-123456",
    timeline: [
      { date: "2024-01-15", status: "Return Requested", completed: true },
      { date: "2024-01-16", status: "Approved", completed: true },
      { date: "2024-01-17", status: "Picked Up", completed: true },
      { date: "2024-01-18", status: "In Transit", completed: true, current: true },
      { date: "Est. Jan 20", status: "Received at Warehouse", completed: false },
      { date: "Est. Jan 22", status: "Refund Processed", completed: false },
    ],
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <a href="/returns" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Returns
        </a>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">{returnData.id}</h1>
            <p className="text-gray-400">Original Order: {returnData.orderId}</p>
          </div>
          <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full font-medium">
            In Transit
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Timeline */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Return Progress</h2>
              <div className="relative">
                {returnData.timeline.map((step, index) => (
                  <div key={index} className="flex gap-4 pb-6 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${
                        step.completed ? "bg-emerald-500" : "bg-gray-700"
                      } ${step.current ? "ring-4 ring-emerald-500/20" : ""}`} />
                      {index < returnData.timeline.length - 1 && (
                        <div className={`w-0.5 flex-1 mt-2 ${
                          step.completed ? "bg-emerald-500" : "bg-gray-700"
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${step.completed ? "text-white" : "text-gray-500"}`}>
                          {step.status}
                        </p>
                        <p className="text-sm text-gray-500">{step.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Return Items */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Returned Items</h2>
              <div className="space-y-4">
                {returnData.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 py-3 border-b border-gray-800 last:border-0">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                      <CubeSolid className="w-8 h-8 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-sm text-gray-400">Size: {item.size} | Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-white">${item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Tracking Information</h2>
                <button className="text-cyan-400 text-sm hover:underline flex items-center gap-1">
                  <ArrowDownTray className="w-4 h-4" />
                  Download Label
                </button>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg">
                <ArrowPath className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Tracking Number</p>
                  <p className="font-mono font-medium text-white">{returnData.trackingNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Return Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Requested</p>
                    <p className="font-medium text-white">{returnData.createdDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Return Method</p>
                    <p className="font-medium text-white capitalize">{returnData.method}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CubeSolid className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Reason</p>
                    <p className="font-medium text-white">{returnData.reason}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Refund Summary</h2>
              <div className="space-y-2 mb-4">
                {returnData.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.name}</span>
                    <span className="text-white">${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-800 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Total Refund</span>
                  <div className="flex items-center gap-1 text-emerald-400 font-bold text-xl">
                    <CurrencyDollar className="w-5 h-5" />
                    {returnData.refundAmount}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Refund will be processed to your original payment method
                </p>
              </div>
            </div>

            <button className="w-full border border-gray-700 text-white py-3 rounded-lg hover:bg-gray-800">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
