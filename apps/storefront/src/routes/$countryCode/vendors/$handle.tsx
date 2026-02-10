import { createFileRoute } from "@tanstack/react-router"
import VendorDetailPage from "@/pages/vendor-detail"

export const Route = createFileRoute("/$countryCode/vendors/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle} | Vendor | Store` },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { countryCode, handle } = Route.useParams()
  return <VendorDetailPage handle={handle} countryCode={countryCode} />
}
