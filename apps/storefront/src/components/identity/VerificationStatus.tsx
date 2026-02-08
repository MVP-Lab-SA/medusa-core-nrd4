import { CheckCircle, Clock, XCircle, ArrowRight } from "@medusajs/icons"

interface VerificationStatusProps {
  type: "kyc" | "age" | "residency" | "business"
  status: "pending" | "verified" | "failed" | "not_started"
  onStartVerification?: () => void
  onRetry?: () => void
}

const typeLabels = {
  kyc: "Identity Verification (KYC)",
  age: "Age Verification",
  residency: "Residency Verification",
  business: "Business Verification",
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: "bg-yellow-100 text-yellow-700",
    iconColor: "text-yellow-500",
    label: "Pending Review",
  },
  verified: {
    icon: CheckCircle,
    color: "bg-green-100 text-green-700",
    iconColor: "text-green-500",
    label: "Verified",
  },
  failed: {
    icon: XCircle,
    color: "bg-red-100 text-red-700",
    iconColor: "text-red-500",
    label: "Verification Failed",
  },
  not_started: {
    icon: Clock,
    color: "bg-gray-100 text-gray-700",
    iconColor: "text-gray-400",
    label: "Not Started",
  },
}

export function VerificationStatus({ type, status, onStartVerification, onRetry }: VerificationStatusProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full ${config.color} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{typeLabels[type]}</h4>
            <p className={`text-sm ${config.color.split(" ")[1]}`}>{config.label}</p>
          </div>
        </div>

        {status === "not_started" && onStartVerification && (
          <button
            onClick={onStartVerification}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            Start
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {status === "failed" && onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  )
}
