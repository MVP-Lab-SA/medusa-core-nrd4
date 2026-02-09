import { ArrowDownTray, DocumentText, Photo, Sparkles, PlayMiniSolid } from "@medusajs/icons"
import { useDigitalAssets } from "@/lib/hooks/use-marketplace"
import { AccountLayout } from "@/components/account/AccountSidebar"
import {
  AccountPageHeader,
  AccountCard,
  AccountButton,
  AccountEmptyState,
  AccountSkeleton,
  AccountBadge,
} from "@/components/account/AccountUI"

interface DownloadsPageProps {
  countryCode: string
}

const fileTypeIcons: Record<string, typeof DocumentText> = {
  pdf: DocumentText,
  doc: DocumentText,
  docx: DocumentText,
  jpg: Photo,
  jpeg: Photo,
  png: Photo,
  gif: Photo,
  mp3: Sparkles,
  wav: Sparkles,
  mp4: PlayMiniSolid,
  mov: PlayMiniSolid,
}

export function AccountDownloadsPage({ countryCode }: DownloadsPageProps) {
  const { data: assets, isLoading } = useDigitalAssets()

  const handleDownload = (assetId: string, assetName: string) => {
    console.log("Download:", assetId)
    // In real implementation, this would trigger the download
    alert(`Starting download: ${assetName}`)
  }

  const getFileIcon = (fileType: string) => {
    const extension = fileType.toLowerCase().replace(".", "")
    return fileTypeIcons[extension] || DocumentText
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/downloads`}>
      <AccountPageHeader
        title="My Downloads"
        description="Access your purchased digital products"
        breadcrumbs={[
          { label: "Account", href: `/${countryCode}/account` },
          { label: "Downloads" },
        ]}
      />

      {isLoading ? (
        <div className="space-y-4">
          <AccountSkeleton height="h-24" />
          <AccountSkeleton height="h-24" />
          <AccountSkeleton height="h-24" />
        </div>
      ) : assets && assets.length > 0 ? (
        <div className="space-y-4">
          {assets.map((asset) => {
            const FileIcon = getFileIcon(asset.fileType)
            
            return (
              <AccountCard key={asset.id}>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                      <FileIcon className="w-7 h-7 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">{asset.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{asset.fileSize}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full" />
                        <AccountBadge variant="default">{asset.fileType.toUpperCase()}</AccountBadge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {asset.expiresAt && (
                      <span className="text-xs text-gray-500">
                        Expires: {new Date(asset.expiresAt).toLocaleDateString()}
                      </span>
                    )}
                    <AccountButton 
                      onClick={() => handleDownload(asset.id, asset.name)}
                      size="sm"
                    >
                      <ArrowDownTray className="w-4 h-4 mr-2" />
                      Download
                    </AccountButton>
                  </div>
                </div>
              </AccountCard>
            )
          })}
        </div>
      ) : (
        <AccountEmptyState
          icon={<ArrowDownTray className="w-12 h-12" />}
          title="No downloads yet"
          description="Purchase digital products to see them here"
          action={{
            label: "Browse Digital Products",
            href: `/${countryCode}/products?type=digital`,
          }}
        />
      )}
    </AccountLayout>
  )
}
