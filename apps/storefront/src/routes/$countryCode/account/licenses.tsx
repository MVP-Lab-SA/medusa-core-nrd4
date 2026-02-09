import { createFileRoute } from "@tanstack/react-router"
import { AccountLicensesPage } from "@/pages/account/licenses"

export const Route = createFileRoute("/$countryCode/account/licenses")({
  component: LicensesRoute,
})

function LicensesRoute() {
  const { countryCode } = Route.useParams()
  return <AccountLicensesPage countryCode={countryCode} />
}
