import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { CubeSolid, Plus, MagnifyingGlass, Clock, CheckCircleSolid, ArrowPath } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/returns/")({
  component: ReturnsPage,
})

function ReturnsPage() {
  const { countryCode } = Route.useParams()
  const [searchQuery, setSearchQuery] = useState("")

  const returns = [
    { id: "RET-001", orderId: "ORD-2024-001", date: "2024-01-15", status: "pending", items: 2, refundAmount: 150 },
    { id: "RET-002", orderId: "ORD-2024-002", date: "2024-01-12", status: "shipped", items: 1, refundAmount: 75 },
    { id: "RET-003", orderId: "ORD-2024-003", date: "2024-01-08", status: "completed", items: 3, refundAmount: 220 },
  ]

  const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    pending: { label: "Awaiting Shipment", color: "bg-amber-500/20 text-amber-400", icon: Clock },
    shipped: { label: "In Transit", color: "bg-cyan-500/20 text-cyan-400", icon: ArrowPath },
    completed: { label: "Refund Completed", color: "bg-emerald-500/20 text-emerald-400", icon: CheckCircleSolid },
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Returns</h1>
            <p className="text-gray-400">Manage your return requests</p>
          </div>
          <Link 
            to={`/${countryCode}/returns/create`}
            className="bg-cyan-500 text-black px-4 py-2 rounded-lg hover:bg-cyan-400 flex items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" />
            Start New Return
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search returns by ID or order number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Returns List */}
        <div className="space-y-4">
          {returns.map((ret) => {
            const status = statusConfig[ret.status]
            const StatusIcon = status.icon

            return (
              <div key={ret.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <CubeSolid className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-white">{ret.id}</h3>
                      <p className="text-gray-400 text-sm">Order: {ret.orderId}</p>
                      <p className="text-gray-500 text-sm mt-1">{ret.items} items</p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${status.color}`}>
                    <StatusIcon className="w-4 h-4" />
                    {status.label}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Refund Amount</p>
                    <p className="text-xl font-semibold text-white">${ret.refundAmount}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      to={`/${countryCode}/returns/${ret.id}`}
                      className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800"
                    >
                      View Details
                    </Link>
                    {ret.status === "pending" && (
                      <button className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 font-medium">
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
    </div>
  )
}
