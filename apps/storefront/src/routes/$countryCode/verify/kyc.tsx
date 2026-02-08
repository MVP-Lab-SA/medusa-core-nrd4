import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { KYCFlow } from "../../../components/identity/KYCFlow"

export const Route = createFileRoute("/$countryCode/verify/kyc")({
  component: KYCPage,
})

function KYCPage() {
  const { countryCode } = Route.useParams()
  const navigate = useNavigate()

  const handleComplete = () => {
    alert("KYC submitted! We will review your documents within 24-48 hours.")
    navigate({ to: `/${countryCode}/account/identity` })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Identity Verification
          </h1>
          <KYCFlow onComplete={handleComplete} />
        </div>
      </div>
    </div>
  )
}
