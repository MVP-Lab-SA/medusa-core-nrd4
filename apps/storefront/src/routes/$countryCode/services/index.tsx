import { createFileRoute } from "@tanstack/react-router"
import ServicesPage from "@/pages/services"

export const Route = createFileRoute("/$countryCode/services/")({
  head: () => ({
    meta: [
      { title: "Book a Service | Store" },
      { name: "description", content: "Schedule appointments with our expert stylists and service providers." },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { countryCode } = Route.useParams()
  return <ServicesPage countryCode={countryCode} />
}
