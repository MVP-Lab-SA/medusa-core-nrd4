import { Check, XMark, Clock } from "@medusajs/icons"

interface ConsentRecord {
  id: string
  service: string
  dataType: string
  purpose: string
  status: 'granted' | 'denied' | 'revoked'
  grantedAt?: string
  revokedAt?: string
  expiresAt?: string
}

interface ConsentHistoryProps {
  records: ConsentRecord[]
  onRevoke?: (id: string) => void
}

export function ConsentHistory({ records, onRevoke }: ConsentHistoryProps) {
  const getStatusIcon = (status: ConsentRecord['status']) => {
    switch (status) {
      case 'granted':
        return <Check className="w-4 h-4 text-green-500" />
      case 'denied':
      case 'revoked':
        return <XMark className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: ConsentRecord['status']) => {
    const classes = {
      granted: 'bg-green-100 text-green-700',
      denied: 'bg-red-100 text-red-700',
      revoked: 'bg-gray-100 text-gray-700'
    }
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${classes[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Consent History</h3>
        <p className="text-sm text-gray-500">Track how your data is being used</p>
      </div>

      {records.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No consent records yet
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {records.map((record) => (
            <div key={record.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getStatusIcon(record.status)}
                  <div>
                    <p className="font-medium text-gray-900">{record.service}</p>
                    <p className="text-sm text-gray-500">{record.dataType}</p>
                    <p className="text-xs text-gray-400 mt-1">{record.purpose}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(record.status)}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                <div>
                  {record.grantedAt && (
                    <span>Granted: {new Date(record.grantedAt).toLocaleDateString()}</span>
                  )}
                  {record.revokedAt && (
                    <span>Revoked: {new Date(record.revokedAt).toLocaleDateString()}</span>
                  )}
                </div>
                {record.status === 'granted' && onRevoke && (
                  <button
                    onClick={() => onRevoke(record.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Revoke Access
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
