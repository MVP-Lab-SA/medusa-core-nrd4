import { Download, FileText, Printer } from "lucide-react"

interface InvoiceDownloadProps {
  invoiceId: string
  onDownloadPDF?: () => void
  onDownloadCSV?: () => void
  onPrint?: () => void
}

export function InvoiceDownload({ invoiceId, onDownloadPDF, onDownloadCSV, onPrint }: InvoiceDownloadProps) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold">Invoice {invoiceId}</h3>
          <p className="text-sm text-gray-500">Download or print your invoice</p>
        </div>
      </div>

      <div className="space-y-2">
        <button 
          onClick={onDownloadPDF}
          className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="w-5 h-5 text-gray-500" />
          <div className="text-left">
            <p className="font-medium">Download PDF</p>
            <p className="text-sm text-gray-500">Full invoice document</p>
          </div>
        </button>

        <button 
          onClick={onDownloadCSV}
          className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="w-5 h-5 text-gray-500" />
          <div className="text-left">
            <p className="font-medium">Download CSV</p>
            <p className="text-sm text-gray-500">Line items for accounting</p>
          </div>
        </button>

        <button 
          onClick={onPrint}
          className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Printer className="w-5 h-5 text-gray-500" />
          <div className="text-left">
            <p className="font-medium">Print Invoice</p>
            <p className="text-sm text-gray-500">Print directly from browser</p>
          </div>
        </button>
      </div>
    </div>
  )
}
