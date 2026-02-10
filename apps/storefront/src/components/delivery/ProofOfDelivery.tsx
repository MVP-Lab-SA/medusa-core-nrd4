import { CheckCircle, Camera, PencilSquare } from "@medusajs/icons"

interface ProofOfDeliveryProps {
  deliveredAt: string
  signatureUrl?: string
  photoUrl?: string
  recipientName?: string
  notes?: string
}

export function ProofOfDelivery({
  deliveredAt,
  signatureUrl,
  photoUrl,
  recipientName,
  notes,
}: ProofOfDeliveryProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Delivered</h3>
          <p className="text-sm text-gray-500">
            {new Date(deliveredAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {photoUrl && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Camera className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Photo Proof</span>
            </div>
            <img
              src={photoUrl}
              alt="Delivery proof"
              className="w-full aspect-video object-cover rounded-lg"
            />
          </div>
        )}

        {signatureUrl && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PencilSquare className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Signature</span>
            </div>
            <img
              src={signatureUrl}
              alt="Signature"
              className="w-full aspect-video object-contain bg-gray-50 rounded-lg"
            />
          </div>
        )}
      </div>

      {recipientName && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">Received by: </span>
          <span className="text-sm font-medium text-gray-900">{recipientName}</span>
        </div>
      )}

      {notes && (
        <div className="mt-2">
          <span className="text-sm text-gray-500">Notes: </span>
          <span className="text-sm text-gray-700">{notes}</span>
        </div>
      )}
    </div>
  )
}
