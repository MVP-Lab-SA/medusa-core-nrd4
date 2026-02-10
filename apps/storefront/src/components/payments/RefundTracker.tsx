import { ArrowPath, Check, Clock, CreditCard } from "@medusajs/icons"

interface RefundTrackerProps {
  refund: {
    id: string
    amount: number
    status: 'pending' | 'processing' | 'completed' | 'failed'
    reason: string
    requestedAt: string
    processedAt?: string
    completedAt?: string
    paymentMethod: string
    estimatedDays?: number
  }
}

export function RefundTracker({ refund }: RefundTrackerProps) {
  const steps = [
    { key: 'pending', label: 'Requested', icon: Clock },
    { key: 'processing', label: 'Processing', icon: ArrowPath },
    { key: 'completed', label: 'Refunded', icon: Check },
  ]

  const currentStepIndex = steps.findIndex(s => s.key === refund.status)

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Refund #{refund.id}</h3>
          <span className="text-lg font-bold text-gray-900">${refund.amount.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{refund.reason}</p>
      </div>

      <div className="p-4">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex || (index === currentStepIndex && refund.status === 'completed')
            const isCurrent = index === currentStepIndex && refund.status !== 'completed' && refund.status !== 'failed'
            const Icon = step.icon

            return (
              <div key={step.key} className="flex flex-col items-center flex-1">
                <div className="relative w-full flex items-center">
                  {index > 0 && (
                    <div className={`flex-1 h-1 ${isCompleted || isCurrent ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    <Icon className={`w-5 h-5 ${isCurrent ? 'animate-spin' : ''}`} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
                <span className={`text-xs mt-2 ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>

        {refund.status === 'failed' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-700">Refund failed. Please contact support.</p>
          </div>
        )}

        {/* Details */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Payment Method</span>
            <span className="flex items-center gap-2 text-gray-900">
              <CreditCard className="w-4 h-4" />
              {refund.paymentMethod}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Requested</span>
            <span className="text-gray-900">
              {new Date(refund.requestedAt).toLocaleDateString()}
            </span>
          </div>
          {refund.completedAt && (
            <div className="flex justify-between">
              <span className="text-gray-500">Completed</span>
              <span className="text-gray-900">
                {new Date(refund.completedAt).toLocaleDateString()}
              </span>
            </div>
          )}
          {refund.status !== 'completed' && refund.estimatedDays && (
            <div className="flex justify-between">
              <span className="text-gray-500">Estimated</span>
              <span className="text-gray-900">{refund.estimatedDays} business days</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
