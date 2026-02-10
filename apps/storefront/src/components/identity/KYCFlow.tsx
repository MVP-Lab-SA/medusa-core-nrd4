import { useState } from "react"
import { CheckCircle, ArrowRight, User, DocumentText, Camera } from "@medusajs/icons"

interface KYCFlowProps {
  onComplete: (data: KYCData) => void
  currentStep?: number
}

interface KYCData {
  documentType: string
  documentNumber: string
  documentFront?: File
  documentBack?: File
  selfie?: File
}

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Document", icon: DocumentText },
  { id: 3, title: "Selfie", icon: Camera },
]

export function KYCFlow({ onComplete, currentStep: initialStep = 1 }: KYCFlowProps) {
  const [step, setStep] = useState(initialStep)
  const [data, setData] = useState<Partial<KYCData>>({})

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      onComplete(data as KYCData)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((s, index) => {
          const Icon = s.icon
          const isCompleted = s.id < step
          const isCurrent = s.id === step

          return (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span className="text-xs mt-1 text-gray-600">{s.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${s.id < step ? "bg-green-500" : "bg-gray-200"}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Select Document Type</h2>
          <div className="space-y-2">
            {["passport", "drivers_license", "national_id"].map((type) => (
              <button
                key={type}
                onClick={() => setData({ ...data, documentType: type })}
                className={`w-full p-4 text-left border rounded-lg transition-colors ${
                  data.documentType === type
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <DocumentText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Front Side</p>
              <label className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg cursor-pointer hover:bg-blue-700">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setData({ ...data, documentFront: e.target.files?.[0] })}
                  className="hidden"
                />
                Upload
              </label>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <DocumentText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Back Side</p>
              <label className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg cursor-pointer hover:bg-blue-700">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setData({ ...data, documentBack: e.target.files?.[0] })}
                  className="hidden"
                />
                Upload
              </label>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Take a Selfie</h2>
          <p className="text-gray-600">
            Please take a clear photo of your face for verification.
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <label className="px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
              <input
                type="file"
                accept="image/*"
                capture="user"
                onChange={(e) => setData({ ...data, selfie: e.target.files?.[0] })}
                className="hidden"
              />
              Take Photo
            </label>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          {step === 3 ? "Submit" : "Continue"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
