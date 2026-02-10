import { useState } from "react"
import { CurrencyDollar, Plus } from "@medusajs/icons"

interface WalletTopUpProps {
  currentBalance: number
  onTopUp: (amount: number, paymentMethod: string) => Promise<void>
  paymentMethods: { id: string; name: string; last4?: string }[]
}

export function WalletTopUp({ currentBalance, onTopUp, paymentMethods }: WalletTopUpProps) {
  const [amount, setAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]?.id || '')
  const [isProcessing, setIsProcessing] = useState(false)

  const presetAmounts = [25, 50, 100, 200]

  const handleTopUp = async () => {
    const topUpAmount = amount || Number(customAmount)
    if (!topUpAmount || !selectedMethod) return

    setIsProcessing(true)
    try {
      await onTopUp(topUpAmount, selectedMethod)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-full">
          <CurrencyDollar className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Top Up Wallet</h2>
          <p className="text-sm text-gray-500">Current Balance: ${currentBalance.toFixed(2)}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Amount</label>
          <div className="grid grid-cols-4 gap-2">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => { setAmount(preset); setCustomAmount('') }}
                className={`py-3 rounded-lg border font-medium ${
                  amount === preset 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                ${preset}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Or Enter Custom Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setAmount(null) }}
              placeholder="0.00"
              min="1"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name} {method.last4 && `(**** ${method.last4})`}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleTopUp}
          disabled={isProcessing || (!amount && !customAmount) || !selectedMethod}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          <Plus className="w-5 h-5" />
          {isProcessing ? 'Processing...' : `Add $${amount || customAmount || '0'} to Wallet`}
        </button>
      </div>
    </div>
  )
}
