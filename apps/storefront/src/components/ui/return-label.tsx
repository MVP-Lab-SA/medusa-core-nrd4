import { useState } from "react"
import { ArrowDownTray, Printer, QrCode, Truck } from "@medusajs/icons"
import { Button } from "./button"

interface ReturnLabelProps {
  orderId: string
  returnId: string
  carrier: string
  trackingNumber: string
  labelUrl?: string
  qrCodeUrl?: string
  expiresAt?: string
  instructions?: string[]
  dropOffLocations?: Array<{
    name: string
    address: string
    distance?: string
  }>
  onDownload?: () => void
  onPrint?: () => void
}

export function ReturnLabel({
  orderId,
  returnId,
  carrier,
  trackingNumber,
  labelUrl,
  qrCodeUrl,
  expiresAt,
  instructions = [
    "Pack items securely in original packaging if possible",
    "Include all original tags and accessories",
    "Attach the return label to the outside of the package",
    "Drop off at any authorized carrier location"
  ],
  dropOffLocations = [],
  onDownload,
  onPrint
}: ReturnLabelProps) {
  const [showLocations, setShowLocations] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-cyan-50 border-b border-cyan-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
            <Truck className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Return Label Ready</h3>
            <p className="text-sm text-gray-600">Return #{returnId}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Shipping Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase mb-1">Carrier</p>
            <p className="font-medium text-gray-900">{carrier}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase mb-1">Tracking Number</p>
            <p className="font-mono text-gray-900">{trackingNumber}</p>
          </div>
        </div>

        {/* Label Preview / QR Code */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {labelUrl && (
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-500 uppercase mb-2">Shipping Label</p>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 aspect-[8.5/11] flex items-center justify-center">
                <img src={labelUrl} alt="Return label" className="max-w-full max-h-full" />
              </div>
            </div>
          )}

          {qrCodeUrl && (
            <div className="md:w-48">
              <p className="text-xs font-medium text-gray-500 uppercase mb-2">Or Use QR Code</p>
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <img src={qrCodeUrl} alt="QR code" className="w-full" />
                <p className="text-xs text-gray-500 text-center mt-2">
                  Show this at drop-off location
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          {onDownload && (
            <Button onClick={onDownload} className="flex-1">
              <ArrowDownTray className="w-4 h-4 mr-2" />
              Download Label
            </Button>
          )}
          {onPrint && (
            <Button variant="outline" onClick={onPrint} className="flex-1">
              <Printer className="w-4 h-4 mr-2" />
              Print Label
            </Button>
          )}
        </div>

        {/* Expiry Warning */}
        {expiresAt && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> This label expires on {expiresAt}. Please ship your return before this date.
            </p>
          </div>
        )}

        {/* Instructions */}
        {instructions.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Return Instructions</h4>
            <ol className="space-y-2">
              {instructions.map((instruction, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-700 flex-shrink-0">
                    {idx + 1}
                  </span>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Drop-off Locations */}
        {dropOffLocations.length > 0 && (
          <div>
            <button
              onClick={() => setShowLocations(!showLocations)}
              className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
            >
              {showLocations ? "Hide" : "Show"} nearby drop-off locations ({dropOffLocations.length})
            </button>

            {showLocations && (
              <div className="mt-3 space-y-2">
                {dropOffLocations.map((location, idx) => (
                  <div key={idx} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{location.name}</p>
                      <p className="text-sm text-gray-600">{location.address}</p>
                    </div>
                    {location.distance && (
                      <span className="text-sm text-gray-500">{location.distance}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
