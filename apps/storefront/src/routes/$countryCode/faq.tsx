import { createFileRoute } from "@tanstack/react-router"
import FAQPage from "@/pages/faq"

export const Route = createFileRoute("/$countryCode/faq")({
  component: FAQPage,
})
