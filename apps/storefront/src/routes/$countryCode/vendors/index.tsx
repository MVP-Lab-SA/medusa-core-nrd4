import { createFileRoute } from "@tanstack/react-router"
import VendorsPage from "@/pages/vendors"

export const Route = createFileRoute("/$countryCode/vendors/")({
  head: () => ({
    meta: [
      { title: "Marketplace Vendors | Store" },
      { name: "description", content: "Discover trusted sellers and unique products from our marketplace vendors." },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { countryCode } = Route.useParams()
  return <VendorsPage countryCode={countryCode} />
}
