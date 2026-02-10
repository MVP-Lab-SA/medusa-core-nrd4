import { useState } from "react"
import { CreditCard, Plus } from "@medusajs/icons"

interface AddPaymentMethodProps {
  onAdd: (data: {
    type: 'card' | 'bank'
    cardNumber?: string
    expiryMonth?: string
    expiryYear?: string
    cvv?: string
    name?: string
    routingNumber?: string
    accountNumber?: string
  }) => Promise<{ success: boolean; message?: string }>
}

export function AddPaymentMethod({ onAdd }: AddPaymentMethodProps) {
  const [type, setType] = useState<'card' | 'bank'>('card')
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    name: '',
    routingNumber: '',
    accountNumber: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await onAdd({ type, ...formData })
      if (!result.success) {
        setError(result.message || 'Failed to add payment method')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="font-semibold text-gray-900 mb-4">Add Payment Method</h2>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setType('card')}
          className={`flex-1 py-2 rounded-lg border ${
            type === 'card' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200'
          }`}
        >
          Credit/Debit Card
        </button>
        <button
          onClick={() => setType('bank')}
          className={`flex-1 py-2 rounded-lg border ${
            type === 'bank' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200'
          }`}
        >
          Bank Account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'card' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16) })}
                  placeholder="1234 5678 9012 3456"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                />
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                <select
                  value={formData.expiryMonth}
                  onChange={(e) => setFormData({ ...formData, expiryMonth: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">MM</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                      {String(i + 1).padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  value={formData.expiryYear}
                  onChange={(e) => setFormData({ ...formData, expiryYear: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">YY</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={String(new Date().getFullYear() + i).slice(-2)}>
                      {new Date().getFullYear() + i}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="password"
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number</label>
              <input
                type="text"
                value={formData.routingNumber}
                onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value.replace(/\D/g, '').slice(0, 9) })}
                placeholder="123456789"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, '') })}
                placeholder="1234567890"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          <Plus className="w-5 h-5" />
          {isSubmitting ? 'Adding...' : 'Add Payment Method'}
        </button>
      </form>
    </div>
  )
}
