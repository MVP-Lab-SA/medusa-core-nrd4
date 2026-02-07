import { createFileRoute } from "@tanstack/react-router"
import Layout from "@/components/layout"
import StoresPage from "@/pages/stores"

export const Route = createFileRoute("/$countryCode/stores")({
  component: RouteComponent
})

function RouteComponent() {
  const { countryCode } = Route.useParams()

  return (
    <Layout countryCode={countryCode}>
      <StoresPage countryCode={countryCode} />
    </Layout>
  )
}
