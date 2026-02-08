import { useState } from "react"
import { ArrowDownTray, Printer, EnvelopeSolid, Check } from "@medusajs/icons"

interface ReturnLabelGeneratorProps {
  orderId: string
  onGenerateLabel: () => Promise<{
    labelUrl: string
    trackingNumber: string
    carrier: string
  }>
}

export function ReturnLabelGenerator({ orderId, onGenerateLabel }: ReturnLabelGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [label, setLabel] = useState<{
    labelUrl: string
    trackingNumber: string
    carrier: string
  } | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const result = await onGenerateLabel()
      setLabel(result)
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePrint = () => {
    if (label?.labelUrl) {
      window.open(label.labelUrl, '_blank')
    }
  }

  const handleDownload = async () => {
    if (label?.labelUrl) {
      const a = document.createElement('a')
      a.href = label.labelUrl
      a.download = `return-label-${orderId}.pdf`
      a.click()
    }
  }

  if (!label) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <EnvelopeSolid className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="font-medium text-gray-900 mb-2">Generate Return Label</h3>
        <p className="text-sm text-gray-500 mb-4">
          Create a prepaid shipping label for your return
        </p>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'Generate Label'}
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 bg-green-50 border-b border-green-200">
        <div className="flex items-center gap-2 text-green-700">
          <Check className="w-5 h-5" />
          <span className="font-medium">Return Label Generated</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Carrier</span>
          <span className="font-medium text-gray-900">{label.carrier}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Tracking Number</span>
          <span className="font-mono font-medium text-gray-900">{label.trackingNumber}</span>
        </div>

        <div className="pt-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            <ArrowDownTray className="w-4 h-4" />
            Download
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Attach this label to your package and drop off at any {label.carrier} location
        </p>
      </div>
    </div>
  )
}
