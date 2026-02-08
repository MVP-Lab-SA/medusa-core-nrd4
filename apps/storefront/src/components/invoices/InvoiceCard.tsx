import { FileText, Download, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react"

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
    paid: { label: "Paid", color: "bg-green-100 text-green-700", icon: CheckCircle },
    pending: { label: "Pending", color: "bg-amber-100 text-amber-700", icon: Clock },
    overdue: { label: "Overdue", color: "bg-red-100 text-red-700", icon: AlertCircle },
  }

  const status = statusConfig[invoice.status]
  const StatusIcon = status.icon

  return (
    <div className="bg-white border rounded-xl p-4 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="font-medium">{invoice.id}</p>
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
          <p className="font-medium">{invoice.date}</p>
        </div>
        <div>
          <p className="text-gray-500">Due Date</p>
          <p className="font-medium">{invoice.dueDate}</p>
        </div>
        <div>
          <p className="text-gray-500">Amount</p>
          <p className="font-medium">${invoice.amount.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-50 text-sm">
          <Eye className="w-4 h-4" />
          View
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-50 text-sm">
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  )
}
