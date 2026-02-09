import { createFileRoute } from "@tanstack/react-router"
import AccountNotificationsPage from "@/pages/account/notifications"

export const Route = createFileRoute("/$countryCode/account/notifications")({
  component: AccountNotificationsPage,
})
