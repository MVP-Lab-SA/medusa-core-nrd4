import { createFileRoute } from "@tanstack/react-router"
import Layout from "@/components/layout"
import BlogPage from "@/pages/blog"

export const Route = createFileRoute("/$countryCode/blog")({
  component: RouteComponent
})

function RouteComponent() {
  const { countryCode } = Route.useParams()

  return (
    <Layout countryCode={countryCode}>
      <BlogPage countryCode={countryCode} />
    </Layout>
  )
}
