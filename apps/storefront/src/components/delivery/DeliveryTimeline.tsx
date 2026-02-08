import { Check, ShoppingBag, TruckFast, MapPin, Buildings } from "@medusajs/icons"

interface TimelineEvent {
  id: string
  status: string
  description: string
  location?: string
  timestamp: string
  isCompleted: boolean
  isCurrent: boolean
}

interface DeliveryTimelineProps {
  events: TimelineEvent[]
}

const statusIcons: Record<string, typeof Check> = {
  'order_placed': Check,
  'processing': ShoppingBag,
  'shipped': TruckFast,
  'in_transit': TruckFast,
  'out_for_delivery': MapPin,
  'delivered': Buildings,
}

export function DeliveryTimeline({ events }: DeliveryTimelineProps) {
  return (
    <div className="relative">
      {events.map((event, index) => {
        const Icon = statusIcons[event.status] || Check
        
        return (
          <div key={event.id} className="flex gap-4 pb-8 last:pb-0">
            <div className="relative flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                event.isCompleted 
                  ? 'bg-green-500 text-white' 
                  : event.isCurrent
                  ? 'bg-blue-500 text-white ring-4 ring-blue-100'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              {index < events.length - 1 && (
                <div className={`absolute top-10 w-0.5 h-full ${
                  event.isCompleted ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
            
            <div className="flex-1 pt-1.5">
              <div className="flex items-start justify-between">
                <div>
                  <p className={`font-medium ${
                    event.isCompleted || event.isCurrent ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {event.description}
                  </p>
                  {event.location && (
                    <p className="text-sm text-gray-500 mt-0.5">{event.location}</p>
                  )}
                </div>
                <time className="text-sm text-gray-400">
                  {new Date(event.timestamp).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </time>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
