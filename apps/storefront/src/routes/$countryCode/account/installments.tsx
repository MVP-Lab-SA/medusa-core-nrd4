import { createFileRoute } from "@tanstack/react-router"
import { useInstallmentPlans } from "../../../lib/hooks/use-payments"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { CurrencyDollar, Check, Clock, ExclamationCircle } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/account/installments")({
  component: InstallmentsPage,
})

function InstallmentsPage() {
  const { countryCode } = Route.useParams()
  const { data: plans, isLoading } = useInstallmentPlans()

  const handlePayNow = (installmentId: string) => {
    console.log("Pay now:", installmentId)
  }

  const activePlans = plans?.filter((p) => p.status === "active") || []
  const completedPlans = plans?.filter((p) => p.status === "completed") || []

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return { label: "Completed", color: "bg-green-500/20 text-green-400", icon: Check }
      case "active":
        return { label: "Active", color: "bg-cyan-500/20 text-cyan-400", icon: Clock }
      case "overdue":
        return { label: "Overdue", color: "bg-red-500/20 text-red-400", icon: ExclamationCircle }
      default:
        return { label: status, color: "bg-gray-500/20 text-gray-400", icon: Clock }
    }
  }

  return (
    <AccountLayout currentPath={`/${countryCode}/account/installments`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Buy Now, Pay Later</h1>
          <p className="text-gray-400 mt-1">Manage your installment payment plans</p>
        </div>
      </div>

      {/* Stats */}
      {plans && plans.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-500">Active Plans</p>
            <p className="text-2xl font-bold text-cyan-400">{activePlans.length}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-400">{completedPlans.length}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-500">Total Outstanding</p>
            <p className="text-2xl font-bold text-white">
              ${activePlans.reduce((sum, p) => sum + (p.remainingAmount || 0), 0).toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {activePlans.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Active Plans</h2>
              <div className="space-y-4">
                {activePlans.map((plan) => {
                  const status = getStatusConfig(plan.status)
                  const StatusIcon = status.icon
                  const progress = ((plan.totalAmount - (plan.remainingAmount || 0)) / plan.totalAmount) * 100

                  return (
                    <div key={plan.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-white">{plan.orderDescription || `Order #${plan.orderId}`}</h3>
                          <p className="text-sm text-gray-500">Started: {new Date(plan.startDate).toLocaleDateString()}</p>
                        </div>
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">${(plan.totalAmount - (plan.remainingAmount || 0)).toFixed(2)} / ${plan.totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-500 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {plan.nextPaymentDate && (
                        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                          <div>
                            <p className="text-sm text-gray-500">Next Payment</p>
                            <p className="font-medium text-white">${plan.nextPaymentAmount?.toFixed(2)} on {new Date(plan.nextPaymentDate).toLocaleDateString()}</p>
                          </div>
                          <button
                            onClick={() => handlePayNow(plan.id)}
                            className="px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors"
                          >
                            Pay Now
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {completedPlans.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Completed Plans</h2>
              <div className="space-y-4">
                {completedPlans.map((plan) => (
                  <div key={plan.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 opacity-75">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{plan.orderDescription || `Order #${plan.orderId}`}</h3>
                        <p className="text-sm text-gray-500">Completed: {plan.completedDate ? new Date(plan.completedDate).toLocaleDateString() : "N/A"}</p>
                      </div>
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                        <Check className="w-3 h-3" />
                        Paid Off
                      </span>
                    </div>
                    <p className="mt-2 text-gray-400">Total: ${plan.totalAmount.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {plans?.length === 0 && (
            <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800">
              <CurrencyDollar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No installment plans found</p>
              <p className="text-sm text-gray-500 mt-2">
                Select "Pay Later" at checkout to split your purchase into installments
              </p>
            </div>
          )}
        </>
      )}
    </AccountLayout>
  )
}
