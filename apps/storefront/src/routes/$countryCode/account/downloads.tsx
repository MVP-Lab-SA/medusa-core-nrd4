import { createFileRoute } from "@tanstack/react-router"
import { useDigitalAssets } from "../../../lib/hooks/use-marketplace"
import { DownloadCard } from "../../../components/digital/DownloadCard"

export const Route = createFileRoute("/$countryCode/account/downloads")({
  component: DownloadsPage,
})

function DownloadsPage() {
  const { data: assets, isLoading } = useDigitalAssets()

  const handleDownload = (assetId: string) => {
    console.log("Download:", assetId)
    alert("Download started")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Downloads</h1>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : assets && assets.length > 0 ? (
          <div className="space-y-4">
            {assets.map((asset) => (
              <DownloadCard key={asset.id} asset={asset} onDownload={handleDownload} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No digital purchases found</p>
          </div>
        )}
      </div>
    </div>
  )
}
