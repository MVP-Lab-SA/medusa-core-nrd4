import { createFileRoute } from "@tanstack/react-router"
import BlogListPage from "@/pages/blog-list"

export const Route = createFileRoute("/$countryCode/blog/")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: search.category as string | undefined,
  }),
  head: () => ({
    meta: [
      { title: "Blog | Store" },
      { name: "description", content: "Stories, tips, and inspiration for your lifestyle." },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { countryCode } = Route.useParams()
  const { category } = Route.useSearch()
  return <BlogListPage countryCode={countryCode} initialCategory={category} />
}
