import { ArrowUpRightMini, ArrowDownMini, Plus, CreditCard, Gift } from "@medusajs/icons"
import type { Wallet, WalletTransaction, PaymentMethod, LoyaltyAccount } from "@/lib/mock/payments"

// Wallet Balance Card
interface WalletCardProps {
  wallet: Wallet
  onTopUp?: () => void
}

export function WalletCard({ wallet, onTopUp }: WalletCardProps) {
  return (
    <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-6 text-white">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-cyan-100 text-sm">Available Balance</p>
          <p className="text-3xl font-bold mt-1">
            {wallet.currency} {wallet.balance.toFixed(2)}
          </p>
        </div>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <CreditCard className="w-5 h-5" />
        </div>
      </div>

      <button
        onClick={onTopUp}
        className="mt-6 w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Top Up Wallet
      </button>
    </div>
  )
}

// Wallet Transaction List
interface WalletTransactionsProps {
  transactions: WalletTransaction[]
}

export function WalletTransactions({ transactions }: WalletTransactionsProps) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <h3 className="font-semibold text-white">Recent Transactions</h3>
      </div>
      <div className="divide-y divide-gray-800">
        {transactions.map((tx) => (
          <div key={tx.id} className="p-4 flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                tx.type === "credit" ? "bg-emerald-500/20" : "bg-red-500/20"
              }`}
            >
              {tx.type === "credit" ? (
                <ArrowDownMini className="w-5 h-5 text-emerald-400" />
              ) : (
                <ArrowUpRightMini className="w-5 h-5 text-red-400" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">{tx.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(tx.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`font-semibold ${
                tx.type === "credit" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {tx.type === "credit" ? "+" : "-"}
              {tx.currency} {tx.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Payment Method Card
interface PaymentMethodCardProps {
  method: PaymentMethod
  onRemove?: () => void
  onSetDefault?: () => void
}

export function PaymentMethodCard({ method, onRemove, onSetDefault }: PaymentMethodCardProps) {
  const brandLogos: Record<string, string> = {
    visa: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png",
    mastercard: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png",
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 flex items-center gap-4">
      <div className="w-12 h-8 flex items-center justify-center">
        {method.brand && brandLogos[method.brand] ? (
          <img
            src={brandLogos[method.brand]}
            alt={method.brand}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <CreditCard className="w-8 h-8 text-gray-500" />
        )}
      </div>
      <div className="flex-1">
        <p className="font-medium text-white">
          {method.brand ? method.brand.charAt(0).toUpperCase() + method.brand.slice(1) : method.type}{" "}
          ****{method.last4}
        </p>
        {method.expiryMonth && method.expiryYear && (
          <p className="text-sm text-gray-500">
            Expires {method.expiryMonth}/{method.expiryYear}
          </p>
        )}
      </div>
      {method.isDefault && (
        <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded">
          Default
        </span>
      )}
      <div className="flex items-center gap-2">
        {!method.isDefault && onSetDefault && (
          <button
            onClick={onSetDefault}
            className="text-sm text-cyan-400 hover:underline"
          >
            Set Default
          </button>
        )}
        {onRemove && (
          <button
            onClick={onRemove}
            className="text-sm text-red-400 hover:underline"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

// Loyalty Card
interface LoyaltyCardProps {
  account: LoyaltyAccount
  onRedeem?: () => void
}

export function LoyaltyCard({ account, onRedeem }: LoyaltyCardProps) {
  const tierColors = {
    bronze: "from-amber-600 to-amber-700",
    silver: "from-gray-400 to-gray-500",
    gold: "from-yellow-500 to-yellow-600",
    platinum: "from-slate-700 to-slate-800",
  }

  const tierProgress = (account.lifetimePoints / account.nextTierAt) * 100

  return (
    <div
      className={`bg-gradient-to-br ${tierColors[account.tier]} rounded-xl p-6 text-white`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/80 text-sm uppercase tracking-wider">
            {account.tier} Member
          </p>
          <p className="text-3xl font-bold mt-1">
            {account.points.toLocaleString()} pts
          </p>
        </div>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Gift className="w-5 h-5" />
        </div>
      </div>

      {/* Tier Progress */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-white/80">Progress to next tier</span>
          <span>
            {account.lifetimePoints.toLocaleString()} / {account.nextTierAt.toLocaleString()}
          </span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all"
            style={{ width: `${Math.min(tierProgress, 100)}%` }}
          />
        </div>
      </div>

      <button
        onClick={onRedeem}
        className="mt-4 w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
      >
        Redeem Points
      </button>
    </div>
  )
}

// Loyalty Transactions
interface LoyaltyTransactionsProps {
  transactions: LoyaltyAccount["transactions"]
}

export function LoyaltyTransactions({ transactions }: LoyaltyTransactionsProps) {
  const typeColors = {
    earn: "text-emerald-400 bg-emerald-500/20",
    redeem: "text-red-400 bg-red-500/20",
    expire: "text-gray-400 bg-gray-500/20",
    bonus: "text-purple-400 bg-purple-500/20",
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <h3 className="font-semibold text-white">Points History</h3>
      </div>
      <div className="divide-y divide-gray-800">
        {transactions.map((tx) => (
          <div key={tx.id} className="p-4 flex items-center gap-3">
            <div
              className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${
                typeColors[tx.type]
              }`}
            >
              {tx.type}
            </div>
            <div className="flex-1">
              <p className="text-white">{tx.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(tx.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`font-semibold ${
                tx.points > 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {tx.points > 0 ? "+" : ""}
              {tx.points.toLocaleString()} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Installment Plan Card
interface InstallmentCardProps {
  plan: {
    id: string
    orderId: string
    totalAmount: number
    currency: string
    numberOfInstallments: number
    installments: {
      number: number
      amount: number
      dueDate: string
      status: "pending" | "paid" | "overdue"
    }[]
    status: "active" | "completed" | "defaulted"
  }
}

export function InstallmentCard({ plan }: InstallmentCardProps) {
  const paidCount = plan.installments.filter((i) => i.status === "paid").length
  const progress = (paidCount / plan.numberOfInstallments) * 100

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">Order #{plan.orderId.slice(-8)}</p>
          <p className="text-lg font-semibold text-white mt-0.5">
            {plan.currency} {plan.totalAmount.toFixed(2)}
          </p>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            plan.status === "completed"
              ? "bg-emerald-500/20 text-emerald-400"
              : plan.status === "defaulted"
              ? "bg-red-500/20 text-red-400"
              : "bg-cyan-500/20 text-cyan-400"
          }`}
        >
          {plan.status}
        </span>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-500">
            {paidCount} of {plan.numberOfInstallments} payments made
          </span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Next Payment */}
      {plan.status === "active" && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          {plan.installments
            .filter((i) => i.status !== "paid")
            .slice(0, 1)
            .map((installment) => (
              <div key={installment.number} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Next Payment</p>
                  <p className="font-medium text-white">
                    {plan.currency} {installment.amount.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p
                    className={`font-medium ${
                      installment.status === "overdue" ? "text-red-400" : "text-white"
                    }`}
                  >
                    {new Date(installment.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
