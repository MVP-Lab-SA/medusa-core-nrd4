import { createFileRoute } from "@tanstack/react-router"
import AccountBusinessPage from "@/pages/account/business"

export const Route = createFileRoute("/$countryCode/account/business")({
  head: () => ({
    meta: [{ title: "Business Account | Store" }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { countryCode } = Route.useParams()
  return <AccountBusinessPage countryCode={countryCode} />
}
