import { createFileRoute } from "@tanstack/react-router"
import { AccountReferralsPage } from "@/pages/account/referrals"

export const Route = createFileRoute("/$countryCode/account/referrals")({
  component: ReferralsRoute,
})

function ReferralsRoute() {
  const { countryCode } = Route.useParams()
  return <AccountReferralsPage countryCode={countryCode} />
}
