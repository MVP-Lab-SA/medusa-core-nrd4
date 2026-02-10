import { createFileRoute } from "@tanstack/react-router"
import { AccountSubscriptionsPage } from "@/pages/account/subscriptions"

export const Route = createFileRoute("/$countryCode/account/subscriptions")({
  component: SubscriptionsRoute,
})

function SubscriptionsRoute() {
  const { countryCode } = Route.useParams()
  return <AccountSubscriptionsPage countryCode={countryCode} />
}
