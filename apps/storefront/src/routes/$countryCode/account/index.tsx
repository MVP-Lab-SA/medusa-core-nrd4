import { createFileRoute } from "@tanstack/react-router"
import AccountDashboard from "@/pages/account/dashboard"

export const Route = createFileRoute("/$countryCode/account/")({
  component: () => {
    const { countryCode } = Route.useParams()
    return <AccountDashboard countryCode={countryCode} />
  },
})
