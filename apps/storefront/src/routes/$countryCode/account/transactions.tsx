import { createFileRoute } from "@tanstack/react-router"
import { AccountTransactionsPage } from "@/pages/account/transactions"

export const Route = createFileRoute("/$countryCode/account/transactions")({
  component: TransactionsRoute,
})

function TransactionsRoute() {
  const { countryCode } = Route.useParams()
  return <AccountTransactionsPage countryCode={countryCode} />
}
