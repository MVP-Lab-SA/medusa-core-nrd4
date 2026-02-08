import { createFileRoute } from "@tanstack/react-router"
import { useInstallmentPlans } from "../../../lib/hooks/use-payments"
import { InstallmentPlan } from "../../../components/payments/InstallmentPlan"

export const Route = createFileRoute("/$countryCode/account/installments")({
  component: InstallmentsPage,
})

function InstallmentsPage() {
  const { data: plans, isLoading } = useInstallmentPlans()

  const handlePayNow = (installmentId: string) => {
    console.log("Pay now:", installmentId)
  }

  const activePlans = plans?.filter((p) => p.status === "active") || []
  const completedPlans = plans?.filter((p) => p.status === "completed") || []

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Buy Now, Pay Later</h1>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {activePlans.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Plans</h2>
                <div className="space-y-6">
                  {activePlans.map((plan) => (
                    <InstallmentPlan key={plan.id} plan={plan} onPayNow={handlePayNow} />
                  ))}
                </div>
              </div>
            )}

            {completedPlans.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Completed Plans</h2>
                <div className="space-y-6">
                  {completedPlans.map((plan) => (
                    <InstallmentPlan key={plan.id} plan={plan} />
                  ))}
                </div>
              </div>
            )}

            {plans?.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500">No installment plans found</p>
                <p className="text-sm text-gray-400 mt-2">
                  Select "Pay Later" at checkout to split your purchase
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
