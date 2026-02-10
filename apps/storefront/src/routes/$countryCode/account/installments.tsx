import { createFileRoute } from "@tanstack/react-router"
import { useInstallmentPlans } from "../../../lib/hooks/use-payments"
import { AccountLayout } from "../../../components/account/AccountSidebar"
import { CurrencyDollar, Check, Clock, ExclamationCircle } from "@medusajs/icons"

export const Route = createFileRoute("/$countryCode/account/installments")({
  component: InstallmentsPage,
})

function InstallmentsPage() {
  const { countryCode } = Route.useParams()
  // TODO: Get actual customer ID from auth context
  const customerId = "mock-customer-id"
  const { data: plans, isLoading } = useInstallmentPlans(customerId)

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
      case "defaulted":
        return { label: "Defaulted", color: "bg-red-500/20 text-red-400", icon: ExclamationCircle }
      default:
        return { label: status, color: "bg-gray-500/20 text-gray-400", icon: Clock }
    }
  }

  // Helper to calculate remaining amount for a plan
  const getRemainingAmount = (plan: NonNullable<typeof plans>[number]) => {
    const paidAmount = plan.installments
      .filter(i => i.status === "paid")
      .reduce((sum, i) => sum + i.amount, 0)
    return plan.totalAmount - paidAmount
  }

  // Helper to get next pending installment
  const getNextInstallment = (plan: NonNullable<typeof plans>[number]) => {
    return plan.installments.find(i => i.status === "pending" || i.status === "overdue")
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
              ${activePlans.reduce((sum, p) => sum + getRemainingAmount(p), 0).toFixed(2)}
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
                  const remainingAmount = getRemainingAmount(plan)
                  const paidAmount = plan.totalAmount - remainingAmount
                  const progress = (paidAmount / plan.totalAmount) * 100
                  const nextInstallment = getNextInstallment(plan)

                  return (
                    <div key={plan.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-white">Order #{plan.orderId}</h3>
                          <p className="text-sm text-gray-500">Started: {new Date(plan.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Progress ({plan.installments.filter(i => i.status === "paid").length}/{plan.numberOfInstallments})</span>
                          <span className="text-white">${paidAmount.toFixed(2)} / ${plan.totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-500 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {nextInstallment && (
                        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                          <div>
                            <p className="text-sm text-gray-500">Next Payment</p>
                            <p className="font-medium text-white">
                              ${nextInstallment.amount.toFixed(2)} due {new Date(nextInstallment.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={() => handlePayNow(nextInstallment.id)}
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
                {completedPlans.map((plan) => {
                  const lastPaidInstallment = [...plan.installments]
                    .filter(i => i.paidAt)
                    .sort((a, b) => new Date(b.paidAt!).getTime() - new Date(a.paidAt!).getTime())[0]
                  
                  return (
                    <div key={plan.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 opacity-75">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-white">Order #{plan.orderId}</h3>
                          <p className="text-sm text-gray-500">
                            Completed: {lastPaidInstallment?.paidAt 
                              ? new Date(lastPaidInstallment.paidAt).toLocaleDateString() 
                              : "N/A"}
                          </p>
                        </div>
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                          <Check className="w-3 h-3" />
                          Paid Off
                        </span>
                      </div>
                      <p className="mt-2 text-gray-400">Total: ${plan.totalAmount.toFixed(2)}</p>
                    </div>
                  )
                })}
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
