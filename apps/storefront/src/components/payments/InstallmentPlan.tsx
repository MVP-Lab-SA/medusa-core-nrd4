import { CheckCircle, Clock, XCircle } from "@medusajs/icons"

interface Installment {
  id: string
  amount: number
  dueDate: string
  status: "paid" | "pending" | "overdue"
}

interface InstallmentPlanType {
  id: string
  productName: string
  currency: string
  status: "active" | "completed" | "defaulted"
  installments: Installment[]
}

interface InstallmentPlanProps {
  plan: InstallmentPlanType
  onPayNow?: (installmentId: string) => void
}

export function InstallmentPlan({ plan, onPayNow }: InstallmentPlanProps) {
  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: plan.currency,
  })

  const paidInstallments = plan.installments.filter((i) => i.status === "paid").length
  const progress = (paidInstallments / plan.installments.length) * 100

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-white">{plan.productName}</h4>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            plan.status === "active" ? "bg-emerald-500/20 text-emerald-400" :
            plan.status === "completed" ? "bg-cyan-500/20 text-cyan-400" :
            "bg-red-500/20 text-red-400"
          }`}>
            {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
          </span>
        </div>
        <p className="text-sm text-gray-400">
          {paidInstallments} of {plan.installments.length} payments completed
        </p>
        <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="divide-y divide-gray-800">
        {plan.installments.map((installment, index) => (
          <div key={installment.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {installment.status === "paid" ? (
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              ) : installment.status === "overdue" ? (
                <XCircle className="w-5 h-5 text-red-400" />
              ) : (
                <Clock className="w-5 h-5 text-gray-500" />
              )}
              <div>
                <p className="font-medium text-white">
                  Payment {index + 1}
                </p>
                <p className="text-sm text-gray-400">
                  Due {new Date(installment.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-white">
                {formatter.format(installment.amount)}
              </p>
              {installment.status === "pending" && onPayNow && (
                <button
                  onClick={() => onPayNow(installment.id)}
                  className="text-sm text-cyan-400 hover:text-cyan-300"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
