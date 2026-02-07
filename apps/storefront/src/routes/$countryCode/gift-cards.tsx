import { createFileRoute } from "@tanstack/react-router"
import { GiftCardsPage } from "@/pages/gift-cards"

export const Route = createFileRoute("/$countryCode/gift-cards")({
  component: GiftCardsPage,
})
