import { createFileRoute } from "@tanstack/react-router"
import { AccountSettingsPage } from "@/pages/account/settings"

export const Route = createFileRoute("/$countryCode/account/settings")({
  component: AccountSettingsPage,
})
