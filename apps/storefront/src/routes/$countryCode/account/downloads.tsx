import { createFileRoute } from "@tanstack/react-router"
import { useDigitalAssets } from "../../../lib/hooks/use-marketplace"
import { DownloadCard } from "../../../components/digital/DownloadCard"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { ArrowDownTray } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/account/downloads")({
  component: DownloadsPage,
})

function DownloadsPage() {
  const { countryCode } = Route.useParams()
  const { data: assets, isLoading } = useDigitalAssets()

  const handleDownload = (assetId: string) => {
    console.log("Download:", assetId)
    alert("Download started")
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/downloads`}>
      <h1 className="text-2xl font-bold text-white mb-8">My Downloads</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : assets && assets.length > 0 ? (
        <div className="space-y-4">
          {assets.map((asset) => (
            <div key={asset.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <ArrowDownTray className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{asset.name}</h3>
                  <p className="text-sm text-gray-500">{asset.fileSize} - {asset.fileType}</p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(asset.id)}
                className="px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
          <ArrowDownTray className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400">No digital purchases found</p>
        </div>
      )}
    </AccountLayout>
  )
}
