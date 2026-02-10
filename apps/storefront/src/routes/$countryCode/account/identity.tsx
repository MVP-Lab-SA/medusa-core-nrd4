import { createFileRoute } from "@tanstack/react-router"
import AccountIdentityPage from "@/pages/account/identity"

export const Route = createFileRoute("/$countryCode/account/identity")({
  head: () => ({
    meta: [{ title: "Identity & Verification | Account | Store" }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { countryCode } = Route.useParams()
  return <AccountIdentityPage countryCode={countryCode} />
}
