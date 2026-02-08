import { FileText, Download, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react"

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
    paid: { label: "Paid", color: "bg-green-100 text-green-700", icon: CheckCircle },
    pending: { label: "Pending", color: "bg-amber-100 text-amber-700", icon: Clock },
    overdue: { label: "Overdue", color: "bg-red-100 text-red-700", icon: AlertCircle },
  }

  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left px-6 py-4 font-semibold">Invoice</th>
            <th className="text-left px-6 py-4 font-semibold">Order</th>
            <th className="text-left px-6 py-4 font-semibold">Date</th>
            <th className="text-left px-6 py-4 font-semibold">Due Date</th>
            <th className="text-left px-6 py-4 font-semibold">Amount</th>
            <th className="text-left px-6 py-4 font-semibold">Status</th>
            <th className="text-right px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            const status = statusConfig[invoice.status]
            const StatusIcon = status.icon

            return (
              <tr key={invoice.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{invoice.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{invoice.orderId}</td>
                <td className="px-6 py-4 text-gray-600">{invoice.date}</td>
                <td className="px-6 py-4 text-gray-600">{invoice.dueDate}</td>
                <td className="px-6 py-4 font-semibold">${invoice.amount.toLocaleString()}</td>
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
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="View"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => onDownload?.(invoice.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-gray-600" />
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
