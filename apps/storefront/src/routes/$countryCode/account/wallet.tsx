import { createFileRoute } from "@tanstack/react-router"
import AccountWalletPage from "@/pages/account/wallet"

export const Route = createFileRoute("/$countryCode/account/wallet")({
  head: () => ({
    meta: [{ title: "My Wallet | Account | Store" }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { countryCode } = Route.useParams()
  return <AccountWalletPage countryCode={countryCode} />
}
