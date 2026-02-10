import { ArrowDownTray, DocumentText, Swatch } from "@medusajs/icons"

interface InvoiceDownloadProps {
  invoiceId: string
  onDownloadPDF?: () => void
  onDownloadCSV?: () => void
  onPrint?: () => void
}

export function InvoiceDownload({ invoiceId, onDownloadPDF, onDownloadCSV, onPrint }: InvoiceDownloadProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
          <DocumentText className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Invoice {invoiceId}</h3>
          <p className="text-sm text-gray-500">Download or print your invoice</p>
        </div>
      </div>

      <div className="space-y-2">
        <button 
          onClick={onDownloadPDF}
          className="w-full flex items-center gap-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <ArrowDownTray className="w-5 h-5 text-gray-400" />
          <div className="text-left">
            <p className="font-medium text-white">Download PDF</p>
            <p className="text-sm text-gray-500">Full invoice document</p>
          </div>
        </button>

        <button 
          onClick={onDownloadCSV}
          className="w-full flex items-center gap-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <ArrowDownTray className="w-5 h-5 text-gray-400" />
          <div className="text-left">
            <p className="font-medium text-white">Download CSV</p>
            <p className="text-sm text-gray-500">Line items for accounting</p>
          </div>
        </button>

        <button 
          onClick={onPrint}
          className="w-full flex items-center gap-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Swatch className="w-5 h-5 text-gray-400" />
          <div className="text-left">
            <p className="font-medium text-white">Print Invoice</p>
            <p className="text-sm text-gray-500">Print directly from browser</p>
          </div>
        </button>
      </div>
    </div>
  )
}
