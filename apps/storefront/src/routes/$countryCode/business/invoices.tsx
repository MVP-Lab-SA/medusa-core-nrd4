import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { FileText, Download, Eye, Search, Filter, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react"

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
    pending: { label: "Pending", color: "bg-amber-100 text-amber-700", icon: Clock },
    paid: { label: "Paid", color: "bg-green-100 text-green-700", icon: CheckCircle },
    partial: { label: "Partial", color: "bg-blue-100 text-blue-700", icon: DollarSign },
    overdue: { label: "Overdue", color: "bg-red-100 text-red-700", icon: AlertCircle },
  }

  const totalOutstanding = invoices.reduce((sum, inv) => sum + (inv.amount - inv.paid), 0)
  const overdueAmount = invoices.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-gray-600">View and manage your invoices</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border rounded-xl p-6">
          <p className="text-gray-600 text-sm">Total Outstanding</p>
          <p className="text-3xl font-bold text-blue-600">${totalOutstanding.toLocaleString()}</p>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <p className="text-gray-600 text-sm">Overdue Amount</p>
          <p className="text-3xl font-bold text-red-600">${overdueAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <p className="text-gray-600 text-sm">Total Invoices</p>
          <p className="text-3xl font-bold">{invoices.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
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
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">Invoice</th>
              <th className="text-left px-6 py-4 font-semibold">PO Number</th>
              <th className="text-left px-6 py-4 font-semibold">Date</th>
              <th className="text-left px-6 py-4 font-semibold">Due Date</th>
              <th className="text-left px-6 py-4 font-semibold">Amount</th>
              <th className="text-left px-6 py-4 font-semibold">Balance</th>
              <th className="text-left px-6 py-4 font-semibold">Status</th>
              <th className="text-right px-6 py-4 font-semibold">Actions</th>
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
                  <tr key={invoice.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{invoice.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{invoice.poNumber}</td>
                    <td className="px-6 py-4 text-gray-600">{invoice.date}</td>
                    <td className="px-6 py-4 text-gray-600">{invoice.dueDate}</td>
                    <td className="px-6 py-4 font-semibold">${invoice.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 font-semibold">${balance.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm w-fit ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="View">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Download">
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                        {invoice.status !== "paid" && (
                          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
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
  )
}
