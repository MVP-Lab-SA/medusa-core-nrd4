import { createFileRoute } from "@tanstack/react-router"
import TermsPage from "@/pages/terms"

export const Route = createFileRoute("/$countryCode/terms")({
  component: TermsPage,
})
