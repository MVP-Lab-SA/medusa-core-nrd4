import { useState } from "react"
import { MapPin, Check, ArrowRight } from "@medusajs/icons"
import { DocumentUploader } from "./DocumentUploader"

interface ResidencyVerifierProps {
  onVerify: (data: {
    address: string
    city: string
    state: string
    postalCode: string
    country: string
    documentType: string
    document: File
  }) => Promise<{ success: boolean; message?: string }>
}

export function ResidencyVerifier({ onVerify }: ResidencyVerifierProps) {
  const [step, setStep] = useState(1)
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US'
  })
  const [documentType, setDocumentType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const documentTypes = [
    { id: 'utility_bill', label: 'Utility Bill (last 3 months)' },
    { id: 'bank_statement', label: 'Bank Statement (last 3 months)' },
    { id: 'lease', label: 'Lease Agreement' },
    { id: 'government_letter', label: 'Government Letter' },
  ]

  const handleDocumentUpload = async (file: File) => {
    setIsSubmitting(true)
    try {
      const result = await onVerify({
        address: address.line1,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
        documentType,
        document: file
      })
      return result
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Progress */}
      <div className="flex border-b border-gray-200">
        {['Address', 'Document Type', 'Upload'].map((label, idx) => (
          <div
            key={label}
            className={`flex-1 py-3 text-center text-sm font-medium ${
              step === idx + 1 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : idx + 1 < step
                ? 'text-green-600'
                : 'text-gray-400'
            }`}
          >
            {idx + 1 < step && <Check className="w-4 h-4 inline mr-1" />}
            {label}
          </div>
        ))}
      </div>

      <div className="p-6">
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Enter Your Address</h3>
                <p className="text-sm text-gray-500">This should match your proof of residency document</p>
              </div>
            </div>

            <input
              type="text"
              value={address.line1}
              onChange={(e) => setAddress({ ...address, line1: e.target.value })}
              placeholder="Street Address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                placeholder="City"
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                placeholder="State"
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={address.postalCode}
                onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                placeholder="Postal Code"
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <select
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
              </select>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!address.line1 || !address.city || !address.postalCode}
              className="w-full flex items-center justify-center gap-2 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Select Document Type</h3>
            <div className="space-y-2">
              {documentTypes.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setDocumentType(doc.id)}
                  className={`w-full p-3 text-left rounded-lg border ${
                    documentType === doc.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {doc.label}
                    {documentType === doc.id && <Check className="w-5 h-5 text-blue-500" />}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-2 border border-gray-300 rounded-lg">
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!documentType}
                className="flex-1 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <DocumentUploader
              documentType="Proof of Residency"
              onUpload={handleDocumentUpload}
            />
            <button onClick={() => setStep(2)} className="w-full py-2 border border-gray-300 rounded-lg">
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
