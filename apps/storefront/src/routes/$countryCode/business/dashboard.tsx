import { createFileRoute, Link } from "@tanstack/react-router"
import { ShoppingCart, FileText, Users, CheckCircle, Clock, DollarSign, TrendingUp } from "lucide-react"
import { BusinessLayout } from "../../../components/business/BusinessSidebar"

export const Route = createFileRoute("/$countryCode/business/dashboard")({
  component: BusinessDashboard,
})

function BusinessDashboard() {
  const { countryCode } = Route.useParams()

  // Mock data - would come from B2B API
  const company = {
    name: "Acme Corporation",
    accountNumber: "B2B-2024-001",
    creditLimit: 50000,
    availableCredit: 35000,
    paymentTerms: "Net 30",
  }

  const stats = [
    { label: "Open Orders", value: 12, icon: ShoppingCart, color: "text-cyan-400", href: `/${countryCode}/business/orders` },
    { label: "Pending Quotes", value: 5, icon: FileText, color: "text-amber-400", href: `/${countryCode}/business/quotes` },
    { label: "Awaiting Approval", value: 3, icon: Clock, color: "text-purple-400", href: `/${countryCode}/business/approvals` },
    { label: "Team Members", value: 8, icon: Users, color: "text-green-400", href: `/${countryCode}/business/team` },
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
    <BusinessLayout currentPath={`/${countryCode}/business/dashboard`}>
      {/* Credit Status */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-cyan-400 text-sm">Available Credit</p>
            <p className="text-4xl font-bold text-white">${company.availableCredit.toLocaleString()}</p>
            <p className="text-gray-400 text-sm mt-1">of ${company.creditLimit.toLocaleString()} limit</p>
          </div>
          <div className="text-right">
            <DollarSign className="w-16 h-16 text-cyan-500/50" />
          </div>
        </div>
        <div className="mt-4 bg-gray-800 rounded-full h-2">
          <div 
            className="bg-cyan-500 rounded-full h-2" 
            style={{ width: `${(company.availableCredit / company.creditLimit) * 100}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat) => (
          <Link 
            key={stat.label} 
            to={stat.href}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gray-800 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
            <Link to={`/${countryCode}/business/orders`} className="text-cyan-400 text-sm hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                <div>
                  <p className="font-medium text-white">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">${order.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "Delivered" ? "bg-green-500/20 text-green-400" :
                    order.status === "Shipped" ? "bg-blue-500/20 text-blue-400" :
                    "bg-amber-500/20 text-amber-400"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Pending Approvals</h2>
            <Link to={`/${countryCode}/business/approvals`} className="text-cyan-400 text-sm hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                <div>
                  <p className="font-medium text-white">{approval.requester}</p>
                  <p className="text-sm text-gray-500">{approval.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-white">${approval.amount.toLocaleString()}</p>
                  <button className="p-1 text-green-400 hover:bg-green-500/20 rounded">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <Link 
          to={`/${countryCode}/business/orders`} 
          className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-colors"
        >
          <ShoppingCart className="w-6 h-6 text-cyan-400" />
          <span className="font-medium text-white">New Order</span>
        </Link>
        <Link 
          to={`/${countryCode}/business/quotes`} 
          className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-colors"
        >
          <FileText className="w-6 h-6 text-cyan-400" />
          <span className="font-medium text-white">Request Quote</span>
        </Link>
        <Link 
          to={`/${countryCode}/business/team`} 
          className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-colors"
        >
          <Users className="w-6 h-6 text-cyan-400" />
          <span className="font-medium text-white">Manage Team</span>
        </Link>
        <Link 
          to={`/${countryCode}/business/invoices`} 
          className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-colors"
        >
          <TrendingUp className="w-6 h-6 text-cyan-400" />
          <span className="font-medium text-white">View Invoices</span>
        </Link>
      </div>
    </BusinessLayout>
  )
}
