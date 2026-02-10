import { createFileRoute } from "@tanstack/react-router"
import { AccountDownloadsPage } from "@/pages/account/downloads"

export const Route = createFileRoute("/$countryCode/account/downloads")({
  component: DownloadsRoute,
})

function DownloadsRoute() {
  const { countryCode } = Route.useParams()
  return <AccountDownloadsPage countryCode={countryCode} />
}
