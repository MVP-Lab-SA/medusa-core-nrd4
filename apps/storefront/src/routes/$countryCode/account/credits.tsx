import { createFileRoute } from "@tanstack/react-router"
import AccountCreditsPage from "@/pages/account/credits"

export const Route = createFileRoute("/$countryCode/account/credits")({
  head: () => ({
    meta: [{ title: "Credits & Statements | Account | Store" }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { countryCode } = Route.useParams()
  return <AccountCreditsPage countryCode={countryCode} />
}
