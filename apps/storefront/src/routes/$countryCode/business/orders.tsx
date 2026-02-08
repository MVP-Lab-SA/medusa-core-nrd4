import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Search, Filter, Download, Eye, Package } from "lucide-react"

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
    pending_approval: { label: "Pending Approval", color: "bg-yellow-100 text-yellow-700" },
    processing: { label: "Processing", color: "bg-blue-100 text-blue-700" },
    shipped: { label: "Shipped", color: "bg-purple-100 text-purple-700" },
    delivered: { label: "Delivered", color: "bg-green-100 text-green-700" },
    cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700" },
  }

  const filteredOrders = orders.filter(order => {
    if (filter !== "all" && order.status !== filter) return false
    if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Purchase Orders</h1>
          <p className="text-gray-600">Manage your company's orders</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Package className="w-4 h-4" />
          New Order
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Orders</option>
              <option value="pending_approval">Pending Approval</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">Order ID</th>
              <th className="text-left px-6 py-4 font-semibold">Date</th>
              <th className="text-left px-6 py-4 font-semibold">Requester</th>
              <th className="text-left px-6 py-4 font-semibold">Items</th>
              <th className="text-left px-6 py-4 font-semibold">Total</th>
              <th className="text-left px-6 py-4 font-semibold">Status</th>
              <th className="text-right px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{order.id}</td>
                <td className="px-6 py-4 text-gray-600">{order.date}</td>
                <td className="px-6 py-4">{order.requester}</td>
                <td className="px-6 py-4">{order.items} items</td>
                <td className="px-6 py-4 font-semibold">${order.total.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${statusConfig[order.status].color}`}>
                    {statusConfig[order.status].label}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
