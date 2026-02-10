import { createFileRoute } from "@tanstack/react-router"
import LoyaltyPage from "@/pages/loyalty"

export const Route = createFileRoute("/$countryCode/loyalty")({
  component: RouteComponent
})

function RouteComponent() {
  const { countryCode } = Route.useParams()

  return <LoyaltyPage countryCode={countryCode} />
}
