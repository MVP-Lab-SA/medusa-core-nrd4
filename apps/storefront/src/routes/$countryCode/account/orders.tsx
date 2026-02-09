import { createFileRoute } from "@tanstack/react-router"
import { AccountOrdersPage } from "@/pages/account/orders"

export const Route = createFileRoute("/$countryCode/account/orders")({
  component: OrdersRoute,
})

function OrdersRoute() {
  const { countryCode } = Route.useParams()
  return <AccountOrdersPage countryCode={countryCode} />
}
