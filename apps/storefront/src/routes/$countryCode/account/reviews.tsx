import { createFileRoute } from "@tanstack/react-router"
import { AccountReviewsPage } from "@/pages/account/reviews"

export const Route = createFileRoute("/$countryCode/account/reviews")({
  component: ReviewsRoute,
})

function ReviewsRoute() {
  const { countryCode } = Route.useParams()
  return <AccountReviewsPage countryCode={countryCode} />
}
