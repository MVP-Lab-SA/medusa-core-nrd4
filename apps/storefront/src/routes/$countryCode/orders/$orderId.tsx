import { createFileRoute } from "@tanstack/react-router"
import { OrderDetailPage } from "@/pages/order-detail"

export const Route = createFileRoute("/$countryCode/orders/$orderId")({
  component: OrderDetailPage,
})
