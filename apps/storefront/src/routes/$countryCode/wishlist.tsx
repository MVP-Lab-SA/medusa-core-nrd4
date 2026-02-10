import { createFileRoute } from "@tanstack/react-router"
import { WishlistPage } from "@/pages/wishlist"

export const Route = createFileRoute("/$countryCode/wishlist")({
  component: WishlistPage,
})
