import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Package, ArrowLeft, Search, Clock, CheckCircle, Truck } from "lucide-react"

export const Route = createFileRoute("/$countryCode/returns/")({
  component: ReturnsPage,
})

function ReturnsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const returns = [
    { id: "RET-001", orderId: "ORD-2024-001", date: "2024-01-15", status: "pending", items: 2, refundAmount: 150 },
    { id: "RET-002", orderId: "ORD-2024-002", date: "2024-01-12", status: "shipped", items: 1, refundAmount: 75 },
    { id: "RET-003", orderId: "ORD-2024-003", date: "2024-01-08", status: "completed", items: 3, refundAmount: 220 },
  ]

  const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    pending: { label: "Awaiting Shipment", color: "bg-amber-100 text-amber-700", icon: Clock },
    shipped: { label: "In Transit", color: "bg-blue-100 text-blue-700", icon: Truck },
    completed: { label: "Refund Completed", color: "bg-green-100 text-green-700", icon: CheckCircle },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Returns</h1>
          <p className="text-gray-600">Manage your return requests</p>
        </div>
        <a 
          href="/returns/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Start New Return
        </a>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search returns by ID or order number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border rounded-lg"
        />
      </div>

      {/* Returns List */}
      <div className="space-y-4">
        {returns.map((ret) => {
          const status = statusConfig[ret.status]
          const StatusIcon = status.icon

          return (
            <div key={ret.id} className="bg-white border rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Package className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{ret.id}</h3>
                    <p className="text-gray-600 text-sm">Order: {ret.orderId}</p>
                    <p className="text-gray-500 text-sm mt-1">{ret.items} items</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${status.color}`}>
                  <StatusIcon className="w-4 h-4" />
                  {status.label}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Refund Amount</p>
                  <p className="text-xl font-semibold">${ret.refundAmount}</p>
                </div>
                <div className="flex gap-2">
                  <a 
                    href={`/returns/${ret.id}`}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    View Details
                  </a>
                  {ret.status === "pending" && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Print Label
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
