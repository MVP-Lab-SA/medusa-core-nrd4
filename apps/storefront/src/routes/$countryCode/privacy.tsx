import { createFileRoute } from "@tanstack/react-router"
import PrivacyPage from "@/pages/privacy"

export const Route = createFileRoute("/$countryCode/privacy")({
  component: PrivacyPage,
})
