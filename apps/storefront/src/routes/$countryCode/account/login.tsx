import { createFileRoute } from "@tanstack/react-router"
import LoginPage from "@/pages/account/login"

export const Route = createFileRoute("/$countryCode/account/login")({
  component: () => {
    const { countryCode } = Route.useParams()
    return <LoginPage countryCode={countryCode} />
  },
})
