import { Clock, Truck } from "@medusajs/icons"

interface EstimatedArrivalProps {
  estimatedDate: string
  estimatedTimeWindow?: string
  isLive?: boolean
  updatedAt?: string
}

export function EstimatedArrival({ estimatedDate, estimatedTimeWindow, isLive, updatedAt }: EstimatedArrivalProps) {
  const date = new Date(estimatedDate)
  const isToday = new Date().toDateString() === date.toDateString()
  const isTomorrow = new Date(Date.now() + 86400000).toDateString() === date.toDateString()

  const getDateText = () => {
    if (isToday) return 'Today'
    if (isTomorrow) return 'Tomorrow'
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  return (
    <div className={`rounded-lg p-4 ${isLive ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${isLive ? 'bg-blue-100' : 'bg-gray-200'}`}>
          {isLive ? (
            <Truck className="w-5 h-5 text-blue-600" />
          ) : (
            <Clock className="w-5 h-5 text-gray-500" />
          )}
        </div>
        
        <div className="flex-1">
          <p className="text-sm text-gray-500">
            {isLive ? 'Live Estimate' : 'Estimated Arrival'}
          </p>
          <p className="text-lg font-bold text-gray-900">
            {getDateText()}
            {estimatedTimeWindow && (
              <span className="font-normal text-gray-600"> - {estimatedTimeWindow}</span>
            )}
          </p>
          
          {isLive && (
            <div className="flex items-center gap-1 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500">
                Updated {updatedAt ? new Date(updatedAt).toLocaleTimeString() : 'just now'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
