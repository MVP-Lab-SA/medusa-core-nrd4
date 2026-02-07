import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { ArrowLeft, ArrowUpTray, XMark, CheckCircleSolid } from "@medusajs/icons"

type ReturnReason = "defective" | "wrong_item" | "not_as_described" | "changed_mind" | "other"

const returnReasons: { value: ReturnReason; label: string }[] = [
  { value: "defective", label: "Product is defective or damaged" },
  { value: "wrong_item", label: "Received wrong item" },
  { value: "not_as_described", label: "Product not as described" },
  { value: "changed_mind", label: "Changed my mind" },
  { value: "other", label: "Other reason" },
]

type UploadedFile = {
  name: string
  size: number
  preview?: string
}

export function ReturnsPage() {
  const [step, setStep] = useState(1)
  const [orderId, setOrderId] = useState("")
  const [email, setEmail] = useState("")
  const [reason, setReason] = useState<ReturnReason | "">("")
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    addFiles(droppedFiles)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files))
    }
  }

  const addFiles = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map(file => ({
      name: file.name,
      size: file.size,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined
    }))
    setFiles(prev => [...prev, ...uploadedFiles].slice(0, 5))
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircleSolid className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Return Request Submitted</h1>
          <p className="text-gray-400 mb-6">
            We've received your return request for order #{orderId}. You'll receive an email with the return label and instructions within 24 hours.
          </p>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-400 mb-2">Return Request ID</p>
            <p className="font-mono text-lg text-cyan-400">RET-{Date.now().toString(36).toUpperCase()}</p>
          </div>
          <Link 
            to="/us/store"
            className="inline-flex px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/us" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold">Returns & Exchanges</h1>
          <p className="text-gray-400 mt-2">Start a return or exchange request</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                step >= s ? "bg-cyan-500 text-black" : "bg-gray-800 text-gray-400"
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 rounded ${step > s ? "bg-cyan-500" : "bg-gray-800"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Find Your Order</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Order ID</label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g., ORD-12345"
                    className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="The email used for your order"
                    className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!orderId || !email}
                className="w-full mt-6 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-700 disabled:cursor-not-allowed text-black disabled:text-gray-400 font-semibold rounded-lg transition-colors"
              >
                Find Order
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Reason for Return</h2>
              <div className="space-y-3 mb-6">
                {returnReasons.map((r) => (
                  <label
                    key={r.value}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      reason === r.value
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={r.value}
                      checked={reason === r.value}
                      onChange={(e) => setReason(e.target.value as ReturnReason)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      reason === r.value ? "border-cyan-500" : "border-gray-600"
                    }`}>
                      {reason === r.value && (
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                      )}
                    </div>
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Additional Details</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please provide more details about your return request..."
                  rows={4}
                  className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!reason}
                  className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-700 disabled:cursor-not-allowed text-black disabled:text-gray-400 font-semibold rounded-lg transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Upload Photos (Optional)</h2>
              <p className="text-gray-400 text-sm mb-6">
                Upload photos of the product to help us process your return faster
              </p>

              {/* File Upload Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  isDragging
                    ? "border-cyan-500 bg-cyan-500/10"
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <ArrowUpTray className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-2">Drag and drop files here</p>
                <p className="text-gray-500 text-sm mb-4">or</p>
                <label className="inline-flex px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition-colors">
                  <span>Browse Files</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="sr-only"
                  />
                </label>
                <p className="text-gray-500 text-xs mt-4">Max 5 files, up to 10MB each</p>
              </div>

              {/* Uploaded Files */}
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                      {file.preview ? (
                        <img src={file.preview} alt="" className="w-12 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-400">FILE</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                      >
                        <XMark className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Summary */}
              <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold mb-3">Return Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order ID</span>
                    <span>{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reason</span>
                    <span>{returnReasons.find(r => r.value === reason)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Photos</span>
                    <span>{files.length} uploaded</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors"
                >
                  Submit Return Request
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Policy Info */}
        <div className="mt-8 p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
          <h3 className="font-semibold mb-3">Return Policy</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Returns accepted within 30 days of delivery</li>
            <li>Items must be unused and in original packaging</li>
            <li>Free returns for defective or incorrect items</li>
            <li>Refund processed within 5-7 business days</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
