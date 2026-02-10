import { createFileRoute } from "@tanstack/react-router"
import RegisterPage from "@/pages/account/register"

export const Route = createFileRoute("/$countryCode/account/register")({
  component: () => {
    const { countryCode } = Route.useParams()
    return <RegisterPage countryCode={countryCode} />
  },
})
