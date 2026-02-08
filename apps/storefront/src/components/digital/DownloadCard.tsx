import { ArrowDownTray, DocumentText, Clock } from "@medusajs/icons"

interface DigitalAsset {
  id: string
  name: string
  fileType: string
  fileSize: string
  downloadCount: number
  downloadLimit?: number
  expiresAt?: string
}

interface DownloadCardProps {
  asset: DigitalAsset
  onDownload: (assetId: string) => void
}

export function DownloadCard({ asset, onDownload }: DownloadCardProps) {
  const isExpired = asset.expiresAt ? new Date(asset.expiresAt) < new Date() : false
  const hasDownloadsLeft = asset.downloadLimit ? asset.downloadCount < asset.downloadLimit : true

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gray-100 rounded-lg">
          <DocumentText className="w-6 h-6 text-gray-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate">{asset.name}</h4>
          <p className="text-sm text-gray-500">{asset.fileType} - {asset.fileSize}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span>Downloaded {asset.downloadCount} times</span>
            {asset.downloadLimit && (
              <span>{asset.downloadLimit - asset.downloadCount} downloads left</span>
            )}
          </div>
          {asset.expiresAt && (
            <div className="flex items-center gap-1 mt-1 text-sm">
              <Clock className="w-4 h-4" />
              <span className={isExpired ? "text-red-600" : "text-gray-500"}>
                {isExpired ? "Expired" : `Expires ${new Date(asset.expiresAt).toLocaleDateString()}`}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => onDownload(asset.id)}
          disabled={isExpired || !hasDownloadsLeft}
          className={`p-3 rounded-lg ${
            isExpired || !hasDownloadsLeft
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <ArrowDownTray className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
