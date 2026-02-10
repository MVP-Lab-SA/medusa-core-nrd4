import { createFileRoute } from "@tanstack/react-router"
import ServiceDetailPage from "@/pages/service-detail"

export const Route = createFileRoute("/$countryCode/services/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `Book ${params.handle} | Store` },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { countryCode, handle } = Route.useParams()
  return <ServiceDetailPage handle={handle} countryCode={countryCode} />
}
