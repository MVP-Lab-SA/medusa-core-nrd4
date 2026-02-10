interface ConsentRecord {
  id: string
  purpose: string
  description: string
  granted: boolean
  grantedAt?: string
}

interface ConsentToggleProps {
  consent: ConsentRecord
  onToggle: (id: string, granted: boolean) => void
}

export function ConsentToggle({ consent, onToggle }: ConsentToggleProps) {
  return (
    <div className="flex items-start justify-between p-4 bg-white border border-gray-200 rounded-lg">
      <div className="flex-1 pr-4">
        <h4 className="font-medium text-gray-900">{consent.purpose}</h4>
        <p className="text-sm text-gray-600 mt-1">{consent.description}</p>
        {consent.grantedAt && (
          <p className="text-xs text-gray-500 mt-2">
            Granted on {new Date(consent.grantedAt).toLocaleDateString()}
          </p>
        )}
      </div>
      <button
        onClick={() => onToggle(consent.id, !consent.granted)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          consent.granted ? "bg-blue-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            consent.granted ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )
}
