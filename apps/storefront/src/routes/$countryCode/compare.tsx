import { createFileRoute } from "@tanstack/react-router"
import { ComparePage } from "@/pages/compare"

export const Route = createFileRoute("/$countryCode/compare")({
  component: ComparePage,
})
