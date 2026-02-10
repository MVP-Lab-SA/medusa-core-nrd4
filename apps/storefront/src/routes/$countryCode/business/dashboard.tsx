import { createFileRoute, Link } from "@tanstack/react-router"
import { ShoppingCart, DocumentText, Users, CheckCircleSolid, Clock, CurrencyDollar, ArrowUpRightMini } from "@medusajs/icons"
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
    { label: "Open Orders", value: 12, icon: ShoppingCart, color: "text-city-cyan", href: `/${countryCode}/business/orders` },
    { label: "Pending Quotes", value: 5, icon: DocumentText, color: "text-amber-400", href: `/${countryCode}/business/quotes` },
    { label: "Awaiting Approval", value: 3, icon: Clock, color: "text-purple-400", href: `/${countryCode}/business/approvals` },
    { label: "Team Members", value: 8, icon: Users, color: "text-emerald-400", href: `/${countryCode}/business/team` },
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
      <div className="bg-gradient-to-r from-city-cyan/20 to-city-cyan/5 border border-city-cyan/30 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-city-cyan text-sm">Available Credit</p>
            <p className="text-4xl font-bold text-city-white">${company.availableCredit.toLocaleString()}</p>
            <p className="text-city-muted text-sm mt-1">of ${company.creditLimit.toLocaleString()} limit</p>
          </div>
          <div className="text-right">
            <CurrencyDollar className="w-16 h-16 text-city-cyan/50" />
          </div>
        </div>
        <div className="mt-4 bg-city-slate rounded-full h-2">
          <div 
            className="bg-city-cyan rounded-full h-2" 
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
            className="bg-city-navy border border-city-steel rounded-xl p-6 hover:border-city-cyan/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-city-slate ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-city-white">{stat.value}</p>
                <p className="text-sm text-city-gray">{stat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-city-navy border border-city-steel rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-city-white">Recent Orders</h2>
            <Link to={`/${countryCode}/business/orders` as any} className="text-city-cyan text-sm hover:text-city-cyan-light transition-colors">View All</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-city-steel/50 last:border-0">
                <div>
                  <p className="font-medium text-city-white">{order.id}</p>
                  <p className="text-sm text-city-muted">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-city-white">${order.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400" :
                    order.status === "Shipped" ? "bg-city-cyan/10 text-city-cyan" :
                    "bg-amber-500/10 text-amber-400"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-city-navy border border-city-steel rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-city-white">Pending Approvals</h2>
            <Link to={`/${countryCode}/business/approvals` as any} className="text-city-cyan text-sm hover:text-city-cyan-light transition-colors">View All</Link>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="flex items-center justify-between py-3 border-b border-city-steel/50 last:border-0">
                <div>
                  <p className="font-medium text-city-white">{approval.requester}</p>
                  <p className="text-sm text-city-muted">{approval.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-city-white">${approval.amount.toLocaleString()}</p>
                  <button className="p-1 text-emerald-400 hover:bg-emerald-500/20 rounded transition-colors">
                    <CheckCircleSolid className="w-5 h-5" />
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
          to={`/${countryCode}/business/orders` as any} 
          className="flex items-center gap-3 p-4 bg-city-navy border border-city-steel rounded-xl hover:border-city-cyan/50 transition-colors"
        >
          <ShoppingCart className="w-6 h-6 text-city-cyan" />
          <span className="font-medium text-city-white">New Order</span>
        </Link>
        <Link 
          to={`/${countryCode}/business/quotes` as any} 
          className="flex items-center gap-3 p-4 bg-city-navy border border-city-steel rounded-xl hover:border-city-cyan/50 transition-colors"
        >
          <DocumentText className="w-6 h-6 text-city-cyan" />
          <span className="font-medium text-city-white">Request Quote</span>
        </Link>
        <Link 
          to={`/${countryCode}/business/team` as any} 
          className="flex items-center gap-3 p-4 bg-city-navy border border-city-steel rounded-xl hover:border-city-cyan/50 transition-colors"
        >
          <Users className="w-6 h-6 text-city-cyan" />
          <span className="font-medium text-city-white">Manage Team</span>
        </Link>
        <Link 
          to={`/${countryCode}/business/invoices` as any} 
          className="flex items-center gap-3 p-4 bg-city-navy border border-city-steel rounded-xl hover:border-city-cyan/50 transition-colors"
        >
          <ArrowUpRightMini className="w-6 h-6 text-city-cyan" />
          <span className="font-medium text-city-white">View Invoices</span>
        </Link>
      </div>
    </BusinessLayout>
  )
}
