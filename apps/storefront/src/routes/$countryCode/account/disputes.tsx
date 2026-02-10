import { createFileRoute } from "@tanstack/react-router"
import { AccountDisputesPage } from "@/pages/account/disputes"

export const Route = createFileRoute("/$countryCode/account/disputes")({
  component: DisputesRoute,
})

function DisputesRoute() {
  const { countryCode } = Route.useParams()
  return <AccountDisputesPage countryCode={countryCode} />
}
