import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { MagnifyingGlass, Funnel, ArrowDownTray, Eye, ShoppingBag } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/business/orders")({
  component: BusinessOrders,
})

function BusinessOrders() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const orders = [
    { id: "PO-2024-001", date: "2024-01-15", status: "processing", items: 5, total: 2500, requester: "John Smith" },
    { id: "PO-2024-002", date: "2024-01-14", status: "shipped", items: 3, total: 1800, requester: "Jane Doe" },
    { id: "PO-2024-003", date: "2024-01-12", status: "delivered", items: 8, total: 3200, requester: "Bob Wilson" },
    { id: "PO-2024-004", date: "2024-01-10", status: "pending_approval", items: 2, total: 950, requester: "Alice Brown" },
    { id: "PO-2024-005", date: "2024-01-08", status: "cancelled", items: 4, total: 1500, requester: "Tom Davis" },
  ]

  const statusConfig: Record<string, { label: string; color: string }> = {
    pending_approval: { label: "Pending Approval", color: "bg-amber-500/10 text-amber-400" },
    processing: { label: "Processing", color: "bg-city-cyan/10 text-city-cyan" },
    shipped: { label: "Shipped", color: "bg-purple-500/10 text-purple-400" },
    delivered: { label: "Delivered", color: "bg-emerald-500/10 text-emerald-400" },
    cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-400" },
  }

  const filteredOrders = orders.filter(order => {
    if (filter !== "all" && order.status !== filter) return false
    if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-city-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-city-white">Purchase Orders</h1>
            <p className="text-city-gray">Manage your company's orders</p>
          </div>
          <button className="bg-city-cyan text-city-dark px-4 py-2 rounded-lg hover:bg-city-cyan-light transition-colors flex items-center gap-2 font-medium">
            <ShoppingBag className="w-4 h-4" />
            New Order
          </button>
        </div>

        {/* Filters */}
        <div className="bg-city-navy border border-city-steel rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-city-muted" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-city-slate border border-city-steel rounded-lg text-city-white placeholder-city-muted focus:outline-none focus:border-city-cyan transition-colors"
              />
            </div>
            <div className="flex items-center gap-2">
              <Funnel className="w-5 h-5 text-city-muted" />
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="bg-city-slate border border-city-steel rounded-lg px-3 py-2 text-city-white focus:outline-none focus:border-city-cyan transition-colors"
              >
                <option value="all">All Orders</option>
                <option value="pending_approval">Pending Approval</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-city-steel text-city-white rounded-lg hover:bg-city-slate transition-colors">
              <ArrowDownTray className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-city-navy border border-city-steel rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-city-slate border-b border-city-steel">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Order ID</th>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Date</th>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Requester</th>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Items</th>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Total</th>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Status</th>
                <th className="text-right px-6 py-4 font-semibold text-city-gray">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-city-steel/50 last:border-0 hover:bg-city-slate/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-city-white">{order.id}</td>
                  <td className="px-6 py-4 text-city-gray">{order.date}</td>
                  <td className="px-6 py-4 text-city-white">{order.requester}</td>
                  <td className="px-6 py-4 text-city-gray">{order.items} items</td>
                  <td className="px-6 py-4 font-semibold text-city-white">${order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusConfig[order.status].color}`}>
                      {statusConfig[order.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-city-slate rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-city-gray" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
