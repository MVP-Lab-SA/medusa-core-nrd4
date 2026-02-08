import { createFileRoute } from "@tanstack/react-router"
import TrackOrderPage from "@/pages/track-order"

export const Route = createFileRoute("/$countryCode/track")({
  validateSearch: (search: Record<string, unknown>) => ({
    orderId: search.orderId as string | undefined,
  }),
  head: () => ({
    meta: [
      { title: "Track Your Order | Store" },
      { name: "description", content: "Track your order and see real-time delivery status." },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { countryCode } = Route.useParams()
  const { orderId } = Route.useSearch()
  return <TrackOrderPage countryCode={countryCode} initialOrderId={orderId} />
}
