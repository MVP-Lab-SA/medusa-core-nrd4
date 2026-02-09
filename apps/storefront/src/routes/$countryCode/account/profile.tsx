import { createFileRoute } from "@tanstack/react-router"
import AccountProfilePage from "@/pages/account/profile"

export const Route = createFileRoute("/$countryCode/account/profile")({
  component: AccountProfilePage,
})
