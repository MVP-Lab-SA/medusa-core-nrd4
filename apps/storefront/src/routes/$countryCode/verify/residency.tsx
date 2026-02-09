import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { MapPin, ArrowUpTray, CheckCircle, DocumentText, ExclamationCircle, BuildingStorefront } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/verify/residency")({
  component: ResidencyVerificationPage,
})

function ResidencyVerificationPage() {
  const { countryCode } = Route.useParams()
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
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Residency Verified</h1>
            <p className="text-gray-400 mb-8">
              Your residency has been verified. You now have access to location-specific services and benefits.
            </p>
            <Link 
              to={`/${countryCode}/account/credentials`}
              className="inline-block bg-cyan-500 text-black px-8 py-3 rounded-lg hover:bg-cyan-400 font-medium"
            >
              View My Credentials
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BuildingStorefront className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Residency Verification</h1>
            <p className="text-gray-400">
              Verify your residency to access location-specific services and benefits.
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? "bg-cyan-500 text-black" : "bg-gray-800 text-gray-500"
                }`}>
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 3 && <div className={`w-16 h-1 mx-2 ${step > s ? "bg-cyan-500" : "bg-gray-800"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Choose Document Type */}
          {step === 1 && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Select Document Type</h2>
              <div className="space-y-3">
                {documentTypes.map((doc) => (
                  <label
                    key={doc.id}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedDocType === doc.id 
                        ? "border-cyan-500 bg-cyan-500/10" 
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="docType"
                      value={doc.id}
                      checked={selectedDocType === doc.id}
                      onChange={() => setSelectedDocType(doc.id)}
                      className="mt-1 w-4 h-4 text-cyan-500 bg-gray-800 border-gray-700"
                    />
                    <div>
                      <p className="font-medium text-white">{doc.name}</p>
                      <p className="text-sm text-gray-400">{doc.description}</p>
                    </div>
                  </label>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!selectedDocType}
                className="mt-6 w-full bg-cyan-500 text-black py-3 rounded-lg hover:bg-cyan-400 disabled:bg-gray-700 disabled:text-gray-500 font-medium"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Upload Document */}
          {step === 2 && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Upload Your Document</h2>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center mb-6">
                <ArrowUpTray className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Drag and drop your document here</p>
                <p className="text-sm text-gray-500 mb-4">PDF, JPG, or PNG (max 10MB)</p>
                <input type="file" className="hidden" id="doc-upload" accept=".pdf,.jpg,.jpeg,.png" />
                <label 
                  htmlFor="doc-upload"
                  className="inline-block px-4 py-2 bg-cyan-500 text-black rounded-lg cursor-pointer hover:bg-cyan-400 font-medium"
                >
                  Choose File
                </label>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg mb-6">
                <h3 className="font-medium text-white mb-2">Document Requirements:</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Document must be less than 3 months old
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Your full name must be clearly visible
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Address must match your registered address
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-700 text-gray-300 py-3 rounded-lg hover:bg-gray-800"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-cyan-500 text-black py-3 rounded-lg hover:bg-cyan-400 font-medium"
                >
                  Upload & Verify
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Verification */}
          {step === 3 && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
              <div className="py-8">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <DocumentText className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Verifying Your Document</h2>
                <p className="text-gray-400 mb-6">
                  We're reviewing your document. This usually takes a few minutes.
                </p>
                <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                  <div className="bg-cyan-500 h-2 rounded-full w-3/4 animate-pulse" />
                </div>
              </div>
              <button
                onClick={() => setVerified(true)}
                className="w-full bg-emerald-500 text-black py-3 rounded-lg hover:bg-emerald-400 font-medium"
              >
                Complete Verification (Demo)
              </button>
            </div>
          )}

          <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-start gap-3">
            <ExclamationCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-cyan-200">
              <p className="font-medium">Secure Processing</p>
              <p className="text-cyan-300/80">All documents are encrypted and securely processed. We delete your documents after verification.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
