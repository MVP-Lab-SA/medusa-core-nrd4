import { createFileRoute } from "@tanstack/react-router"
import Layout from "@/components/layout"
import LoyaltyPage from "@/pages/loyalty"

export const Route = createFileRoute("/$countryCode/loyalty")({
  component: RouteComponent
})

function RouteComponent() {
  const { countryCode } = Route.useParams()

  return (
    <Layout countryCode={countryCode}>
      <LoyaltyPage countryCode={countryCode} />
    </Layout>
  )
}
