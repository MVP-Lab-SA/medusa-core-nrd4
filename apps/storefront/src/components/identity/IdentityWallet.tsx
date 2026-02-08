import { CredentialCard } from "./CredentialCard"
import { Plus, QrCode } from "@medusajs/icons"

interface Credential {
  id: string
  type: string
  issuer: string
  issuedAt: string
  expiresAt?: string
  status: 'valid' | 'expired' | 'revoked'
  data: Record<string, string>
}

interface IdentityWalletProps {
  credentials: Credential[]
  onAddCredential?: () => void
  onViewCredential?: (id: string) => void
  onShowQR?: (id: string) => void
}

export function IdentityWallet({ credentials, onAddCredential, onViewCredential, onShowQR }: IdentityWalletProps) {
  const validCredentials = credentials.filter(c => c.status === 'valid')
  const expiredCredentials = credentials.filter(c => c.status !== 'valid')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Identity Wallet</h2>
          <p className="text-sm text-gray-500">{validCredentials.length} active credentials</p>
        </div>
        {onAddCredential && (
          <button
            onClick={onAddCredential}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            <Plus className="w-4 h-4" />
            Add Credential
          </button>
        )}
      </div>

      {credentials.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <QrCode className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-medium text-gray-900">No credentials yet</h3>
          <p className="text-sm text-gray-500 mt-1">Add your first digital credential to get started</p>
          {onAddCredential && (
            <button
              onClick={onAddCredential}
              className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
            >
              Add Credential
            </button>
          )}
        </div>
      ) : (
        <>
          {validCredentials.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Active Credentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {validCredentials.map((credential) => (
                  <CredentialCard
                    key={credential.id}
                    credential={credential}
                    onView={() => onViewCredential?.(credential.id)}
                    onShowQR={() => onShowQR?.(credential.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {expiredCredentials.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Expired/Revoked</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60">
                {expiredCredentials.map((credential) => (
                  <CredentialCard
                    key={credential.id}
                    credential={credential}
                    onView={() => onViewCredential?.(credential.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
