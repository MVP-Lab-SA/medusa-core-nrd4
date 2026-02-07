import { useState } from "react"

interface InstallmentCalculatorProps {
  totalAmount: number
  providers?: Array<{
    id: string
    name: string
    logo?: string
    installments: number
    apr?: number
  }>
  currency?: string
  className?: string
}

export function InstallmentCalculator({
  totalAmount,
  providers = [
    { id: "affirm", name: "Affirm", installments: 4, apr: 0 },
    { id: "klarna", name: "Klarna", installments: 4, apr: 0 },
    { id: "afterpay", name: "Afterpay", installments: 4, apr: 0 }
  ],
  currency = "USD",
  className = ""
}: InstallmentCalculatorProps) {
  const [selectedProvider, setSelectedProvider] = useState(providers[0]?.id)

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(amount)
  }

  const provider = providers.find(p => p.id === selectedProvider)
  const installmentAmount = provider ? totalAmount / provider.installments : 0

  return (
    <div className={`border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 className="font-medium text-gray-900">Pay in installments</h3>
      </div>

      <p className="text-2xl font-bold text-gray-900 mb-1">
        {formatPrice(installmentAmount)}
        <span className="text-sm font-normal text-gray-500">/mo</span>
      </p>
      <p className="text-sm text-gray-600 mb-4">
        {provider?.installments} interest-free payments of {formatPrice(installmentAmount)}
      </p>

      {/* Provider Selection */}
      <div className="flex gap-2 mb-4">
        {providers.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedProvider(p.id)}
            className={`flex-1 p-2 rounded-lg border transition-all ${
              selectedProvider === p.id
                ? "border-cyan-500 bg-cyan-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="text-sm font-medium text-gray-900">{p.name}</span>
          </button>
        ))}
      </div>

      {/* Payment Schedule */}
      {provider && (
        <div className="space-y-2 mb-4">
          <p className="text-xs text-gray-500 font-medium uppercase">Payment Schedule</p>
          <div className="grid grid-cols-4 gap-1">
            {[...Array(provider.installments)].map((_, i) => {
              const date = new Date()
              date.setDate(date.getDate() + i * 14) // Every 2 weeks
              return (
                <div key={i} className="text-center">
                  <div className={`h-1 rounded ${i === 0 ? "bg-cyan-500" : "bg-gray-200"}`} />
                  <p className="text-xs text-gray-600 mt-1">{formatPrice(installmentAmount)}</p>
                  <p className="text-xs text-gray-400">
                    {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500">
        {provider?.apr === 0 ? (
          <>No interest or fees when you pay on time. <a href="#" className="text-cyan-600 hover:underline">Learn more</a></>
        ) : (
          <>Subject to credit approval. {provider?.apr}% APR. <a href="#" className="text-cyan-600 hover:underline">See terms</a></>
        )}
      </p>
    </div>
  )
}

interface PayLaterBannerProps {
  amount: number
  provider?: string
  installments?: number
  currency?: string
  className?: string
}

export function PayLaterBanner({
  amount,
  provider = "Klarna",
  installments = 4,
  currency = "USD",
  className = ""
}: PayLaterBannerProps) {
  const installmentAmount = amount / installments

  const formatPrice = (amt: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(amt)
  }

  return (
    <div className={`flex items-center gap-2 p-3 bg-pink-50 rounded-lg ${className}`}>
      <svg className="w-8 h-8 text-pink-500" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4zm0 22c-5.5 0-10-4.5-10-10S10.5 6 16 6s10 4.5 10 10-4.5 10-10 10z"/>
        <path d="M16 10v8l6 3"/>
      </svg>
      <div className="flex-1">
        <p className="text-sm text-gray-900">
          Pay in {installments} with <strong>{provider}</strong>
        </p>
        <p className="text-xs text-gray-600">
          {installments} payments of {formatPrice(installmentAmount)} - No interest
        </p>
      </div>
    </div>
  )
}
