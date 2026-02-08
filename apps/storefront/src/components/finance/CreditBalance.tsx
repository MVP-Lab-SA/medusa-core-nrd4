import { CurrencyDollar, Plus } from "@medusajs/icons"

interface StoreCreditItem {
  id: string
  balance: number
  status: "active" | "expired" | "used"
  reason: string
  expiresAt?: string
}

interface CreditBalanceProps {
  credits: StoreCreditItem[]
  currency: string
  onApplyCredit?: () => void
}

export function CreditBalance({ credits, currency, onApplyCredit }: CreditBalanceProps) {
  const totalBalance = credits
    .filter((c) => c.status === "active")
    .reduce((sum, c) => sum + c.balance, 0)

  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  })

  return (
    <div className="bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <CurrencyDollar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-white/70 text-sm">Store Credit Balance</p>
            <h2 className="text-3xl font-bold">{formatter.format(totalBalance)}</h2>
          </div>
        </div>
      </div>

      {credits.filter((c) => c.status === "active").length > 0 && (
        <div className="mb-4 space-y-2">
          {credits
            .filter((c) => c.status === "active")
            .slice(0, 3)
            .map((credit) => (
              <div key={credit.id} className="bg-white/10 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">{credit.reason}</p>
                  {credit.expiresAt && (
                    <p className="text-xs text-white/70">
                      Expires: {new Date(credit.expiresAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <span className="font-bold">{formatter.format(credit.balance)}</span>
              </div>
            ))}
        </div>
      )}

      {onApplyCredit && totalBalance > 0 && (
        <button
          onClick={onApplyCredit}
          className="w-full py-3 px-4 bg-white text-green-600 font-medium rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Apply Credit to Order
        </button>
      )}
    </div>
  )
}
