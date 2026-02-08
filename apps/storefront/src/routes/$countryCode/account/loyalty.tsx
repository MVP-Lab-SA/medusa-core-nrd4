import { createFileRoute } from "@tanstack/react-router"
import AccountLoyaltyPage from "@/pages/account/loyalty"

export const Route = createFileRoute("/$countryCode/account/loyalty")({
  head: () => ({
    meta: [{ title: "Loyalty Rewards | Account | Store" }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { countryCode } = Route.useParams()
  return <AccountLoyaltyPage countryCode={countryCode} />
}
