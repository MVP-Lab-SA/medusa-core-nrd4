import { useState, useRef } from "react"
import { ArrowUpTray, Trash, Check, ExclamationCircle } from "@medusajs/icons"

interface DocumentUploaderProps {
  documentType: string
  acceptedFormats?: string[]
  maxSizeMB?: number
  onUpload: (file: File) => Promise<{ success: boolean; message?: string }>
  currentDocument?: {
    name: string
    uploadedAt: string
    status: 'pending' | 'verified' | 'rejected'
  }
}

export function DocumentUploader({ 
  documentType, 
  acceptedFormats = ['pdf', 'jpg', 'jpeg', 'png'],
  maxSizeMB = 10,
  onUpload,
  currentDocument 
}: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) await handleFile(file)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) await handleFile(file)
  }

  const handleFile = async (file: File) => {
    setError(null)
    
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (!acceptedFormats.includes(ext || '')) {
      setError(`Invalid format. Accepted: ${acceptedFormats.join(', ')}`)
      return
    }
    
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large. Maximum size: ${maxSizeMB}MB`)
      return
    }

    setIsUploading(true)
    try {
      const result = await onUpload(file)
      if (!result.success) {
        setError(result.message || 'Upload failed')
      }
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{documentType}</label>
      
      {currentDocument ? (
        <div className={`p-4 rounded-lg border ${
          currentDocument.status === 'verified' 
            ? 'border-green-200 bg-green-50' 
            : currentDocument.status === 'rejected'
            ? 'border-red-200 bg-red-50'
            : 'border-yellow-200 bg-yellow-50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {currentDocument.status === 'verified' ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : currentDocument.status === 'rejected' ? (
                <ExclamationCircle className="w-5 h-5 text-red-500" />
              ) : (
                <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">{currentDocument.name}</p>
                <p className="text-xs text-gray-500">
                  Uploaded {new Date(currentDocument.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              currentDocument.status === 'verified' 
                ? 'bg-green-100 text-green-700' 
                : currentDocument.status === 'rejected'
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {currentDocument.status.charAt(0).toUpperCase() + currentDocument.status.slice(1)}
            </span>
          </div>
          
          {currentDocument.status === 'rejected' && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 text-sm text-red-600 hover:text-red-700"
            >
              Upload new document
            </button>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <ArrowUpTray className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            {isUploading ? 'Uploading...' : 'Drag & drop or click to upload'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {acceptedFormats.join(', ').toUpperCase()} up to {maxSizeMB}MB
          </p>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <ExclamationCircle className="w-4 h-4" />
          {error}
        </p>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats.map(f => `.${f}`).join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}
