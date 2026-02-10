import { CurrencyDollar, Plus, ArrowPath } from "@medusajs/icons"

interface Wallet {
  balance: number
  pendingBalance: number
  currency: string
}

interface WalletBalanceProps {
  wallet: Wallet
  onTopUp?: () => void
  onTransfer?: () => void
}

export function WalletBalance({ wallet, onTopUp, onTransfer }: WalletBalanceProps) {
  return (
    <div className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <CurrencyDollar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-white/70 text-sm">Available Balance</p>
            <h2 className="text-3xl font-bold">
              {new Intl.NumberFormat("en", {
                style: "currency",
                currency: wallet.currency,
              }).format(wallet.balance)}
            </h2>
          </div>
        </div>
      </div>

      {wallet.pendingBalance > 0 && (
        <div className="mb-4 p-3 bg-white/10 rounded-lg">
          <p className="text-white/70 text-sm">Pending</p>
          <p className="font-semibold">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: wallet.currency,
            }).format(wallet.pendingBalance)}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        {onTopUp && (
          <button
            onClick={onTopUp}
            className="flex-1 py-3 px-4 bg-black text-cyan-400 font-medium rounded-lg hover:bg-gray-900 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Top Up
          </button>
        )}
        {onTransfer && (
          <button
            onClick={onTransfer}
            className="flex-1 py-3 px-4 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 flex items-center justify-center gap-2"
          >
            <ArrowPath className="w-4 h-4" />
            Transfer
          </button>
        )}
      </div>
    </div>
  )
}
