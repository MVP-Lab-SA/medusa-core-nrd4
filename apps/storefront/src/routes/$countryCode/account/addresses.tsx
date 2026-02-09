import { createFileRoute } from "@tanstack/react-router"
import AccountAddressesPage from "@/pages/account/addresses"

export const Route = createFileRoute("/$countryCode/account/addresses")({
  component: AccountAddressesPage,
})
