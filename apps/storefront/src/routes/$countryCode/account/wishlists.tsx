import { createFileRoute } from "@tanstack/react-router"
import { AccountWishlistsPage } from "@/pages/account/wishlists"

export const Route = createFileRoute("/$countryCode/account/wishlists")({
  component: WishlistsRoute,
})

function WishlistsRoute() {
  const { countryCode } = Route.useParams()
  return <AccountWishlistsPage countryCode={countryCode} />
}
