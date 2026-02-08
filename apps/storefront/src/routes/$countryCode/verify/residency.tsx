import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { MapPin, Upload, CheckCircle, FileText, AlertTriangle, Home } from "lucide-react"

export const Route = createFileRoute("/$countryCode/verify/residency")({
  component: ResidencyVerificationPage,
})

function ResidencyVerificationPage() {
  const [step, setStep] = useState(1)
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null)
  const [verified, setVerified] = useState(false)

  const documentTypes = [
    { id: "utility", name: "Utility Bill", description: "Electric, water, or gas bill (less than 3 months old)" },
    { id: "bank", name: "Bank Statement", description: "Official bank statement with your address" },
    { id: "lease", name: "Lease Agreement", description: "Current rental or lease agreement" },
    { id: "government", name: "Government Letter", description: "Official correspondence from government agency" },
  ]

  if (verified) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Residency Verified</h1>
          <p className="text-gray-600 mb-8">
            Your residency has been verified. You now have access to location-specific services and benefits.
          </p>
          <a 
            href="/account/credentials"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            View My Credentials
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Residency Verification</h1>
          <p className="text-gray-600">
            Verify your residency to access location-specific services and benefits.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                step >= s ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 3 && <div className={`w-16 h-1 mx-2 ${step > s ? "bg-blue-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Choose Document Type */}
        {step === 1 && (
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Select Document Type</h2>
            <div className="space-y-3">
              {documentTypes.map((doc) => (
                <label
                  key={doc.id}
                  className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedDocType === doc.id ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="docType"
                    value={doc.id}
                    checked={selectedDocType === doc.id}
                    onChange={() => setSelectedDocType(doc.id)}
                    className="mt-1 w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.description}</p>
                  </div>
                </label>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!selectedDocType}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Upload Document */}
        {step === 2 && (
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Upload Your Document</h2>
            <div className="border-2 border-dashed rounded-lg p-8 text-center mb-6">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop your document here</p>
              <p className="text-sm text-gray-400 mb-4">PDF, JPG, or PNG (max 10MB)</p>
              <input type="file" className="hidden" id="doc-upload" accept=".pdf,.jpg,.jpeg,.png" />
              <label 
                htmlFor="doc-upload"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
              >
                Choose File
              </label>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Document Requirements:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Document must be less than 3 months old
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Your full name must be clearly visible
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Address must match your registered address
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border py-3 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Upload & Verify
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Verification */}
        {step === 3 && (
          <div className="bg-white border rounded-xl p-6 text-center">
            <div className="py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Verifying Your Document</h2>
              <p className="text-gray-600 mb-6">
                We're reviewing your document. This usually takes a few minutes.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full w-3/4 animate-pulse" />
              </div>
            </div>
            <button
              onClick={() => setVerified(true)}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Complete Verification (Demo)
            </button>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Secure Processing</p>
            <p>All documents are encrypted and securely processed. We delete your documents after verification.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
