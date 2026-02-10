import { createFileRoute } from "@tanstack/react-router"
import BlogPage from "@/pages/blog"

export const Route = createFileRoute("/$countryCode/blog")({
  component: RouteComponent
})

function RouteComponent() {
  const { countryCode } = Route.useParams()

  return <BlogPage countryCode={countryCode} />
}
