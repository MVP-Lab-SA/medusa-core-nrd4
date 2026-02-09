import { Check, XMark, Clock, User } from "@medusajs/icons"

interface ApprovalStep {
  id: string
  approverName: string
  approverRole: string
  status: 'pending' | 'approved' | 'rejected'
  approvedAt?: string
  comments?: string
}

interface ApprovalWorkflowProps {
  steps: ApprovalStep[]
  currentStep: number
  onApprove?: () => void
  onReject?: () => void
  canApprove?: boolean
}

export function ApprovalWorkflow({ steps, currentStep, onApprove, onReject, canApprove }: ApprovalWorkflowProps) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <h3 className="font-semibold text-white mb-6">Approval Workflow</h3>
      
      <div className="relative">
        {steps.map((step, index) => {
          const isCompleted = step.status === 'approved'
          const isRejected = step.status === 'rejected'
          const isCurrent = index === currentStep
          
          return (
            <div key={step.id} className="flex items-start gap-4 pb-8 last:pb-0">
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-emerald-500 text-white' 
                    : isRejected 
                    ? 'bg-red-500 text-white'
                    : isCurrent
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-800 text-gray-500'
                }`}>
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : isRejected ? (
                    <XMark className="w-5 h-5" />
                  ) : isCurrent ? (
                    <Clock className="w-5 h-5" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`absolute top-10 left-1/2 w-0.5 h-12 -translate-x-1/2 ${
                    isCompleted ? 'bg-emerald-500' : 'bg-gray-800'
                  }`} />
                )}
              </div>
              
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{step.approverName}</p>
                    <p className="text-sm text-gray-500">{step.approverRole}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    isCompleted 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : isRejected 
                      ? 'bg-red-500/20 text-red-400'
                      : isCurrent
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-gray-800 text-gray-500'
                  }`}>
                    {step.status === 'approved' ? 'Approved' : 
                     step.status === 'rejected' ? 'Rejected' : 
                     isCurrent ? 'Pending' : 'Waiting'}
                  </span>
                </div>
                
                {step.approvedAt && (
                  <p className="text-xs text-gray-600 mt-1">
                    {new Date(step.approvedAt).toLocaleString()}
                  </p>
                )}
                
                {step.comments && (
                  <p className="text-sm text-gray-400 mt-2 bg-gray-800 p-2 rounded">
                    "{step.comments}"
                  </p>
                )}
                
                {isCurrent && canApprove && (
                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={onApprove}
                      className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={onReject}
                      className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
