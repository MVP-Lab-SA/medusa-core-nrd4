import { createFileRoute } from "@tanstack/react-router"
import { AccountPaymentMethodsPage } from "@/pages/account/payment-methods"

export const Route = createFileRoute("/$countryCode/account/payment-methods")({
  component: PaymentMethodsRoute,
})

function PaymentMethodsRoute() {
  const { countryCode } = Route.useParams()
  return <AccountPaymentMethodsPage countryCode={countryCode} />
}
