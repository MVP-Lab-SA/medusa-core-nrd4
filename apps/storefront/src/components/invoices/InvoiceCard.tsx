import { DocumentText, ArrowDownTray, Eye, CheckCircle, Clock, ExclamationCircle } from "@medusajs/icons"

interface InvoiceCardProps {
  invoice: {
    id: string
    date: string
    dueDate: string
    amount: number
    status: "paid" | "pending" | "overdue"
    orderId: string
  }
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  const statusConfig = {
    paid: { label: "Paid", color: "bg-green-500/20 text-green-400", icon: CheckCircle },
    pending: { label: "Pending", color: "bg-amber-500/20 text-amber-400", icon: Clock },
    overdue: { label: "Overdue", color: "bg-red-500/20 text-red-400", icon: ExclamationCircle },
  }

  const status = statusConfig[invoice.status]
  const StatusIcon = status.icon

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
            <DocumentText className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <p className="font-medium text-white">{invoice.id}</p>
            <p className="text-sm text-gray-500">Order: {invoice.orderId}</p>
          </div>
        </div>
        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${status.color}`}>
          <StatusIcon className="w-3 h-3" />
          {status.label}
        </span>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Date</p>
          <p className="font-medium text-white">{invoice.date}</p>
        </div>
        <div>
          <p className="text-gray-500">Due Date</p>
          <p className="font-medium text-white">{invoice.dueDate}</p>
        </div>
        <div>
          <p className="text-gray-500">Amount</p>
          <p className="font-medium text-white">${invoice.amount.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800 flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 text-sm text-gray-300">
          <Eye className="w-4 h-4" />
          View
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 text-sm text-gray-300">
          <ArrowDownTray className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  )
}
