import { useState } from "react"
import { Check, ArrowUp, ArrowDown } from "@medusajs/icons"

interface Plan {
  id: string
  name: string
  price: number
  interval: string
  features: string[]
  popular?: boolean
}

interface UpgradeDowngradeFlowProps {
  currentPlan: Plan
  availablePlans: Plan[]
  onChangePlan: (planId: string) => void
}

export function UpgradeDowngradeFlow({ currentPlan, availablePlans, onChangePlan }: UpgradeDowngradeFlowProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
    setShowConfirm(true)
  }

  const handleConfirm = () => {
    if (selectedPlan) {
      onChangePlan(selectedPlan)
      setShowConfirm(false)
      setSelectedPlan(null)
    }
  }

  const selected = availablePlans.find(p => p.id === selectedPlan)
  const isUpgrade = selected && selected.price > currentPlan.price

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Current Plan: <strong>{currentPlan.name}</strong> - ${currentPlan.price}/{currentPlan.interval}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {availablePlans.map((plan) => {
          const isCurrent = plan.id === currentPlan.id
          const priceChange = plan.price - currentPlan.price
          
          return (
            <div 
              key={plan.id}
              className={`relative border rounded-lg p-4 ${
                isCurrent 
                  ? 'border-gray-300 bg-gray-50' 
                  : plan.popular 
                  ? 'border-blue-500 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.popular && !isCurrent && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                  Popular
                </span>
              )}
              
              <h3 className="font-semibold text-gray-900">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-2xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-500">/{plan.interval}</span>
              </div>
              
              {!isCurrent && (
                <div className={`flex items-center gap-1 mt-2 text-sm ${
                  priceChange > 0 ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {priceChange > 0 ? (
                    <>
                      <ArrowUp className="w-4 h-4" />
                      <span>+${priceChange}/{plan.interval}</span>
                    </>
                  ) : (
                    <>
                      <ArrowDown className="w-4 h-4" />
                      <span>-${Math.abs(priceChange)}/{plan.interval}</span>
                    </>
                  )}
                </div>
              )}
              
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={isCurrent}
                className={`w-full mt-4 px-4 py-2 rounded-lg text-sm font-medium ${
                  isCurrent
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {isCurrent ? 'Current Plan' : priceChange > 0 ? 'Upgrade' : 'Downgrade'}
              </button>
            </div>
          )
        })}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Confirm Plan {isUpgrade ? 'Upgrade' : 'Downgrade'}
            </h2>
            <p className="mt-2 text-gray-600">
              You are about to {isUpgrade ? 'upgrade' : 'downgrade'} from{' '}
              <strong>{currentPlan.name}</strong> to <strong>{selected.name}</strong>.
            </p>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">New Price</span>
                <span className="font-medium">${selected.price}/{selected.interval}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Change</span>
                <span className={isUpgrade ? 'text-orange-600' : 'text-green-600'}>
                  {isUpgrade ? '+' : '-'}${Math.abs(selected.price - currentPlan.price)}/{selected.interval}
                </span>
              </div>
            </div>
            
            {!isUpgrade && (
              <p className="mt-4 text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                Downgrading may result in loss of certain features. This change will take effect at the end of your current billing period.
              </p>
            )}
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Confirm {isUpgrade ? 'Upgrade' : 'Downgrade'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
