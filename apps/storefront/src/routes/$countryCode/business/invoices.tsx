import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { DocumentText, ArrowDownTray, Eye, MagnifyingGlass, Funnel, CurrencyDollar, Clock, CheckCircleSolid, ExclamationCircleSolid } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/business/invoices")({
  component: BusinessInvoices,
})

function BusinessInvoices() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const invoices = [
    { id: "INV-2024-001", date: "2024-01-15", dueDate: "2024-02-14", amount: 2500, paid: 0, status: "pending", poNumber: "PO-2024-001" },
    { id: "INV-2024-002", date: "2024-01-10", dueDate: "2024-02-09", amount: 1800, paid: 1800, status: "paid", poNumber: "PO-2024-002" },
    { id: "INV-2024-003", date: "2024-01-05", dueDate: "2024-02-04", amount: 3200, paid: 1600, status: "partial", poNumber: "PO-2024-003" },
    { id: "INV-2024-004", date: "2023-12-20", dueDate: "2024-01-19", amount: 950, paid: 0, status: "overdue", poNumber: "PO-2023-015" },
  ]

  const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    pending: { label: "Pending", color: "bg-amber-500/10 text-amber-400", icon: Clock },
    paid: { label: "Paid", color: "bg-emerald-500/10 text-emerald-400", icon: CheckCircleSolid },
    partial: { label: "Partial", color: "bg-city-cyan/10 text-city-cyan", icon: CurrencyDollar },
    overdue: { label: "Overdue", color: "bg-red-500/10 text-red-400", icon: ExclamationCircleSolid },
  }

  const totalOutstanding = invoices.reduce((sum, inv) => sum + (inv.amount - inv.paid), 0)
  const overdueAmount = invoices.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="min-h-screen bg-city-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-city-white">Invoices</h1>
            <p className="text-city-gray">View and manage your invoices</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-city-navy border border-city-steel rounded-xl p-6">
            <p className="text-city-muted text-sm">Total Outstanding</p>
            <p className="text-3xl font-bold text-city-cyan">${totalOutstanding.toLocaleString()}</p>
          </div>
          <div className="bg-city-navy border border-city-steel rounded-xl p-6">
            <p className="text-city-muted text-sm">Overdue Amount</p>
            <p className="text-3xl font-bold text-red-400">${overdueAmount.toLocaleString()}</p>
          </div>
          <div className="bg-city-navy border border-city-steel rounded-xl p-6">
            <p className="text-city-muted text-sm">Total Invoices</p>
            <p className="text-3xl font-bold text-city-white">{invoices.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-city-navy border border-city-steel rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-city-muted" />
              <input
                type="text"
                placeholder="Search invoices..."
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
                <option value="all">All Invoices</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="partial">Partial</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-city-navy border border-city-steel rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-city-slate border-b border-city-steel">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Invoice</th>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">PO Number</th>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Date</th>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Due Date</th>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Amount</th>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Balance</th>
                <th className="text-left px-6 py-4 font-semibold text-city-gray">Status</th>
                <th className="text-right px-6 py-4 font-semibold text-city-gray">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices
                .filter(inv => filter === "all" || inv.status === filter)
                .map((invoice) => {
                  const status = statusConfig[invoice.status]
                  const StatusIcon = status.icon
                  const balance = invoice.amount - invoice.paid

                  return (
                    <tr key={invoice.id} className="border-b border-city-steel/50 last:border-0 hover:bg-city-slate/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <DocumentText className="w-4 h-4 text-city-muted" />
                          <span className="font-medium text-city-white">{invoice.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-city-gray">{invoice.poNumber}</td>
                      <td className="px-6 py-4 text-city-gray">{invoice.date}</td>
                      <td className="px-6 py-4 text-city-gray">{invoice.dueDate}</td>
                      <td className="px-6 py-4 font-semibold text-city-white">${invoice.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 font-semibold text-city-white">${balance.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm w-fit ${status.color}`}>
                          <StatusIcon className="w-4 h-4" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-city-slate rounded-lg transition-colors" title="View">
                            <Eye className="w-4 h-4 text-city-gray" />
                          </button>
                          <button className="p-2 hover:bg-city-slate rounded-lg transition-colors" title="Download">
                            <ArrowDownTray className="w-4 h-4 text-city-gray" />
                          </button>
                          {invoice.status !== "paid" && (
                            <button className="px-3 py-1 bg-city-cyan text-city-dark text-sm rounded-lg hover:bg-city-cyan-light transition-colors font-medium">
                              Pay Now
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
