import { createFileRoute } from "@tanstack/react-router"
import SubscriptionsPage from "@/pages/subscriptions"

export const Route = createFileRoute("/$countryCode/subscriptions")({
  head: () => ({
    meta: [
      { title: "Subscription Plans | Store" },
      { name: "description", content: "Subscribe and save on your favorite products with our subscription plans." },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { countryCode } = Route.useParams()
  return <SubscriptionsPage countryCode={countryCode} />
}
