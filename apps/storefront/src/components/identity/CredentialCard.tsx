import { CheckCircleSolid, Clock, XCircle } from "@medusajs/icons"
import type { VerifiableCredential } from "../../lib/mock/waltid"

interface CredentialCardProps {
  credential: VerifiableCredential
  onView?: (id: string) => void
}

const statusIcons = {
  valid: CheckCircleSolid,
  expired: Clock,
  revoked: XCircle,
}

const statusColors = {
  valid: "text-green-500",
  expired: "text-yellow-500",
  revoked: "text-red-500",
}

export function CredentialCard({ credential, onView }: CredentialCardProps) {
  const StatusIcon = statusIcons[credential.status]

  return (
    <div
      className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-5 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onView?.(credential.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-white/70 text-sm">{credential.issuer}</p>
          <h3 className="font-bold text-lg">{credential.type}</h3>
        </div>
        <StatusIcon className={`w-6 h-6 ${statusColors[credential.status]}`} />
      </div>

      <div className="space-y-2 mb-4">
        {credential.claims && Object.entries(credential.claims).slice(0, 3).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-white/70">{key}</span>
            <span className="font-medium">{String(value)}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-white/70 pt-4 border-t border-white/20">
        <span>Issued: {new Date(credential.issuedAt).toLocaleDateString()}</span>
        {credential.expiresAt && (
          <span>Expires: {new Date(credential.expiresAt).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  )
}
