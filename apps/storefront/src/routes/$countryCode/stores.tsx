import { createFileRoute } from "@tanstack/react-router"
import StoresPage from "@/pages/stores"

export const Route = createFileRoute("/$countryCode/stores")({
  component: RouteComponent
})

function RouteComponent() {
  const { countryCode } = Route.useParams()

  return <StoresPage countryCode={countryCode} />
}
