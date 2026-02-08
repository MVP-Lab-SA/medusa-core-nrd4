import { createFileRoute } from "@tanstack/react-router"
import { Building2, ShoppingCart, FileText, Users, CheckCircle, Clock, DollarSign, TrendingUp } from "lucide-react"

export const Route = createFileRoute("/$countryCode/business/dashboard")({
  component: BusinessDashboard,
})

function BusinessDashboard() {
  // Mock data - would come from B2B API
  const company = {
    name: "Acme Corporation",
    accountNumber: "B2B-2024-001",
    creditLimit: 50000,
    availableCredit: 35000,
    paymentTerms: "Net 30",
  }

  const stats = [
    { label: "Open Orders", value: 12, icon: ShoppingCart, color: "text-blue-600" },
    { label: "Pending Quotes", value: 5, icon: FileText, color: "text-amber-600" },
    { label: "Awaiting Approval", value: 3, icon: Clock, color: "text-purple-600" },
    { label: "Team Members", value: 8, icon: Users, color: "text-green-600" },
  ]

  const recentOrders = [
    { id: "PO-2024-001", date: "2024-01-15", status: "Processing", total: 2500 },
    { id: "PO-2024-002", date: "2024-01-14", status: "Shipped", total: 1800 },
    { id: "PO-2024-003", date: "2024-01-12", status: "Delivered", total: 3200 },
  ]

  const pendingApprovals = [
    { id: "REQ-001", requester: "John Smith", type: "Purchase Order", amount: 4500 },
    { id: "REQ-002", requester: "Jane Doe", type: "Quote Request", amount: 8000 },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{company.name}</h1>
          <p className="text-gray-600">Account: {company.accountNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Payment Terms</p>
          <p className="text-lg font-semibold">{company.paymentTerms}</p>
        </div>
      </div>

      {/* Credit Status */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Available Credit</p>
            <p className="text-4xl font-bold">${company.availableCredit.toLocaleString()}</p>
            <p className="text-blue-200 text-sm mt-1">of ${company.creditLimit.toLocaleString()} limit</p>
          </div>
          <div className="text-right">
            <DollarSign className="w-16 h-16 text-blue-300" />
          </div>
        </div>
        <div className="mt-4 bg-blue-500/30 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2" 
            style={{ width: `${(company.availableCredit / company.creditLimit) * 100}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <a href="/business/orders" className="text-blue-600 text-sm hover:underline">View All</a>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "Delivered" ? "bg-green-100 text-green-700" :
                    order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                    "bg-amber-100 text-amber-700"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Pending Approvals</h2>
            <a href="/business/approvals" className="text-blue-600 text-sm hover:underline">View All</a>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium">{approval.requester}</p>
                  <p className="text-sm text-gray-500">{approval.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold">${approval.amount.toLocaleString()}</p>
                  <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <a href="/business/orders" className="flex items-center gap-3 p-4 bg-white border rounded-xl hover:border-blue-500 transition-colors">
          <ShoppingCart className="w-6 h-6 text-blue-600" />
          <span className="font-medium">New Order</span>
        </a>
        <a href="/business/quotes" className="flex items-center gap-3 p-4 bg-white border rounded-xl hover:border-blue-500 transition-colors">
          <FileText className="w-6 h-6 text-blue-600" />
          <span className="font-medium">Request Quote</span>
        </a>
        <a href="/business/team" className="flex items-center gap-3 p-4 bg-white border rounded-xl hover:border-blue-500 transition-colors">
          <Users className="w-6 h-6 text-blue-600" />
          <span className="font-medium">Manage Team</span>
        </a>
        <a href="/business/invoices" className="flex items-center gap-3 p-4 bg-white border rounded-xl hover:border-blue-500 transition-colors">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <span className="font-medium">View Invoices</span>
        </a>
      </div>
    </div>
  )
}
