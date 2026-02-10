import { createFileRoute } from "@tanstack/react-router"
import HelpCenterPage from "@/pages/help-center"

export const Route = createFileRoute("/$countryCode/help")({
  head: () => ({
    meta: [
      { title: "Help Center | Store" },
      { name: "description", content: "Find answers to common questions or get in touch with our support team." },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { countryCode } = Route.useParams()
  return <HelpCenterPage countryCode={countryCode} />
}
