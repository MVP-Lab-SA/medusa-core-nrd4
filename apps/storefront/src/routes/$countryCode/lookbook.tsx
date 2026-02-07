import { createFileRoute } from "@tanstack/react-router"
import Layout from "@/components/layout"
import LookbookPage from "@/pages/lookbook"

export const Route = createFileRoute("/$countryCode/lookbook")({
  component: RouteComponent
})

function RouteComponent() {
  const { countryCode } = Route.useParams()

  return (
    <Layout countryCode={countryCode}>
      <LookbookPage countryCode={countryCode} />
    </Layout>
  )
}
