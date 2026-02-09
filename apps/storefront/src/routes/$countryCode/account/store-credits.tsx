import { createFileRoute } from "@tanstack/react-router"
import { AccountStoreCreditsPage } from "@/pages/account/store-credits"

export const Route = createFileRoute("/$countryCode/account/store-credits")({
  component: StoreCreditsRoute,
})

function StoreCreditsRoute() {
  const { countryCode } = Route.useParams()
  return <AccountStoreCreditsPage countryCode={countryCode} />
}
