import { useState } from "react"
import { ArrowDownTray, Check, Spinner } from "@medusajs/icons"

interface DownloadButtonProps {
  fileUrl: string
  fileName: string
  fileSize?: string
  expiresAt?: string
  maxDownloads?: number
  currentDownloads?: number
  onDownload?: () => void
}

export function DownloadButton({ 
  fileUrl, 
  fileName, 
  fileSize,
  expiresAt,
  maxDownloads,
  currentDownloads = 0,
  onDownload 
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const isExpired = expiresAt ? new Date(expiresAt) < new Date() : false
  const downloadsExhausted = maxDownloads ? currentDownloads >= maxDownloads : false
  const isDisabled = isExpired || downloadsExhausted

  const handleDownload = async () => {
    if (isDisabled) return
    
    setIsDownloading(true)
    
    try {
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      setDownloaded(true)
      onDownload?.()
      
      setTimeout(() => setDownloaded(false), 3000)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleDownload}
        disabled={isDisabled || isDownloading}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          isDisabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : downloaded
            ? 'bg-green-500 text-white'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        {isDownloading ? (
          <>
            <Spinner className="w-5 h-5 animate-spin" />
            Downloading...
          </>
        ) : downloaded ? (
          <>
            <Check className="w-5 h-5" />
            Downloaded
          </>
        ) : (
          <>
            <ArrowDownTray className="w-5 h-5" />
            Download
          </>
        )}
      </button>
      
      <div className="text-sm text-gray-500">
        {fileSize && <span>{fileSize}</span>}
        {maxDownloads && (
          <span className="ml-2">
            ({currentDownloads}/{maxDownloads} downloads used)
          </span>
        )}
      </div>
      
      {isExpired && (
        <span className="text-sm text-red-500">Download link expired</span>
      )}
      {downloadsExhausted && !isExpired && (
        <span className="text-sm text-red-500">Download limit reached</span>
      )}
    </div>
  )
}
