import { createFileRoute } from "@tanstack/react-router"
import AccountSecurityPage from "@/pages/account/security"

export const Route = createFileRoute("/$countryCode/account/security")({
  component: AccountSecurityPage,
})
