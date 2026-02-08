import { DocumentText, ArrowDownTray, Eye, CheckCircle, Clock, ExclamationCircle } from "@medusajs/icons"

interface Invoice {
  id: string
  date: string
  dueDate: string
  amount: number
  status: "paid" | "pending" | "overdue"
  orderId: string
}

interface InvoiceTableProps {
  invoices: Invoice[]
  onView?: (id: string) => void
  onDownload?: (id: string) => void
}

export function InvoiceTable({ invoices, onView, onDownload }: InvoiceTableProps) {
  const statusConfig = {
    paid: { label: "Paid", color: "bg-green-500/20 text-green-400", icon: CheckCircle },
    pending: { label: "Pending", color: "bg-amber-500/20 text-amber-400", icon: Clock },
    overdue: { label: "Overdue", color: "bg-red-500/20 text-red-400", icon: ExclamationCircle },
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-800/50 border-b border-gray-800">
          <tr>
            <th className="text-left px-6 py-4 font-semibold text-gray-300">Invoice</th>
            <th className="text-left px-6 py-4 font-semibold text-gray-300">Order</th>
            <th className="text-left px-6 py-4 font-semibold text-gray-300">Date</th>
            <th className="text-left px-6 py-4 font-semibold text-gray-300">Due Date</th>
            <th className="text-left px-6 py-4 font-semibold text-gray-300">Amount</th>
            <th className="text-left px-6 py-4 font-semibold text-gray-300">Status</th>
            <th className="text-right px-6 py-4 font-semibold text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            const status = statusConfig[invoice.status]
            const StatusIcon = status.icon

            return (
              <tr key={invoice.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <DocumentText className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-white">{invoice.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400">{invoice.orderId}</td>
                <td className="px-6 py-4 text-gray-400">{invoice.date}</td>
                <td className="px-6 py-4 text-gray-400">{invoice.dueDate}</td>
                <td className="px-6 py-4 font-semibold text-white">${invoice.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm w-fit ${status.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onView?.(invoice.id)}
                      className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDownload?.(invoice.id)}
                      className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white"
                      title="Download"
                    >
                      <ArrowDownTray className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
