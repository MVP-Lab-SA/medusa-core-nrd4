import { createFileRoute } from "@tanstack/react-router"
import LookbookPage from "@/pages/lookbook"

export const Route = createFileRoute("/$countryCode/lookbook")({
  component: RouteComponent
})

function RouteComponent() {
  const { countryCode } = Route.useParams()

  return <LookbookPage countryCode={countryCode} />
}
